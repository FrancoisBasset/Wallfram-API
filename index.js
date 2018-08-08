const express = require('express');
const app = express();

const ModelIndex = require('./models');
const RouterManager = require('./routes');

const expressOasGenerator = require('express-oas-generator');
expressOasGenerator.init(app, {});

ModelIndex
    .openDatabase()
    .then(() => {
        app.listen(8080, () => {
            console.log('Server is starting in port 8080');
        });

        RouterManager.use(app);
    })
    .catch((err) => {
        console.error(err);
    });