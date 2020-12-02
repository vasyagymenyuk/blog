const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostImages extends Model {
    static associate(models) {}
  }

  PostImages.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      src: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PostImages',
      tableName: 'post_images',
    }
  );

  return PostImages;
};
