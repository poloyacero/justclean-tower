const express = require('express');
const router = express.Router();
const Cache = require('../middlewares/cache');
const towersController = require('../controllers/towersController');
const towerOfficesController = require('../controllers/towerOfficesController');
const { paginate, filter } = require('../middlewares/paginate');
const db = require('../database/mysql');
const Towers = db.towers;

router.get('/test', paginate(Towers), towersController.test);

//towers routes
router.post('/', towersController.createTowers);

router.get('/filter', filter(Towers), towersController.filterTowers);

router.get('/:id', Cache.cache, towersController.getSpecifiTowers);

router.get('/', paginate(Towers), towersController.readTowers);

router.put('/:id', towersController.updateTowers);

router.delete('/:id', towersController.deleteTowers);

//offices
router.post('/:tower_id/offices', towerOfficesController.createOffices);

router.get('/:tower_id/offices', towerOfficesController.getOffices);

router.get('/:tower_id/offices/:office_id', towerOfficesController.getSpecificOffices);

router.put('/:tower_id/offices/:office_id', towerOfficesController.updateOffices);

router.delete('/:tower_id/offices/:office_id', towerOfficesController.deleteOffices);

module.exports = router;