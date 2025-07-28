const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Quiz = sequelize.define(
  "Quiz",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "quizzes",
    timestamps: true,
  }
);

module.exports = Quiz;
