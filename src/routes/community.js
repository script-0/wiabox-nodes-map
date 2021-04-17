'use strict';

module.exports = function(app) {
    var platformController = require("../controllers/platform.js")
    var communityController = require('../controllers/community.js')

   /*
        Authorization: Bearer TOKEN_VALUE
        {
            name    : community_name,
            creator : community_creator_node_id
        }
    */
    app.route('community/add').post(platformController.authentificate,communityController.create_community)
    
    /*  
        Authorization: Bearer TOKEN_VALUE
        {
            id      : id,        
            name    : new_community_name,
            creator : new_community_creator_node_id
        }
    */
    app.route('commnunity/update').post(platformController.authentificate,communityController.update)
    
    /*  
        Authorization: Bearer TOKEN_VALUE
        {
            name : community_name
        }
        or
        Authorization: Bearer TOKEN_VALUE
        {
            id : id
        }
    */
    app.route('community/update/get').post(platformController.authentificate,communityController.get)
    app.route('community/update/get_creator').post(platformController.authentificate,communityController.get_creator)

    /*
        return : 
        [
            {

            }
        ]
    */
    app.route('/community/list').get(communityController.list_all)

}