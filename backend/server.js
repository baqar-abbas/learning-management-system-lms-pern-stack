// backend/server.js
require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");

// 👇 Import models here
const User = require("./models/User");
const Course = require("./models/Course");
const Lesson = require("./models/Lesson");

// 👇 Sync DB
sequelize
  .sync({ alter: true }) // or use { force: true } during early dev to reset tables
  .then(() => {
    console.log("🛠 Tables synced successfully");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error syncing database:", err);
  });
