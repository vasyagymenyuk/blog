const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserTag extends Model {
    static associate(models) {}
  }

  UserTag.init(
    {
      userId: {
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
      modelName: 'UserTag',
      tableName: 'user_tag',
    }
  );

  return UserTag;
};
