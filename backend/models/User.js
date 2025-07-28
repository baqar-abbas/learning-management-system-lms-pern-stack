// backend/models/User.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("student", "admin"),
        defaultValue: "student",
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  // Define associations here
  User.associate = (models) => {
    User.belongsToMany(models.Course, { through: "UserCourses" });
    User.hasMany(models.UserProgress, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };

  return User;
};
