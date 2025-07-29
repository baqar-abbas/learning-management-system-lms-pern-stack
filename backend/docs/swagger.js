// /docs/swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LMS API Documentation",
      version: "1.0.0",
      description: "API docs for the LMS (Learning Management System)",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Point to your route files for annotations
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
