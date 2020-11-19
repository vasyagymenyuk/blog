module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        userId: 1,
        title: 'Лоббирование хомяков для посадки огорода',
        content:
          'Хомяки могут не только жрать, но и трудиться на вашем огороде. Перейди по ссылке чтобы узнать как научить их этому.',
      },

      {
        userId: 2,
        title: 'Тортик, от корого гостей за уши не оттянешь',
        content: 'Делаем торт без каких либо ингредиентов',
      },
    ];

    await queryInterface.bulkInsert('post', data);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('post', null, {});
  },
};
