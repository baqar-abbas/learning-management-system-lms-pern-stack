const { Quiz, Lesson } = require("../models");

exports.getQuizzesForLesson = async (req, res, next) => {
  try {
    const { lessonId } = req.params;

    // Ensure the lesson exists (optional but clearer errors)
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      const error = new Error("Lesson not found!!!");
      error.statusCode = 404;
      throw error;
    }

    const quizzes = await Quiz.findAll({
      where: { lessonId },
      order: [["id", "ASC"]],
    });

    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
};

exports.getQuizById = async (req, res, next) => {
  try {
    const { lessonId, quizId } = req.params;

    const quiz = await Quiz.findOne({
      where: { id: quizId, lessonId },
    });

    if (!quiz) {
      const error = new Error("Quiz not found!!!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(quiz);
  } catch (error) {
    next(error);
  }
};

exports.createQuiz = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const { question } = req.body;

    // Check if lesson exists
    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) {
      const error = new Error("Lesson not found!!!");
      error.statusCode = 404;
      throw error;
    }

    const quiz = await Quiz.create({
      lessonId,
      question,
    });

    res.status(201).json({
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateQuiz = async (req, res, next) => {
  try {
    const { lessonId, quizId } = req.params;
    const { question } = req.body;

    const quiz = await Quiz.findOne({
      where: { id: quizId, lessonId },
    });

    if (!quiz) {
      const error = new Error("Quiz not found!!!");
      error.statusCode = 404;
      throw error;
    }

    quiz.question = question || quiz.question;
    await quiz.save();

    res.status(200).json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    next(error);
  }
};

exports.deleteQuiz = async (req, res, next) => {
  try {
    const { lessonId, quizId } = req.params;

    const quiz = await Quiz.findOne({
      where: { id: quizId, lessonId },
    });

    if (!quiz) {
      const error = new Error("Quiz not found");
      error.statusCode = 404;
      throw error;
    }

    await quiz.destroy();

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    next(error);
  }
};
