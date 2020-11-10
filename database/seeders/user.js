const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        firstName: 'Василий',
        lastName: 'Гуменюк',
        email: 'ivanan301@gmmail.com',
        tel: '+7707 729 1820',
        birthday: '2001-07-16',
        about:
          'Макро-блоггер с большим жизненным опытом, научу правильно писать  не ГАВНО-КОД',
        password: await bcrypt.hash('vasya2001', 12),
      },
      {
        firstName: 'Светлана',
        lastName: 'Косичкина',
        email: 'sveta@gmail.com',
        tel: '+7707 789 4545',
        birthday: '1995-07-16',
        about: 'Кулинарный эксперт в области узбекистана',
        password: await bcrypt.hash('povar123', 12),
      },
    ];

    await queryInterface.bulkInsert('user', data);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};
