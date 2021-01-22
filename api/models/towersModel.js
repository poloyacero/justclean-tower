'use strict';

module.exports = (sequelize, Sequelize) => {
    const Towers = sequelize.define('towers', {
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
        }
    }, {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on',
        deletedAt: 'deleted_on',
        underscored: true
    });

    return Towers;
}