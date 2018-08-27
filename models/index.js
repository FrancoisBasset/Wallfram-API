'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const basename = path.basename(module.filename);

const ModelIndex = {};

ModelIndex.getModel = function (modelName) {
    return this[modelName];
};

const sequelize = new Sequelize('wallfram', null, null, {
    dialect: 'sqlite',
    storage: 'db/wallfram.sqlite',
    operatorsAliases: Op
});

// LOAD MODELS
fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = sequelize['import'](path.join(__dirname, file));
        ModelIndex[model.name] = model;
    });

Object.keys(ModelIndex)
    .forEach((modelName) => {
        if (ModelIndex[modelName].associate) {
            ModelIndex[modelName].associate(ModelIndex);
        }
    });

ModelIndex.sequelize = sequelize;
ModelIndex.Sequelize = Sequelize;
ModelIndex.openDatabase = function() {
    return sequelize
        .authenticate()
        .then(() => sequelize.sync(/*{
            force: true
        }*/));
};

module.exports = ModelIndex;
