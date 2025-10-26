const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getQuizzesForLesson,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} = require("../controllers/quizController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Quiz management for lessons
 */

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}/quizzes:
 *   get:
 *     summary: Get all quizzes for a specific lesson
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Lesson ID
 *     responses:
 *       200:
 *         description: List of quizzes retrieved successfully
 *       404:
 *         description: Lesson not found
 */
router.get("/", protect, getQuizzesForLesson);

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}/quizzes/{quizId}:
 *   get:
 *     summary: Get a quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz details retrieved successfully
 *       404:
 *         description: Quiz not found
 */
router.get("/:quizId", protect, getQuizById);

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}/quizzes:
 *   post:
 *     summary: Create a new quiz for a lesson
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: What is React?
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       404:
 *         description: Lesson not found
 */
router.post("/", protect, isAdmin, createQuiz);

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}/quizzes/{quizId}:
 *   put:
 *     summary: Update a quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: Updated quiz question
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       404:
 *         description: Quiz not found
 */
router.put("/:quizId", protect, isAdmin, updateQuiz);

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}/quizzes/{quizId}:
 *   delete:
 *     summary: Delete a quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 */
router.delete("/:quizId", protect, isAdmin, deleteQuiz);

module.exports = router;
