const Wallpapers = require('../models').Wallpapers;
const Colors = require('../models').Colors;

const Op = require('../models').Sequelize.Op;

const ColorsController = require('./colors');
const WallpapersController = {};

WallpapersController.findAll = () => {
    return Wallpapers.findAll();
};

WallpapersController.findById = (id) => {
    return Wallpapers.findById(id);
};

WallpapersController.findByIds = (ids) => {
    return Wallpapers.findAll({
        where: {
            id: ids
        }
    });
};

WallpapersController.findByType = (wallpapers, type) => {
    return wallpapers.filter(w => w.type === type);
};

WallpapersController.findByDimensions = (wallpapers, width, height) => {
    return wallpapers.filter(w => w.width === width && w.height === height);
};

WallpapersController.findByColors = (red, green, blue, percent) => {
    return ColorsController.findColors(red, green, blue, percent)
        .then(cs => {
            cs = cs.map(cs => cs.dataValues.wallpaper).filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            });

            return WallpapersController.findByIds(cs);
        });
};

WallpapersController.create = (width, height, filename, type) => {
    return Wallpapers.create({
        width: width,
        height: height,
        filename: filename,
        type: type
    });
};

WallpapersController.destroy = (wallpaper) => {
    ColorsController.destroyWallpaper(wallpaper);

    return WallpapersController.findById(wallpaper)
        .then(wall => {
            wall.destroy();
            return wall;
        });
};

module.exports = WallpapersController;
