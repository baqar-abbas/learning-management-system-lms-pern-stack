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

// @desc    Create a new course
// @route   POST /api/courses
// @access  Public (for now)
// @swagger

exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
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

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    console.log("Update body:", req.body);

    course.title = title ?? course.title;
    course.description = description ?? course.description;
    course.status = status ?? course.status;

    await course.save();
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
