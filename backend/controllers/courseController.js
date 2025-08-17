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

// Use Centralized error handling through Error Handler Middleware
exports.getCourseById = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId);
    if (!course) {
      // return res.status(404).json({ message: "Course not found" });
      const error = new Error("Course not found!!!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Public (for now)
// @swagger

exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !description) {
      // return res
      //   .status(400)
      //   .json({ message: "Title and description are required." });
      const error = new Error("Title and description are required.");
      error.statusCode = 400;
      throw error;
    }
    const newCourse = await Course.create({
      title,
      description,
      status: status || "draft", // Default to 'draft' if not provided
    });
    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a course
// @route   POST /api/courses
// @access  Public (for now)
// @swagger

exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const course = await Course.findByPk(id);
    if (!course) {
      // return res.status(404).json({ message: "Course not found" });
      const error = new Error("Course not found!!!");
      error.statusCode = 404;
      throw error;
    }

    console.log("Update body:", req.body);

    course.title = title ?? course.title;
    course.description = description ?? course.description;
    course.status = status ?? course.status;

    await course.save();
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    // console.error("Error updating course:", error);
    // res.status(500).json({ error: "Internal server error" });
    next(error);
  }
};

// @desc    Update a course
// @route   POST /api/courses
// @access  Public (for now)
// @swagger

exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);
    if (!course) {
      // return res.status(404).json({ message: "Course not found" });
      const error = new Error("Course not found!!!");
      error.statusCode = 404;
      throw error;
    }

    await course.destroy();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    // console.error("Error deleting course:", error);
    // res.status(500).json({ message: "Server error" });
    next(error);
  }
};
