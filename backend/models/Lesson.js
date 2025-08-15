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
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "courses", // table name for Course
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "lessons",
      timestamps: true,
    }
  );

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
