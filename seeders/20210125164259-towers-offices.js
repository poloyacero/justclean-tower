'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('towers', [
      { name: 'Park Place Tower', location: 'Sheikh Zayed Rd, Trade CentreTrade Centre 1, Dubai', num_floors: 10, num_offices: 100, rating: null, latitude: 25.14202667, longitude: 55.18511805, created_on: new Date(), updated_on: new Date() },
      { name: 'Churchill Tower', location: 'Al Amal St, Business Bay, Dubai', num_floors: 100, num_offices: 1000, rating: null, latitude: 25.19799305, longitude: 55.2743764, created_on: new Date(), updated_on: new Date() }
    ], {});

    const towers = await queryInterface.sequelize.query(
      `SELECT id from towers;`
    );

    const towersRows = towers[0];

    return await queryInterface.bulkInsert('offices', [
      { name: 'Office 1', area: 100.20, tower_id: towersRows[0].id, created_on: new Date(), updated_on: new Date() },
      { name: 'Office 2', area: 100.30, tower_id: towersRows[0].id, created_on: new Date(), updated_on: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('offices', null, {});
    await queryInterface.bulkDelete('towers', null, {});
  }
};
