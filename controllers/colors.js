const Colors = require('../models').Colors;
const ColorsController = {};
const Op = require('../models').Sequelize.Op;

ColorsController.findByWallpaper = (wallpaper) => {
    return Colors.findAll({
        where: {
            wallpaper: wallpaper
        }
    });
};

ColorsController.findColors = (red, green, blue, percent) => {
    return Colors.findAll({
        distinct: 'wallpaper',
        where: {
            red: {
                [Op.gt]: red - 20,
                [Op.lt]: red + 20
            },
            green: {
                [Op.gt]: green - 20,
                [Op.lt]: green + 20
            },
            blue: {
                [Op.gt]: blue - 20,
                [Op.lt]: blue + 20
            },
            percent: {
                [Op.gt]: percent - 10,
                [Op.lt]: percent + 10
            }
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
