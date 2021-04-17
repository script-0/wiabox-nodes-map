'use strict';

module.exports = function(app) {
    var nodeController = require('../controllers/node.js')
    var platformController = require("../controllers/platform.js")
    var communityController = require('../controllers/community.js')

   /*
        Authorization: Bearer TOKEN_VALUE
        {
            lat  : node_latitude,
            long : node_longitude
        }

        or

        {
            lat       : node_latitude,
            long      : node_longitude,
            community : community_name
        }
    */
    app.route('node/add').post(platformController.authentificate,nodeController.create_node)
    
    /*  
        Authorization: Bearer TOKEN_VALUE
        {
            id : id,
            lat : new_latitude,
            long : new_longitude
        }
    */
    app.route('node/update/position').post(platformController.authentificate,nodeController.update_node_position)
    
    /*  
        Authorization: Bearer TOKEN_VALUE
        {
            id : id,
            community : new_community_name
        }
    */
    app.route('node/update/position').post(platformController.authentificate,nodeController.update_node_community)

    /*
        return : 
        [
            {

            }
        ]
    */
    app.route('/node/list').get(nodeController.list_all)

}