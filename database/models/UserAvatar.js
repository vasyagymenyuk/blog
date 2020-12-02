const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserAvatar extends Model {
    static associate(models) {}
  }

  UserAvatar.init(
    {
      userId: {
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
      modelName: 'UserAvatar',
      tableName: 'user_avatar',
    }
  );

  return UserAvatar;
};
