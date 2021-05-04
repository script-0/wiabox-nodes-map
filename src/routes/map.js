'use strict';

module.exports = function(app){
    var mapController = require('../controllers/map.js')
    var platformController = require("../controllers/platform.js")

    app.route('/map').get(mapController.show_all)

    /*
        {
            nodes: [
                {
                    latitude    : float,
                    longitude   : float,
                    name        : string,
                    description : string
                },
                {
                    latitude    : float,
                    longitude   : float,
                    name        : string,
                    description : string
                },
                ...
            ]
        }
    */
    app.route('/yowyob/map').get(mapController.yowyob_map)

    /*
        {
            nodes: [
                {
                    latitude    : float,
                    longitude   : float,
                    name        : string,
                    description : string
                },
                ...
            ],
            routes :[
                {
                    origin:{
                        latitude  : float,
                        longitude : float
                    },
                    destination:{
                        latitude  : float,
                        longitude : float
                    }
                },
                ...
            ]
        }
    */
    app.route('/yowyob/route').get(mapController.yowyob_route)
}