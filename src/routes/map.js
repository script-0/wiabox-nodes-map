'use strict';

module.exports = function(app){
    var mapController = require('../controllers/map.js')

    app.route('/map').get(mapController.show_all)
}