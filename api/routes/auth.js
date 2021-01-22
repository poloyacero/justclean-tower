const express = require('express');
const router = express.Router();
const redis = require('redis');

router.get('/test', (req, res) => {
    console.log(req.query);
    res.status(200).json({
        message: 'Hello human'
    });
});

module.exports = router;