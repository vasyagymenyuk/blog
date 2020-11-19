module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        postId: 6,
        themeId: 1,
      },
      {
        postId: 3,
        themeId: 2,
      },
    ];

    await queryInterface.bulkInsert('post_theme', data);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('post_theme', null, {});
  },
};
