const { body, validationResult } = require("express-validator");

const validateRegister = [
  body("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Name is required and must be atleat 3 characters"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .optional() // makes it optional
    .isIn(["student", "admin"])
    .withMessage("Role must be either student or admin"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateRegister,
};
