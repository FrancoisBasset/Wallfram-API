const express = require('express');
const app = express();

const ModelIndex = require('./models');

ModelIndex
    .openDatabase()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is starting in port 3000');
        });

        //RouterManager.use(app);
    })
    .catch((err) => {
        console.error(err);
    });