const express = require("express");
const router = express.Router();

// Import route modules
const authRoutes = require("./authRoutes");
const courseRoutes = require("./courseRoutes");
// const lessonRoutes = require('./lessonRoutes'); // Add later
// const quizRoutes = require('./quizRoutes');     // Add later

// Mount routes
router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
// router.use('/lessons', lessonRoutes);
// router.use('/quizzes', quizRoutes);

module.exports = router;
