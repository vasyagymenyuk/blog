const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostTheme extends Model {
    static associate(models) {}
  }

  PostTheme.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      theme: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PostTheme',
      tableName: 'post_theme',
    }
  );

  return PostTheme;
};
