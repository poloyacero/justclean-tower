const express = require('express');
const router = express.Router();
const Cache = require('../middlewares/cache');
const towersController = require('../controllers/towersController');
const towerOfficesController = require('../controllers/towerOfficesController');
const { paginate, filter } = require('../middlewares/paginate');
const db = require('../database/mysql');
const Towers = db.towers;
const Auth = require('../middlewares/auth');

//towers routes
router.post('/', Auth.checkAuth, towersController.createTowers);

router.get('/filter', filter(Towers), towersController.filterTowers);

router.get('/:id', Cache.cache, towersController.getSpecifiTowers);

router.get('/', paginate(Towers), towersController.readTowers);

router.put('/:id', Auth.checkAuth, towersController.updateTowers);

router.delete('/:id', Auth.checkAuth, towersController.deleteTowers);

//offices
router.post('/:tower_id/offices', Auth.checkAuth, towerOfficesController.createOffices);

router.get('/:tower_id/offices', towerOfficesController.getOffices);

router.get('/:tower_id/offices/:office_id', towerOfficesController.getSpecificOffices);

router.put('/:tower_id/offices/:office_id', Auth.checkAuth, towerOfficesController.updateOffices);

router.delete('/:tower_id/offices/:office_id', Auth.checkAuth, towerOfficesController.deleteOffices);

module.exports = router;