'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('offices', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      tower_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          /*references: {
            model: 'Towers',
            key: 'id',
            as: 'tower'
          }*/
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      area: {
          type: Sequelize.DECIMAL(5, 2),
          allowNull: true,
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
    await queryInterface.dropTable('offices');
  }
};
