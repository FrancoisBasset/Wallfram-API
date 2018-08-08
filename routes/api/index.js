const express = require('express');
const app = express.Router();

app.use('/types', require('./types'));

module.exports = app;