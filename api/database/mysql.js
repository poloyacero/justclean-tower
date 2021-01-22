const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_MYSQL_NAME, process.env.DB_MYSQL_USERNAME, process.env.DB_MYSQL_PASSWORD, {
    dialect: process.env.DB_MYSQL_DIALECT,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//models
//b.users = require('../models/usersModel')(sequelize, Sequelize);
db.towers = require('../models/towersModel')(sequelize, Sequelize);
db.towersRatings = require('../models/towersRatingsModel')(sequelize, Sequelize);
db.offices = require('../models/officesModel')(sequelize, Sequelize);

//relationships
db.towers.hasMany(db.offices, {
    as: 'offices',
    useJunctionTable: false
});

db.towers.hasMany(db.towersRatings, {
    as: 'ratings'
});

db.offices.belongsTo(db.towers, {
    foreignKey: 'tower_id',
    constraints: false
});

sequelize.sync().then(result => {
    console.log('MariaDB/MySQL database and tables are up');
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.log('Unable to connect to the database: ', err);
    });

module.exports = db;