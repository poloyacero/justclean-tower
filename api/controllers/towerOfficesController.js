'use strict';

const db = require('../database/mysql');
const Offices = db.offices;
const Cache = require('../middlewares/cache');
const towerOfficesController = {};

towerOfficesController.createOffices = async (req, res, next) => {
    try{
        const { tower_id } = req.params;
        const { name, area } = req.body;
        const result = await Offices.create({
            tower_id: tower_id,
            name: name,
            area: area
        });
        if(result !== null) {
            res.status(201).json({
                status: 'success',
                action: 'create',
                data: result
            });
        }
    }catch(e){
        res.status(500).json(e);
    }
};

towerOfficesController.getOffices = async (req, res, next) => {
    try {
        const { tower_id } = req.params;
        const result = await Offices.findAll({ where: { tower_id: tower_id } });
        if(result !== null && result.length !== 0) {
            res.status(200).json({
                status: 'success',
                action: 'fetch',
                data: result
            });
        }else{
            res.status(404).json({
                status: 'fail',
                action: 'fetch',
                message: 'Offices not found',
            });
        }
    }catch(e) {
        res.status(500).json(e);
    }
};

towerOfficesController.getSpecificOffices = async (req, res, next) => {
    try {
        //const category = req.baseUrl;
        const { tower_id, office_id } = req.params;
        console.log(office_id);
        const result = await Offices.findOne({ where: {tower_id: tower_id, id: office_id} });
        if(result !== null && result.length !== 0) {
            console.log('Fetching Data...');
            //await Cache.setCache(category, id, JSON.stringify(result));

            res.status(200).json({
                status: 'success',
                action: 'fetch',
                data: result,
            });
        }else{
            res.status(404).json({
                status: 'fail',
                action: 'fetch',
                message: 'Office not found',
            });
        }
    }catch(e) {
        res.status(500).json(e);
    }
};

towerOfficesController.updateOffices = async (req, res, next) => {
    try{
        const { tower_id, office_id } = req.params;
        const { name, area } = req.body;
        const newTower_id = req.body.tower_id;

        const values = {
            tower_id: newTower_id ? newTower_id : tower_id,
            name: name,
            area: area
        };

        const result = await Offices.update(
            values,
            { 
                where: { tower_id: tower_id, id: office_id },
                returning: true,
                plain: true
            }
        );

        if(result[0] !== null && result[1] !== 0) {
            res.status(200).json({
                status: 'success',
                action: 'update',
                data: result
            });
        }else {
            res.status(404).json({
                status: 'fail',
                action: 'update',
                message: 'Office not found',
            });
        }
    }catch(e){
        res.status(500).json(e);
    }
};

towerOfficesController.deleteOffices = async (req, res, next) => {
    try {
        const { tower_id, office_id } = req.params;
        const result = await Offices.destroy({
            where: {
                tower_id: tower_id,
                id: office_id
            }
        });

        if(result !== null && result !== 0) {
            res.status(200).json({
                status: 'success',
                action: 'delete',
                message: 'Office deleted'
            });
        }else{
            res.status(404).json({
                status: 'fail',
                action: 'delete',
                message: 'Office not found'
            });
        }
    }catch(e) {
        res.status(500).json(e);
    }
};

module.exports = towerOfficesController;