'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('users', [
      { email: 'email1@gmail.com', password: 'opensesame1', created_on: new Date(), updated_on: new Date() },
      { email: 'email2@gmail.com', password: 'opensesame2', created_on: new Date(), updated_on: new Date() },
      { email: 'email3@gmail.com', password: 'opensesame3', created_on: new Date(), updated_on: new Date() },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
