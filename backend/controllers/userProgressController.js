const { UserProgress, Lesson, User } = require("../models");

// Controller to handle user progress

exports.getAllProgress = async (req, resizeBy, next) => {
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
