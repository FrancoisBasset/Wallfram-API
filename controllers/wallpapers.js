const Wallpapers = require('../models').Wallpapers;
const Colors = require('../models').Colors;

const Op = require('../models').Sequelize.Op;

const WallpapersController = {};

WallpapersController.findAll = () => {
    return Wallpapers.findAll();
};

WallpapersController.findById = (id) => {
    return Wallpapers.findById(id);
};

WallpapersController.findByType = (wallpapers, type) => {
    return wallpapers.filter(w => w.dataValues.type === type);
};

WallpapersController.findByDimensions = (wallpapers, width, height) => {
    return wallpapers.filter(w => w.dataValues.width === width && w.dataValues.height === height);
};

WallpapersController.create = (width, height, filename, type) => {
    return Wallpapers.create({
        width: width,
        height: height,
        filename: filename,
        type: type
    });
};

module.exports = WallpapersController;