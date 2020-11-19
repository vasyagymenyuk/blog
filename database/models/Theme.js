const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate(models) {}
  }

  Theme.init(
    {
      theme: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Theme',
      tableName: 'theme',
    }
  );

  return Theme;
};
