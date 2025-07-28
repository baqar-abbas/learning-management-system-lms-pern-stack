module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
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
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM("published", "draft"),
        defaultValue: "published",
      },
    },
    {
      tableName: "courses",
      timestamps: true,
    }
  );

  // Define associations
  Course.associate = (models) => {
    Course.belongsToMany(models.User, { through: "UserCourses" });
    Course.hasMany(models.Lesson, {
      foreignKey: "courseId",
      onDelete: "CASCADE",
    });
  };

  return Course;
};
