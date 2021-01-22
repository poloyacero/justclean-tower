const express = require('express');
const router = express.Router();
const Cache = require('../middlewares/cache');
const towerController = require('../controllers/towersController');

router.post('/', towerController.createTowers);

router.get('/:id', Cache.cache, towerController.getSpecifiTowers);

router.get('/', towerController.readTowers);

router.put('/:id', towerController.updateTowers);

router.delete('/:id', towerController.deleteTowers);

module.exports = router;