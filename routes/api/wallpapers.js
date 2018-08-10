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
const ColorsController = require('../../controllers/colors');
const Colors = require('../../models').Colors;

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
            if (wallpapers.constructor !== Array) {
                ColorsController.findByWallpaper(wallpapers.dataValues.id)
                    .then(colors => {
                        console.log(colors);
                        wallpapers.dataValues.colors = colors;
                        res.status(200).json(wallpapers);
                    });
            } else if (wallpapers.length > 1) {
                wallpapers.forEach(wallpaper => {
                    ColorsController.findByWallpaper(wallpaper.dataValues.id)
                        .then(colors => {
                            wallpaper.dataValues.colors = colors;
                        });
                });

                res.status(200).json(wallpapers);
            }


        })
        .catch(err => {
            res.status(500).json(err);
        });
});

app.get('/download', (req, res) => {
    if (Object.keys(req.query).length === 1 && req.query.id !== undefined) {
        WallpapersController.findById(req.query.id)
            .then(wallpaper => {
                res.download("./files/wallpapers/" + wallpaper.filename);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    } else {
        res.status(400).end();
    }
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

app.post('/addColor', (req, res) => {
    //ColorsController.create(req.body.wallpaper, req.body.red, req.body.green, req.body.blue, req.body.percent)
    Colors.create({
        wallpaper: req.body.wallpaper,
        red: req.body.red,
        green: req.body.green,
        blue: req.body.blue,
        percent: req.body.percent
    })
        .then(color => {
            res.status(201).json(color);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

app.delete('/', (req, res) => {
    if (Object.keys(req.query).length === 1 && req.query.id !== undefined) {
        WallpapersController.destroy(req.query.id)
            .then(wallpaper => {
                fs.delete("./files/wallpapers/" + wallpaper.filename);
                res.status(200).json(wallpaper);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    } else {
        res.status(400).end();
    }
});

module.exports = app;