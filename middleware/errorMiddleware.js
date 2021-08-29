const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  let message = err.message;
  if (err.kind === "ObjectId") {
    message = "Not Found";
  }
  if (err.code === 11000) {
    const keyValue = err.keyValue;
    const key = Object.keys(keyValue)[0];

    message = `Dubplication Key Error. ${key} with value ${keyValue[key]} Alread exist`;
  }
  res.json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
