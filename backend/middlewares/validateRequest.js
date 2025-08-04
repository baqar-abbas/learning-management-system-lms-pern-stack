const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation Errors:", errors.array());
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.param,
        msg: err.msg,
        location: err.location,
      })),
    });
  }
  next();
};

module.exports = validateRequest;
