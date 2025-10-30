const { UserProgress, Lesson, User } = require("../models");

// Controller to handle user progress

// Find all user progress records
exports.getAllProgress = async (req, res, next) => {
  try {
    const progress = await UserProgress.findAll({
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Lesson, attributes: ["id", "title"] },
      ],
    });
    res.status(200).json(progress);
  } catch (error) {
    next(error);
  }
};

// Get progress for the logged-in user
exports.getMyProgress = async (req, res, next) => {
  try {
    const progress = await UserProgress.findAll({
      where: { userId: req.user.id },
      include: [{ model: Lesson, attributes: ["id", "title"] }],
    });
    res.status(200).json(progress);
  } catch (error) {
    next(error);
  }
};

// Mark a lesson as completed for the logged-in user
exports.markLessonCompleted = async (req, res, next) => {
  try {
    const { lessonId } = req.params;

    // Check if already completed
    const existing = await UserProgress.findOne({
      where: { userId: req.user.id, lessonId },
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Lesson already marked as completed." });
    }

    const progress = await UserProgress.create({
      userId: req.user.id,
      lessonId,
      isCompleted: true,
      completedAt: new Date(),
    });

    res.status(201).json({
      message: "Lesson marked as completed!",
      progress,
    });
  } catch (error) {
    next(error);
  }
};

// Update progress (toggle complete/incomplete)
exports.updateProgress = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const { isCompleted } = req.body;

    const progress = await UserProgress.findOne({
      where: { userId: req.user.id, lessonId },
    });

    if (!progress) {
      return res
        .status(404)
        .json({ message: "Progress not found for this lesson." });
    }

    progress.isCompleted = isCompleted;
    progress.completedAt = isCompleted ? new Date() : null;
    await progress.save();

    res.status(200).json({
      message: "Progress updated successfully.",
      progress,
    });
  } catch (error) {
    next(error);
  }
};

// Delete progress record (Admin only)
exports.deleteProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await UserProgress.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Progress record not found." });
    }

    res.status(200).json({ message: "Progress record deleted successfully." });
  } catch (error) {
    next(error);
  }
};
