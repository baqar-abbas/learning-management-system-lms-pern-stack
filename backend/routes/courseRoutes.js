const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const { validateCourse } = require("../middlewares/validateMiddleware");
const { body, param } = require("express-validator");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const validateRequest = require("../middlewares/validateRequest");

// Import lesson routes
const lessonRoutes = require("./lessonRoutes");

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

router.post("/", protect, isAdmin, validateCourse, createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated JS Course
 *               description:
 *                 type: string
 *                 example: Updated course content
 *               status:
 *                 type: string
 *                 enum: [published, draft]
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Course not found
 */

router.put(
  "/:id",
  [
    param("id").isInt().withMessage("Course ID must be an integer"),
    body("title").optional().isString().withMessage("Title must be a string"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
    body("status")
      .optional()
      .isIn(["published", "draft"])
      .withMessage("Status must be either 'published' or 'draft'"),
  ],
  validateRequest,
  updateCourse
);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.delete("/:id", protect, isAdmin, deleteCourse);

// Mount lesson routes (nested under courses)
router.use("/:courseId/lessons", lessonRoutes);

module.exports = router;
