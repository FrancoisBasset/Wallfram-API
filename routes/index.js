const bodyParser = require('body-parser');

const RouterManager = () => {};

RouterManager.use = (app) => {
    app.use(bodyParser.json());

    app.use('/api', require('./api'));
};

module.exports = RouterManager;