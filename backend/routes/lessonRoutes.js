const express = require("express");
const router = express.Router({ mergeParams: true });
const { protect, isAdmin } = require("../middlewares/authMiddleware");
const {
  createLesson,
  getLessonsForCourse,
  getLessonById,
  deleteLesson,
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
 * /courses/{courseId}/lessons/{lessonId}:
 *   get:
 *     summary: Get a single lesson by ID
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the course
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the lesson
 *     responses:
 *       200:
 *         description: Lesson data
 *       404:
 *         description: Lesson not found
 */

router.get("/:lessonId", getLessonById);

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

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}:
 *   delete:
 *     summary: Delete a lesson by ID
 *     description: Only admins can delete a lesson. Provide the courseId and lessonId in the URL path.
 *     tags: [Lessons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course that contains the lesson
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: ID of the lesson to delete
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Lesson deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lesson deleted successfully
 *       404:
 *         description: Lesson not found
 *       401:
 *         description: Unauthorized (if not logged in)
 *       403:
 *         description: Forbidden (if not an admin)
 */

router.delete("/:lessonId", protect, isAdmin, deleteLesson);

module.exports = router;
