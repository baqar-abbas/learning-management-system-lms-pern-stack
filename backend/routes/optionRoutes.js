const express = require("express");
const router = express.Router({ mergeParams: true });
import {
  getOptions,
  getOptionById,
  createOption,
  updateOption,
  deleteOption,
} from "../controllers/optionController";
const { protect, isAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Options
 *   description: Manage options for a specific quiz
 */

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}/quizzes/{quizId}/options:
 *   get:
 *     summary: Get all options for a specific quiz
 *     tags: [Options]
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
 *         description: List of options retrieved successfully
 *       404:
 *         description: Quiz not found
 */
router.get("/", protect, getOptions);

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}/quizzes/{quizId}/options/{optionId}:
 *   get:
 *     summary: Get an option by ID
 *     tags: [Options]
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
 *       - in: path
 *         name: optionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Option retrieved successfully
 *       404:
 *         description: Option not found
 */
router.get("/:optionId", protect, getOptionById);

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}/quizzes/{quizId}/options:
 *   post:
 *     summary: Create a new option for a quiz
 *     tags: [Options]
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
 *               text:
 *                 type: string
 *                 example: "React is a frontend library"
 *               isCorrect:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Option created successfully
 *       404:
 *         description: Quiz not found
 */
router.post("/", protect, isAdmin, createOption);

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}/quizzes/{quizId}/options/{optionId}:
 *   put:
 *     summary: Update an option
 *     tags: [Options]
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
 *       - in: path
 *         name: optionId
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
 *               text:
 *                 type: string
 *                 example: "Updated option text"
 *               isCorrect:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Option updated successfully
 *       404:
 *         description: Option not found
 */
router.put("/:optionId", protect, isAdmin, updateOption);

/**
 * @swagger
 * /courses/{courseId}/lessons/{lessonId}/quizzes/{quizId}/options/{optionId}:
 *   delete:
 *     summary: Delete an option
 *     tags: [Options]
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
 *       - in: path
 *         name: optionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Option deleted successfully
 *       404:
 *         description: Option not found
 */
router.delete("/:optionId", protect, isAdmin, deleteOption);

module.exports = router;
