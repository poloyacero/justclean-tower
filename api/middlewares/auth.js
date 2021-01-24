const jwt = require('jsonwebtoken');

const Auth = {};

Auth.checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verified = await jwt.verify(token, process.env.JWT_KEY);
        if(verified !== null) {
            return next();
        }
    }catch(e) {;
        res.status(500).json(e);
    }
}

module.exports = Auth;