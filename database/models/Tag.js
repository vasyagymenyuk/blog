const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate({ Post, User }) {
      // this.belongsToMany(Post, { through: 'post_tag' });
      // this.belongsToMany(User, { through: 'user_tag' });
    }
  }

  Tag.init(
    {
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Tag',
      tableName: 'tag',
    }
  );

  return Tag;
};
