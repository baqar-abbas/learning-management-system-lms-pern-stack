// backend/app.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger"); // Import Swagger config
const routes = require("./routes"); // ⬅️ Import centralized routes

const app = express();

app.use(cors());
app.use(express.json());

// API documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount all API routes under /api
app.use("/api", routes); // ⬅️ Use centralized routes

// API health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is healthy 👌" });
});

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = app;
