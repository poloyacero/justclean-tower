'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('towers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      num_floors: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      num_offices: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      rating: {
        type: Sequelize.DECIMAL(2, 1),
        allowNull: true
      },
      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false
      },
      created_on: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_on: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deleted_on: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('towers');
  }
};
