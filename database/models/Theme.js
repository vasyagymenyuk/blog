const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate({ Post, User }) {
      // this.belongsToMany(Post, { through: 'post_theme' });
      // this.belongsToMany(User, { through: 'user_theme' });
    }
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
