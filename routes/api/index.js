const express = require('express');
const app = express.Router();

app.use('/types', require('./types'));
app.use('/wallpapers', require('./wallpapers'));

module.exports = app;
