const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { environment } = require('./config');
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: true }));

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.status = 404;
  next(err);
});

// Custom error handlers.

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === "production";
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
