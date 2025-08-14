const { Lesson, Course } = require("../models");

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
