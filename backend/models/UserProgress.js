module.exports = (sequelize, DataTypes) => {
  const UserProgress = sequelize.define(
    "UserProgress",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "user_progress",
      timestamps: true,
    }
  );

  // Define associations
  UserProgress.associate = (models) => {
    UserProgress.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    UserProgress.belongsTo(models.Lesson, {
      foreignKey: "lessonId",
      onDelete: "CASCADE",
    });
  };

  return UserProgress;
};
