const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getCourseById,
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

module.exports = router;
