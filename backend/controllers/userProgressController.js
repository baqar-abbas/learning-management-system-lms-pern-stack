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
