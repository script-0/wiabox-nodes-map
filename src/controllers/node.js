var NodeModel = require('../models/node.js')
var CommunityModel = require('../models/community.js')


exports.list_all = function (req, res) {
    NodeModel.list(function (err, nodes) {
        console.log("controller");
        if (err) {
            res.send(err);
        } else {
            console.log('res', nodes);
            res.send(nodes);
        }
    })
}

/*
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
exports.create_node = function (req, res) {
    console.log(req.body)
    // !!! verify reg.body Fields !!!
    if (!(req.body.community === undefined)) {
        //Retrieving community id using its name ( req.body.community)
        CommunityModel.findByName(req.body.community, function (error, result) {
            if (error) {
                res.send(error)
            } else {
                var new_node = new NodeModel({
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    community: result.id
                })
                NodeModel.create(new_node, function (err, node) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.json(node)
                    }
                })
            }
        })
    } else {
        var new_node = new NodeModel({
            latitude: req.body.latitude,
            longitude: req.body.longitude
        })
        NodeModel.create(new_node, function (err, node) {
            if (err) {
                res.send(err)
            } else {
                res.json(node)
            }
        })
    }
}

/*
    {
        id : id,
        latitude : new_latitude,
        longitude : new_longitude
    }
*/
exports.update_node_position = function (req, res) {
    console.log(req.body)
    var updated_node = new NodeModel({
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })
    const id = req.body.id

    NodeModel.update(id, updated_node, function (err, user) {
        if (err) {
            res.send(err)
        } else {
            res.json(user)
        }
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
    CommunityModel.findByName(req.body.community, function (error, result) {
        if (error) {
            res.send(error)
        } else {
            var new_node = new NodeModel({
                community: result.id
            })
            NodeModel.update(req.body.id, new_node, function (err, node) {
                if (err) {
                    res.send(err)
                } else {
                    res.json(node)
                }
            })
        }
    })
}

/*

*/
exports.getOutliers = function (req, res) {
    NodeModel.findOutliers(function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    })
}

/*
    {
        name : community_name
    }
    OR
    {
        id : community_id
    }
*/
exports.findByCommunity = function (req, res) {
    if (!(req.body.name === undefined)) {
        //Retrieving community id using its name ( req.body.name)
        CommunityModel.findByName(req.body.name, function (error, result) {
            if (error) {
                res.send(error)
            } else {
                NodeModel.findByCommunity(result.id, function (err, node) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.json(node)
                    }
                })
            }
        })
    } else {
        NodeModel.findByCommunity(req.body.id, function (err, node) {
            if (err) {
                res.send(err)
            } else {
                res.json(node)
            }
        })
    }
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
        } else {
            res.json(user);
        }
    })
}