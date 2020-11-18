module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [{}, {}];

    await queryInterface.bulkInsert('post', data);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('post', null, {});
  },
};
