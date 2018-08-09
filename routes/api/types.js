const express = require('express');
const app = express.Router();

const TypesController = require('../../controllers/types');
const WallpapersController = require('../../controllers/wallpapers');

app.get('/', (req, res) => {
    var seq = undefined;

    if (Object.keys(req.query).length === 0) {
        seq = TypesController.findAll();
    } else if (Object.keys(req.query).length === 1) {
        if (req.query.id !== undefined) {
            seq = TypesController.findById(req.query.id);
        }
        if (req.query.value !== undefined) {
            seq = TypesController.findByValue(req.query.value);
        }
    }

    seq.then(types => {
        res.status(200).json(types);
    }).catch(err => {
        res.status(500).json(err);
    });
});

app.post('/', (req, res) => {
    TypesController.create(req.body.value)
        .then(type => {
            res.status(201).json(type);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

app.put('/', (req, res) => {
    TypesController.update(req.body.id, req.body.value)
        .then(type => {
            res.status(200).json(type);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

app.delete('/', (req, res) => {
    TypesController.destroy(req.body.id)
        .then(type => {
            res.status(200).json(type);
        })
        .catch(err => {
           res.status(500).json(err);
        });
});

module.exports = app;
