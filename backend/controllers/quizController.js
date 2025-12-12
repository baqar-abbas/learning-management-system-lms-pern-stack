const { Quiz, Lesson, Option, UserQuiz, UserProgress } = require("../models");

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
      include: [{ model: Option, as: "options" }],
      order: [
        ["id", "ASC"],
        [{ model: Option, as: "options" }, "id", "ASC"],
      ],
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
      include: [{ model: Option, as: "options" }],
      order: [[{ model: Option, as: "options" }, "id", "ASC"]],
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

// POST /courses/:courseId/lessons/:lessonId/quizzes/:quizId/submit
// body: { selectedOptionIds: [1, 2] }  (for single-select quiz it'll be [optionId])

exports.submitQuiz = async (req, res, next) => {
  try {
    const { courseId, lessonId, quizId } = req.params;
    const { selectedOptionIds } = req.body; // array of option ids

    if (!Array.isArray(selectedOptionIds) || selectedOptionIds.length === 0) {
      const err = new Error(
        "selectedOptionIds must be a non-empty array of option IDs"
      );
      err.statusCode = 400;
      throw err;
    }

    // verify lesson exists and belongs to course
    const lesson = await Lesson.findOne({ where: { id: lessonId, courseId } });
    if (!lesson) {
      const err = new Error("Lesson not found");
      err.statusCode = 404;
      throw err;
    }

    // verify quiz exists and belongs to lesson
    const quiz = await Quiz.findOne({ where: { id: quizId, lessonId } });
    if (!quiz) {
      const err = new Error("Quiz not found");
      err.statusCode = 404;
      throw err;
    }

    // load options for the quiz and determine correct ones
    const options = await Option.findAll({ where: { quizId } });
    if (!options || options.length === 0) {
      const err = new Error("No options available for this quiz");
      err.statusCode = 400;
      throw err;
    }

    // Map optionId -> isCorrect
    const optMap = {};
    options.forEach((o) => (optMap[o.id] = !!o.isCorrect));

    // Score: count correct selections. We'll treat this quiz as single-question multi-option.
    // If there is exactly one correct option, expect single-select; otherwise allow multi-select scoring.
    const correctOptionIds = options
      .filter((o) => o.isCorrect)
      .map((o) => o.id);

    // Compute score: simple approach:
    // +1 for each correct option selected, 0 for wrong selected (no negative marking).
    // total = number of correct options
    let score = 0;
    for (const selected of selectedOptionIds) {
      if (optMap[selected]) score += 1;
    }

    const total = correctOptionIds.length || 1;
    const passed = total > 0 ? score === total : score > 0; // pass only when all correct chosen

    // store user attempt
    const attempt = await UserQuiz.create({
      userId: req.user.id,
      quizId: quiz.id,
      score,
      total,
      passed,
      answers: selectedOptionIds.map((id) => ({
        optionId: id,
        isCorrect: !!optMap[id],
      })),
    });

    // Optionally: if passed, mark lesson completed in user_progress (if not already)
    if (passed) {
      const existing = await UserProgress.findOne({
        where: { userId: req.user.id, lessonId },
      });
      if (!existing) {
        await UserProgress.create({
          userId: req.user.id,
          lessonId,
          isCompleted: true,
          completedAt: new Date(),
        });
      }
    }

    res.status(201).json({
      message: "Quiz submitted",
      attempt: {
        id: attempt.id,
        score: attempt.score,
        total: attempt.total,
        passed: attempt.passed,
        answers: attempt.answers,
      },
      correctOptionIds, // helpful for frontend feedback
    });
  } catch (error) {
    next(error);
  }
};
