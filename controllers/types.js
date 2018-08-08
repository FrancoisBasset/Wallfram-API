const Types = require('../models').Types;

const TypesController = {};

TypesController.findAll = () => {
    return Types.findAll({
        order: ['value']
    });
};

TypesController.create = (value) => {
    return Types.create({
        value: value
    });
};

TypesController.update = (id, value) => {
    return Types.update({
        value: value
    }, {
        where: {
            id: id
        }
    });
};

TypesController.destroy = (id) => {
    return Types.destroy({
        where: {
            id: id
        }
    });
};

module.exports = TypesController;