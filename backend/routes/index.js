const express = require("express");
const router = express.Router();

// Import route modules
const authRoutes = require("./authRoutes");
const courseRoutes = require("./courseRoutes");
const userProgressRoutes = require("./userProgressRoutes");

// Mount routes
router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/progress", userProgressRoutes);

module.exports = router;
