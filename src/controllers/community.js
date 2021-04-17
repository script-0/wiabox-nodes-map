var NodeModel = require('../models/node.js')
var CommunityModel = require('../models/community.js')


exports.list_all = function (req, res) {
    CommunityModel.list(function (err, communities) {
        console.log("controller");
        if (err) {
            res.send(err);
        }
        console.log('res', communities);
        res.send(communities);
    })
}

/*
    {
        name    : community_name,
        creator : community_creator_node_id
    }
*/
exports.create_community = function (req, res) {
    console.log(req.body)
    // !!! verify reg.body Fields !!!
    var new_community = new CommunityModel({
        lat  : req.body.name,
        long : req.body.creator
    })
    CommunityModel.create(new_community, function (err, node) {
        if (err) {
            res.send(err)
        } else {
            res.json(node)
        }
    })
}

/*
    {
        id      : id,        
        name    : new_community_name,
        creator : new_community_creator_node_id
    }
*/
exports.update_node_position = function (req, res) {
    console.log(req.body)
    var updated_community = new UserModel({
        name    : req.body.name,
        creator : req.body.creator        
    })

    const id = req.body.id

    UserModel.update(id, updated_community, function (err, user) {
        if (err) {
            res.send(err)
        }
        res.json(user)
    })
}

/*
    {
        name : name
    }
    or
    {
        id : id
    }
*/
exports.delete_node = function (req, res) {
    if (!(req.body.id === undefined)){
        CommunityModel.remove(req.body.id, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        })
    }else{
        CommunityModel.removeByName(req.body.name, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        })
    }
}