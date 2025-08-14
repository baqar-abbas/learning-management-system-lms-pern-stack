// middlewares/validateLesson.js
const { body, param } = require("express-validator");

exports.validateLessons = [
  param("courseId").isInt().withMessage("Course ID must be an integer"),
  body("title").notEmpty().isString().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is Required"),
  body("order").isInt().withMessage("Order must be an integer"),
];
