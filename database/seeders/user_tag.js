module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      { userId: 1, tagId: 1 },
      // { userId: 1, tagId: 2 },
      // { userId: 2, tagId: 3 },
      // { userId: 2, tagId: 4 },
    ];

    await queryInterface.bulkInsert('user_tag', data);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_tag', null, {});
  },
};
