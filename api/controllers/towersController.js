'use strict';

const db = require('../database/mysql');
const Towers = db.towers;
const Offices = db.offices;
const Cache = require('../middlewares/cache');
const towersController = {};

towersController.createTowers = async (req, res, next) => {
    try {
        const {name, location, num_floors, num_offices, rating, latitude, longitude } = req.body;
        const result = await Towers.create({
            name: name,
            location: location,
            num_floors: num_floors,
            num_offices: num_offices,
            rating: rating,
            latitude: latitude,
            longitude: longitude
        });

        if(result !== null && result.length !== 0) {
            res.status(201).json({
                status: 'success',
                action: 'create',
                data: result
            });
        }

    }catch(e) {
        res.status(500).json(e);
    }
};

towersController.readTowers = async (req, res, next) => {
    try {
        const result = await Towers.findAll(
            /*{
                include: [{
                    model: Offices,
                    as: 'offices'
                }]
            }*/
        );
        if(result !== null && result.length !== 0) {
            res.status(200).json({
                status: 'success',
                action: 'fetch',
                data: result
            });
        }
    }catch(e) {
        res.status(500).json(e);
    }
};

towersController.getSpecifiTowers = async (req, res, next) => {
    try {
        const category = req.baseUrl;
        const { id } = req.params;
        const result = await Towers.findOne(
                { where: {id: id} },
                /*include: [{
                    model: Offices,
                    as: 'offices'
                }]*/
            );
        if(result !== null && result.length !== 0) {
            console.log('Fetching Data...');
            await Cache.setCache(category, id, JSON.stringify(result));

            res.status(200).json({
                status: 'success',
                action: 'fetch',
                data: result,
            });
        }else{
            res.status(404).json({
                status: 'fail',
                action: 'fetch',
                message: 'Tower not found',
            });
        }
    }catch(e) {
        res.status(500).json(e);
    }
};

towersController.updateTowers = async (req, res, next) => {
    try {
        const category = req.baseUrl;
        const { id } = req.params;
        const { name, location, num_floors, num_offices, rating, latitude, longitude } = req.body;

        const values = {
            name: name,
            location: location,
            num_floors: num_floors,
            num_offices: num_offices,
            rating: rating,
            latitude: latitude,
            longitude: longitude
        };

        const result = await Towers.update(
            values,
            { 
                where: { id: id },
                returning: true,
                plain: true
            }
        );

        if(result[0] !== null && result[1] !== 0) {
            Cache.delete(category, id);
            res.status(200).json({
                status: 'success',
                action: 'update',
                data: result
            });
        }else {
            res.status(404).json({
                status: 'fail',
                action: 'update',
                message: 'Tower not found',
            });
        }

    }catch(e) {
        res.status(500).json(e);
    }
};

towersController.deleteTowers = async (req, res, next) => {
    try {
        const category = req.baseUrl;
        const { id } = req.params;
        const result = await Towers.destroy({
            where: {
                id: id
            }
        });

        if(result !== null && result !== 0) {
            await Cache.delete(category, id);
            res.status(200).json({
                status: 'success',
                action: 'delete',
                message: 'Tower deleted'
            });
        }else{
            res.status(404).json({
                status: 'fail',
                action: 'delete',
                message: 'Tower not found'
            });
        }
    }catch(e) {
        res.status(500).json(e);
    }
};

module.exports = towersController;