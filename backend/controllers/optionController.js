const { Option, Quiz } = require("../models");

// Get all options for a specific quiz
exports.getOptions = async (req, res, next) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const options = await Option.findAll({ where: { quizId } });
    res.status(200).json(options);
  } catch (error) {
    next(error);
  }
};

// Get a single option by ID
exports.getOptionById = async (req, res, next) => {
  try {
    const { quizId, optionId } = req.params;

    const option = await Option.findOne({ where: { id: optionId, quizId } });
    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }
    res.status(200).json(option);
  } catch (error) {
    next(error);
  }
};
