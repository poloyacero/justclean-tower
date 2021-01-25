const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

const Auth = {};

Auth.checkAuth = async (req, res, next) => {
    try {
        console.log('ATH', req.headers.authorization);
        const token = req.headers.authorization.split(" ")[1];
        const verified = await jwt.verify(token, config.JWT_KEY);
        console.log('VER', verified);
        if(verified !== null) {
            return next();
        }
    }catch(e) {;
        res.status(500).json(e);
    }
}

module.exports = Auth;