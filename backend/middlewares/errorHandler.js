// // Custom error handler
// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack); // log the error for debugging

//   // Default values
//   let statusCode = err.statusCode || 500;
//   let message = err.message || "Internal Server Error";

//   // Sequelize validation errors
//   if (err.name === "SequelizeValidationError") {
//     statusCode = 400;
//     message = err.errors.map((e) => e.message).join(", ");
//   }

//   // Sequelize unique constraint error
//   if (err.name === "SequelizeUniqueConstraintError") {
//     statusCode = 400;
//     message = "Duplicate entry: " + err.errors.map((e) => e.message).join(", ");
//   }

//   res.status(statusCode).json({
//     success: false,
//     message,
//   });
// };

// module.exports = errorHandler;

// Custom error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // log the error for debugging

  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }

  // Sequelize unique constraint error
  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = "Duplicate entry: " + err.errors.map((e) => e.message).join(", ");
  }

  // JWT errors (invalid or expired)
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired. Please log in again.";
  }

  // Handle not found (custom case)
  if (err.statusCode === 404) {
    statusCode = 404;
    message = message || "Resource not found";
  }

  // Hide stack traces in production
  const response = {
    success: false,
    message,
  };
  //   if (process.env.NODE_ENV !== "production") {
  //     response.stack = err.stack;
  //   }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
