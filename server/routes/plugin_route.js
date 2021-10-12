
let pluginController = require('../controllers/plugin_controller');

/* ROUTES */
module.exports = function(app) {
    app.post('/plugin/traffic/', pluginController.getTraffic);
    app.post('/plugin/meteo/', pluginController.getMeteo);
    app.post('/plugin/transport/', pluginController.getTransport);
    app.post('/plugin/sport/', pluginController.getSport);
    app.post('/plugin/maps/', pluginController.getMaps);
}
/* ROUTES */