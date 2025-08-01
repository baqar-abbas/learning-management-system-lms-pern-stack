// controllers/courseController.js

const { Course } = require("../models");
// @desc    Get all courses
// @route   GET /courses
// @access  Public

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single course by ID
// @route   GET /courses/:id
// @access  Public

exports.getCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};
