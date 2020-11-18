const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ PostTheme, PostTags }) {
      this.hasMany(PostTags, { foreignKey: 'postId', as: 'tags' });
      this.hasMany(PostTheme, { foreignKey: 'postId', as: 'themes' });
    }
  }

  Post.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'post',
    }
  );

  return Post;
};
