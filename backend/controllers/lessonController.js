const { Lesson, Course } = require("../models");

exports.getLessonsForCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    // Ensure the course exists (optional but clearer errors)
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course Not found" });
    }

    const lessons = await Lesson.findAll({
      where: { courseId },
      order: [
        ["order", "ASC"],
        ["id", "ASC"],
      ],
    });

    res.status(201).json(lessons);
  } catch (error) {
    next(error);
  }
};

exports.getLessonById = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;

    const lesson = await Lesson.findOne({
      where: { id: lessonId, courseId },
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    next(error);
  }
};

exports.createLesson = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, content, order } = req.body;

    // Check if course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Create the lesson
    const lesson = await Lesson.create({
      title,
      content,
      order,
      courseId,
    });

    res.status(201).json({
      message: "Lesson created successfully",
      lesson,
    });
  } catch (error) {
    console.error("Error creating lesson:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    Update a lesson by ID
// @route   PUT /courses/:courseId/lessons/:lessonId
// @access  Private/Admin

exports.updateLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const { title, content, order } = req.body;

    const lesson = await Lesson.findOne({
      where: { id: lessonId, courseId },
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    //update fields if provided
    lesson.title = title || lesson.title;
    lesson.content = content || lesson.content;
    lesson.order = order || lesson.order;

    await lesson.save();
    res.status(201).json({ message: "Lesson updated successfully", lesson });
  } catch (error) {
    console.error("Error updating lesson:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteLesson = async (req, res, next) => {
  try {
    const { courseId, lessonId } = req.params;

    const lesson = await Lesson.findOne({
      where: { id: lessonId, courseId },
    });

    if (!lesson) {
      res.status(404).json({ message: "Lesson not found" });
    }

    await lesson.destroy();
    res.status(200).json({ message: "Lesson deleted successfully" });
  } catch (error) {
    next(error);
  }
};
