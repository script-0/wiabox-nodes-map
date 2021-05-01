var NodeModel = require('../models/node.js')
var CommunityModel = require('../models/community.js')


exports.list_all = function (req, res) {
    CommunityModel.list(function (err, communities) {
        console.log("controller");
        if (err) {
            res.send(err);
        } else {
            console.log('res', communities);
            res.send(communities);
        }
    })
}

/*
    {
        name : community_name
    }
    or
    {
        id : community_id
    }
*/
exports.get = function (req, res) {
    if (!(req.body.id === undefined)) {
        CommunityModel.findById(req.body.id, function (err, community) {
            if (err) {
                res.send(err);
            } else {
                res.json(community);
            }
        })
    } else {
        CommunityModel.findByName(req.body.name, function (err, community) {
            if (err) {
                res.send(err);
            } else {
                res.json(community);
            }
        })
    }
}

exports.get_creator = function (req, res) {
    if (!(req.body.id === undefined)) {
        CommunityModel.findById(req.body.id, function (err, community) {
            if (err) {
                res.send(err);
            } else {
                NodeModel.findById(community.creator, function (err, creator) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.json(creator);
                    }
                })
            }
        })
    } else {
        CommunityModel.findByName(req.body.name, function (err, community) {
            if (err) {
                res.send(err);
            } else {
                NodeModel.findById(community.creator, function (err, creator) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.json(creator);
                    }
                })
            }
        })
    }
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
        name: req.body.name,
        creator: req.body.creator
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
exports.update = function (req, res) {
    console.log(req.body)
    var updated_community = new CommunityModel({
        name: req.body.name,
        creator: req.body.creator
    })

    CommunityModel.update(req.body.id, updated_community, function (err, community) {
        if (err) {
            res.send(err)
        } else {
            res.json(community)
        }
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
exports.delete_community = function (req, res) {
    if (!(req.body.id === undefined)) {
        CommunityModel.remove(req.body.id, function (err, community) {
            if (err) {
                res.send(err);
            } else {
                res.json(community);
            }
        })
    } else {
        CommunityModel.removeByName(req.body.name, function (err, community) {
            if (err) {
                res.send(err);
            } else {
                res.json(community);
            }
        })
    }
}