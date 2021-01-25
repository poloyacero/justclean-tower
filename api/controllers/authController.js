const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

const authController = {};

console.log('configs', config);

const User = [
    { id: 1, email: "emails@gmail.com", password: "opensesames"},
    { id: 2, email: "email@gmail.com", password: "opensesame"}
];

authController.login = async (req, res, next) => {
    try {
        let token = "";
        const { email, password } = req.body;
        console.log('BODY', req.body);
        const index = await User.findIndex(el => el.email === email);
        console.log('INDEX', index);
        if(User[index].password === password){
            token = await jwt.sign(
                {
                    userId: User[index].id,
                    email: User[index].email,
                },
                config.JWT_KEY,
                {
                    expiresIn: "12h"
                }
            );
            console.log('u here');
            if(token !== null) {
                console.log('and');
                res.status(200).json({
                    status: "success",
                    action: "login",
                    token: token,
                    message: 'Authentication successful'
                });
            }
        }else{
            res.status(401).json({
                status: "fail",
                action: "login",
                message: 'Authentication failed'
            });
        }
    }catch(e) {
        res.status(500).json(e);
    }
};

module.exports = authController;