'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: "Email not available"
        },
        isEmail: true
      },
      password: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('users');
  }
};
