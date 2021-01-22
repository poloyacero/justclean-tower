'use strict';

module.exports = (sequelize, Sequelize) => {
    const Offices = sequelize.define('offices', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        tower_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        area: {
            type: Sequelize.DECIMAL(2, 1),
            allowNull: true,
        }
    }, {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on',
        deletedAt: 'deleted_on',
        underscored: true
    });

    return Offices;
}