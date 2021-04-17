var NodeModel = require('../models/node.js')
var CommunityModel = require('../models/community.js')


exports.list_all = function (req, res) {
    NodeModel.list(function (err, nodes) {
      console.log("controller");
      if (err) {
        res.send(err);
      }
      console.log('res', nodes);
      res.send(nodes);
    })
}

/*
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
exports.create_node = function (req, res) {
    console.log(req.body)
    // !!! verify reg.body Fields !!!
    if (!(req.body.community === undefined)) {
        //Retrieving community id using its name ( req.body.community)
        CommunityModel.findByName(req.body.community,function(error,result){
            if(error){
                res.send(error)
            }else{
                var new_node = new NodeModel({
                    lat  : req.body.lat,
                    long : req.body.long,
                    community : result.id
                })
                NodeModel.create(new_node,function(err,node){
                    if(err){
                        res.send(err)
                    }else{
                       res.json(node)
                    }
                })
            }
        })
    }else{
        var new_node = new NodeModel({
            lat  : req.body.lat,
            long : req.body.long
        })
        NodeModel.create(new_node,function(err,node){
            if(err){
                res.send(err)
            }else{
               res.json(node)
            }
        })
    }
}

/*
    {
        id : id,
        lat : new_latitude,
        long : new_longitude
    }
*/
exports.update_node_position = function (req, res) {
    console.log(req.body)
    var updated_node = new UserModel({
        lat  : req.body.lat,
        long : req.body.long 
    })
    const id = req.body.id
  
    UserModel.update(id, updated_node, function (err, user) {
      if (err) {
        res.send(err)
      }
      res.json(user)
    })
}

/*
    {
        id : id,
        community : new_community_name
    }
*/
exports.update_node_community = function (req, res) {
    console.log(req.body)
    CommunityModel.findByName(req.body.community, function(error,result){
        if(error){
            res.send(error)
        }else{
            var new_node = new NodeModel({
                community : result.id
            })
            NodeModel.update(req.body.id, new_node, function(err,node){
                if(err){
                    res.send(err)
                }else{
                   res.json(node)
                }
            })
        }
    })
}

/*
    {
        id:id
    }
*/
exports.delete_node = function (req, res) {
    NodeModel.remove(req.body.id, function (err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    })
}