const express = require('express');
const app = express.Router();
const fs = require('fs');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './files/wallpapers');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

const WallpapersController = require('../../controllers/wallpapers');

app.get('/', (req, res) => {
    var seq = undefined;

    if (Object.keys(req.query).length === 0) {
        seq = WallpapersController.findAll()
    } else if (Object.keys(req.query).length === 1 && req.query.id !== undefined) {
        seq = WallpapersController.findById(req.query.id);
    } else {
        seq = WallpapersController.findAll()
            .then(wallpapers => {
                Object.keys(req.query).forEach(q => {
                    switch (q) {
                        case 'type':
                            console.log(req.query);
                            wallpapers = WallpapersController.findByType(wallpapers, parseInt(req.query.type));
                            break;
                        case 'dimensions':
                            const width = parseInt(req.query.dimensions.split('x')[0]);
                            const height = parseInt(req.query.dimensions.split('x')[1]);

                            wallpapers = WallpapersController.findByDimensions(wallpapers, width, height);
                            break;
                    }
                });

                return wallpapers;
            });
    }

    seq
        .then(wallpapers => {
            res.status(200).json(wallpapers);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

app.post('/', upload.single('wallpaper'), (req, res) => {
   WallpapersController.create(req.body.width, req.body.height, req.file.originalname, req.body.type)
       .then(wallpaper => {
           res.status(201).json(wallpaper);
       })
       .catch(err => {
           res.status(500).json(err);
       });
});

module.exports = app;