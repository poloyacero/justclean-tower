const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//routes
const authRoutes = require('./api/routes/auth');
const towersRoutes = require('./api/routes/towers');
const searchRoutes = require('./api/routes/search');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//v1 routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/towers', towersRoutes);
app.use('/api/v1/search', searchRoutes);

module.exports = app;