const axios = require("axios").default;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    await queryInterface.bulkInsert("post", data);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("post", null, {});
  },
};
