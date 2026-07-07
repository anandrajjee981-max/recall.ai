const { sendError } = require("../utils/apiResponse");

const notFound = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  sendError(
    res,
    statusCode,
    err.message || "Something went wrong on the server",
    process.env.NODE_ENV === "production" ? null : { stack: err.stack }
  );
};

module.exports = { notFound, errorHandler };