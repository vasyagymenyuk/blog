module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('post-images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      src: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post-images');
  },
};
