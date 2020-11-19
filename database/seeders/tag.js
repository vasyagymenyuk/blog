module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      { tag: '#искусственныйинтелект' },
      { tag: '#нейросети' },
      { tag: '#тортикпобыстрому' },
      { tag: '#здоровыеогурцы' },
    ];

    await queryInterface.bulkInsert('tag', data);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tag', null, {});
  },
};
