const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostTags extends Model {
    static associate(models) {}
  }

  PostTags.init(
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
      modelName: 'PostTags',
      tableName: 'post_tags',
    }
  );

  return PostTags;
};
