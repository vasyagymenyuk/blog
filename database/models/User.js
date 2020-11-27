const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Post, Theme, Tag }) {
      this.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
      this.belongsToMany(Theme, { through: 'user_theme', as: 'themes' });
      this.belongsToMany(Tag, { through: 'user_tag', as: 'tags' });
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tel: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.STRING,
      },
      about: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          const password = bcrypt.hashSync(val, 12);

          this.setDataValue('password', password);
        },
      },

      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user',
    }
  );

  return User;
};
