var dotenv = require('dotenv')
dotenv.config();

var PlatformModel = require('../models/platform.js')
var XToken = require('../utils/xtoken.js')

exports.list_all = function (req, res) {
    //!!! Verify Body Fields !!!
    PlatformModel.list(function (err, platforms) {
        console.log("controller");
        if (err) {
        res.send(err);
        }
        console.log('res', platforms);
        res.send(platforms);
    })
}

/*  
  {
    name     : platform_name,
    password : platform_password
  }
*/
exports.create_platform = function (req, res) {
  //!!! Verify Body Fields !!!
  console.log(req.body)
  var new_platform = new PlatformModel(req.body)

  PlatformModel.create(new_platform, function (err, platform) {
    if (err) {
      res.send(err);
    }else{
        console.log("Platform Created")
        res.json(platform);
    }
  });
}

/*  
  {
    name     : platform_name,
    password : platform_password
  }
*/
exports.get_platform = function (req, res) {
    //!!! Verify Body Fields !!!
    var platform = new PlatformModel(req.body)
    PlatformModel.get_id(platform, function (err, ids) {
        if (err) {
            res.send(err)
        }
        platform.id = ids.id
        res.json(platform)
    })
}

/*  
  {
    id       : id
    name     : new_platform_name,
    password : new_platform_password
  }
*/
exports.update_platform = function (req, res) {
  console.log(req.body)
  //!!! Verify Body Fields !!!
  var updated_platform = new PlatformModel(req.body)
  PlatformModel.update(updated_platform, function (err, user) {
    if (err) {
      res.send(err);
    }else if(user.affectedRows == 1){
        res.json(updated_platform)
    }
    else{
        // Cas de duplication dans la B.D.
        // ou pas de modification de la B.D. (pas d'id fourni)
        res.json('malformed Request');
    }
  });
}

/*  
  {
    name     : platform_name,
    password : platform_password
  }

  return  : {
    token : token_value
  }
*/
exports.login = function (req, res) {
  PlatformModel.find(req.body.name, req.body.password, function (err, platform) {
    if (err){
      res.send(err);
    }else{
        var token = XToken.sign(platform.id)
        res.send(JSON.stringify({token:token}));
    }
  })
}

/*
  Authorization: Bearer TOKEN_VALUE
*/
exports.authentificate = function(req,res,next){
    
  console.log("Authentification starting ...")

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if( !(token == null) ){
      console.log("Token found : "+token);
      if (XToken.decode(token)!=process.env.TOKEN_INVALID){
        console.log("Platform authentificated")
        next();
      }else{
        console.log("Authenfication failed")
        res.json({error:process.env.TOKEN_INVALID})
      }
  } else {
      res.json({error:"Token not found",description:"Platform is not authentificated. Log in again"})
  }
}