const express = require("express");
const router = express.Router();
const {
  getAllProgress,
  getMyProgress,
  markLessonCompleted,
  updateProgress,
  deleteProgress,
} = require("../controllers/userProgressController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: UserProgress
 *   description: Manage user lesson completion progress
 */

/**
 * @swagger
 * /api/progress:
 *   get:
 *     summary: Get all user progress records (Admin only)
 *     tags: [UserProgress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all progress records
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", protect, isAdmin, getAllProgress);

/**
 * @swagger
 * /api/progress/my:
 *   get:
 *     summary: Get progress for the logged-in user
 *     tags: [UserProgress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user progress
 *       401:
 *         description: Unauthorized
 */
router.get("/my", protect, getMyProgress);

/**
 * @swagger
 * /api/progress/{lessonId}:
 *   post:
 *     summary: Mark a lesson as completed for the logged-in user
 *     tags: [UserProgress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: ID of the lesson to mark as completed
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Lesson marked as completed
 *       400:
 *         description: Already marked as completed
 *       401:
 *         description: Unauthorized
 */
router.post("/:lessonId", protect, markLessonCompleted);

/**
 * @swagger
 * /api/progress/{lessonId}:
 *   put:
 *     summary: Update progress for a lesson (toggle complete/incomplete)
 *     tags: [UserProgress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: ID of the lesson to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isCompleted:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Progress updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Progress not found
 */
router.put("/:lessonId", protect, updateProgress);

/**
 * @swagger
 * /api/progress/{id}:
 *   delete:
 *     summary: Delete a progress record (Admin only)
 *     tags: [UserProgress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the progress record to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Progress record deleted successfully
 *       404:
 *         description: Progress record not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", protect, isAdmin, deleteProgress);

module.exports = router;
