const express = require('express');
const router = express.Router();
const Cache = require('../middlewares/cache');
const towersController = require('../controllers/towersController');
const towerOfficesController = require('../controllers/towerOfficesController');

//towers routes
router.post('/', towersController.createTowers);

router.get('/:id', Cache.cache, towersController.getSpecifiTowers);

router.get('/', towersController.readTowers);

router.put('/:id', towersController.updateTowers);

router.delete('/:id', towersController.deleteTowers);

//offices
router.post('/:tower_id/offices', towerOfficesController.createOffices);

router.get('/:tower_id/offices', towerOfficesController.getOffices);

router.get('/:tower_id/offices/:office_id', towerOfficesController.getSpecificOffices);

router.put('/:tower_id/offices/:office_id', towerOfficesController.updateOffices);

router.delete('/:tower_id/offices/:office_id', towerOfficesController.deleteOffices);

module.exports = router;