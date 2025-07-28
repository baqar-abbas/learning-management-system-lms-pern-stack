// backend/server.js
require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");
const db = require("./models"); // central access to all models and sequelize

// 👇 Sync DB using central instance
db.sequelize
  .sync({ alter: true }) // or use { force: true } during development
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
