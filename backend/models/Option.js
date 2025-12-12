module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define(
    "Option",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "options",
      timestamps: true,
    }
  );

  // Define associations
  Option.associate = (models) => {
    Option.belongsTo(models.Quiz, {
      as: "quiz",
      foreignKey: "quizId",
      onDelete: "CASCADE",
    });
  };

  return Option;
};
