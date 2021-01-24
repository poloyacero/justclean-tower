'use strict';

const db = require('../database/mysql');
const Towers = db.towers;
const Offices = db.offices;
const { Op } = require("sequelize");
const Cache = require('../middlewares/cache');
const searchController = {};

searchController.search = async (req, res, next) => {
    const { name, location, num_floors, num_offices, rating, sort, order } = req.query;
    let options = {
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: "%" + name + "%"
                    }
                },
                {
                    location: {
                        [Op.like]: "%" + location + "%"
                    }
                },
                {
                    num_floors: {
                        [Op.lte]: num_floors
                    }
                },
                {
                    num_offices: {
                        [Op.lte]: num_offices
                    }
                },
                {
                    rating: {
                        [Op.gte]: rating
                    }
                }
            ]
        }
    }

    const result = await Towers.findAll(options);
    res.status(200).json(result);
};

module.exports = searchController;