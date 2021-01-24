const express = require('express');
const router = express.Router();
const { paginate, filter } = require('../middlewares/paginate');
const searchController = require('../controllers/searchController');

router.get('/', searchController.search);

module.exports = router;