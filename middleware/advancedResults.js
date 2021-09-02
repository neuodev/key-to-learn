const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const User = require("../models/User");

const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit", "search"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  const queryObj = JSON.parse(queryStr);

  // Works only for posts
  let admin;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      admin = await User.findById(decoded.id).select("-password");
      if (!admin.isAdmin) {
        admin = null;
      }
    } catch (error) {
      admin = null;
    }
  }

  if (model.collection.collectionName === "posts" && !admin) {
    queryObj.published = true;
  }
  if (req.query.search) {
    const search = JSON.parse(req.query.search);
    const regExp = new RegExp(search.text, "gi");
    const searchArray = [];
    for (const field of search.fields) {
      if (model.collection.collectionName === "posts" && field === "body") {
        searchArray.push({
          "body.blocks.data": regExp,
        });
      } else {
        searchArray.push({ [field]: { $regex: regExp } });
      }
    }
    queryObj["$or"] = searchArray;
  }
  console.log(queryObj);

  // Finding resource
  query = model.find(queryObj);
  const count = await model.countDocuments(queryObj);
  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
