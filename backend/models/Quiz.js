module.exports = (sequelize, DataTypes) => {
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

  // Define associations
  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Lesson, {
      foreignKey: "lessonId",
      onDelete: "CASCADE",
    });

    Quiz.hasMany(models.Option, {
      foreignKey: "quizId",
      onDelete: "CASCADE",
    });
  };

  return Quiz;
};
