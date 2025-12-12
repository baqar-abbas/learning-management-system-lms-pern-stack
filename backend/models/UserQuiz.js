const { sequelize } = require("../config/database");

// models/userQuiz.js
module.exports = (sequelize, DataTypes) => {
  const UserQuiz = sequelize.define(
    "UserQuiz",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      passed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // store answers as JSON: [{ optionId, isCorrect }, ...]
      answers: {
        type: DataTypes.JSONB || DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      tableName: "user_quizzes",
      timestamps: true,
    }
  );
};

UserQuiz.associate = (models) => {
  UserQuiz.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
  UserQuiz.belongsTo(models.Quiz, {
    foreignKey: "quizId",
    onDelete: "CASCADE",
  });
};
