const Colors = require('../models').Colors;
const ColorsController = {};

ColorsController.findByWallpaper = (wallpaper) => {
    return Colors.findAll({
        where: {
            wallpaper: wallpaper
        }
    });
};

ColorsController.create = (wallpaper, red, green, blue, percent) => {
    return Colors.create({
        wallpaper: wallpaper,
        red: red,
        green: green,
        blue: blue,
        percent: percent
    });
};

ColorsController.destroyWallpaper = (wallpaper) => {
    return Colors.destroy({
        where: {
            wallpaper: wallpaper
        }
    });
};

module.exports = ColorsController;
