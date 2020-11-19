const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTheme extends Model {
    static associate(models) {}
  }

  UserTheme.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      themeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UserTheme',
      tableName: 'user_theme',
    }
  );

  return UserTheme;
};
