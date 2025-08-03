const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");

const {
  getAllCourses,
  getCourseById,
  createCourse,
} = require("../controllers/courseController");

// Swagger tags definition for grouping (optional)
/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management APIs
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 */

router.get("/", getAllCourses);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Course found
 *       404:
 *         description: Course not found
 */
router.get("/:id", getCourseById);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: JavaScript for Beginners
 *               description:
 *                 type: string
 *                 example: Learn JavaScript from scratch.
 *               status:
 *                 type: string
 *                 enum: [published, draft]
 *                 example: published
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Invalid input
 */

router.post("/", protect, isAdmin, createCourse);

module.exports = router;
