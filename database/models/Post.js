const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ Theme, Tag, PostImages }) {
      this.belongsToMany(Theme, { through: 'post_theme', as: 'themes' });
      this.belongsToMany(Tag, { through: 'post_tag', as: 'tags' });
      this.hasMany(PostImages, {
        foreignKey: 'postId',
        as: 'images',
        onDelete: 'CASCADE',
        hooks: true,
      });
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
      body: {
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
