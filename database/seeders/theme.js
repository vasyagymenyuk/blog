module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      { theme: 'Программирование' },
      { theme: 'Сад и огород' },
      { theme: 'Наука и техника' },
      { theme: 'Кулинария' },
    ];

    await queryInterface.bulkInsert('theme', data);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('theme', null, {});
  },
};
