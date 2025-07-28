module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define(
    "Lesson",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "lessons",
      timestamps: true,
    }
  );

  // Define associations
  Lesson.associate = (models) => {
    Lesson.belongsTo(models.Course, {
      foreignKey: "courseId",
      onDelete: "CASCADE",
    });

    Lesson.hasMany(models.Quiz, {
      foreignKey: "lessonId",
      onDelete: "CASCADE",
    });

    Lesson.hasMany(models.UserProgress, {
      foreignKey: "lessonId",
      onDelete: "CASCADE",
    });
  };

  return Lesson;
};
