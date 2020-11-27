const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    static associate(models) {}
  }

  PostTag.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PostTag',
      tableName: 'post_tag',
    }
  );

  return PostTag;
};
