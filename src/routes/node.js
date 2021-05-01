'use strict';

module.exports = function (app) {
    var nodeController = require('../controllers/node.js')
    var platformController = require("../controllers/platform.js")

    /*
         Authorization: Bearer TOKEN_VALUE
         {
             latitude  : node_latitude,
             longitude : node_longitude
         }
 
         or
 
         {
             latitude       : node_latitude,
             longitude      : node_longitude,
             community : community_name
         }
     */
    app.route('/node/add').post(platformController.authentificate, nodeController.create_node)

    /*  
        Authorization: Bearer TOKEN_VALUE
        {
            id : id,
            latitude : new_latitude,
            longitude : new_longitude
        }
    */
    app.route('/node/update/position').post(platformController.authentificate, nodeController.update_node_position)

    /*  
        Authorization: Bearer TOKEN_VALUE
        {
            id : id,
            community : new_community_name
        }
    */
    app.route('/node/update/community').post(platformController.authentificate, nodeController.update_node_community)

    /*  
        Authorization: Bearer TOKEN_VALUE
        {
            name : community_name
        }
        or
        Authorization: Bearer TOKEN_VALUE
        {
            id : community_id
        }
    */
    app.route('/node/list/community').get(platformController.authentificate, nodeController.findByCommunity)

    app.route('/node/list').get(platformController.authentificate, nodeController.list_all)

    app.route('/node/outliers').get(platformController.authentificate, nodeController.getOutliers)

}