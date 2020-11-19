module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      { userId: 1, themeId: 1 },
      { userId: 1, themeId: 2 },
      { userId: 2, themeId: 3 },
      { userId: 2, themeId: 4 },
    ];

    await queryInterface.bulkInsert('user_theme', data);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_theme', null, {});
  },
};
