const express = require("express");
const router = express.Router({ mergeParams: true });
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  createLesson,
  getLessonsForCourse,
} = require("../controllers/lessonController");
const { validateLesson } = require("../middlewares/validateLesson");
const validateRequest = require("../middlewares/validateRequest");
const { param } = require("express-validator");

/**
 * @swagger
 * /courses/{courseId}/lessons:
 *   get:
 *     summary: Get all lessons for a course
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course whose lessons you want to fetch
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: List of lessons for the course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer, example: 3 }
 *                   title: { type: string, example: "Intro to JS" }
 *                   content: { type: string, example: "Basics of variables..." }
 *                   order: { type: integer, example: 1 }
 *                   courseId: { type: integer, example: 1 }
 *                   createdAt: { type: string, format: date-time }
 *                   updatedAt: { type: string, format: date-time }
 *       404:
 *         description: Course not found
 */
router.get(
  "/",
  [param("courseId").isInt().withMessage("courseId must be an integer")],
  validateRequest,
  getLessonsForCourse
);

/**
 * @swagger
 * /courses/{courseId}/lessons:
 *   post:
 *     summary: Add a new lesson to a course
 *     description: Provide the **courseId** in the URL path (e.g., `/courses/1/lessons`). The request body should only include lesson fields.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course to which the lesson will be added
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - order
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to JavaScript"
 *               content:
 *                 type: string
 *                 example: "This lesson covers JS basics like variables and data types."
 *               order:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *       404:
 *         description: Course not found
 *       400:
 *         description: Invalid input
 */

router.post(
  "/",
  protect,
  isAdmin,
  validateLesson,
  validateRequest,
  createLesson
);

module.exports = router;
