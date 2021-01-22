'use strict';

module.exports = (sequelize, Sequelize) => {
    const TowersRatings = sequelize.define('towers_ratings', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        tower_id: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        rating: {
            type: Sequelize.DECIMAL(2, 1),
            allowNull: true,
            validate: {
                min: 0,
                max: 5
            }
        }
    }, {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_on',
        updatedAt: 'updated_on',
        deletedAt: 'deleted_on',
        underscored: true
    });

    return TowersRatings;
}