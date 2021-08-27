const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const postsRouter = require("./routes/postsRoutes");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const usersRouter = require("./routes/usersRoutes");
const categoriesRouter = require("./routes/categoryiesRoutes");
const commentsRouter = require("./routes/commentsRoutes");

// Load env variables
dotenv.config();
// Connect to database
connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Routes
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/comments", commentsRouter);

// Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.bgCyan));
