'use strict';

module.exports = function(app) {
    var platformController = require("../controllers/platform.js")

    /*  
        {
            name     : platform_name,
            password : platform_password
        }

        return  : 
        {
            token : token_value
        }
    */
    app.route('/platform/login').post(platformController.login)

    /*  
        {
            name     : platform_name,
            password : platform_password
        }
        return :
        {
            id       : id
            name     : platform_name,
            password : platform_password
        }
    */
    app.route('platform/add').post(platformController.create_platform)

    /*  
        Authorization: Bearer TOKEN_VALUE
        {
            name     : platform_name,
            password : platform_password
        }
        return :
        {
            id       : id
            name     : platform_name,
            password : platform_password
        }
    */
    app.route('platform/get').get(platformController.authentificate,platformController.get_platform)
    
     /*  Authorization: Bearer TOKEN_VALUE
        {
            id       : id
            name     : platform_name,
            password : platform_password
        }
    */
    app.route('platform/update').post(platformController.authentificate,platformController.update_platform)
    

    /*
        return : 
        [
            {

            }
        ]
    */
    app.route('/platform/list').get(platformController.list_all)

}