var NodeModel = require('../models/node.js')

exports.show_all = function (req, res) {
    NodeModel.list(function (err, nodes) {
        console.log("Map Controller");
        if (err) {
            res.send(err);
        } else {
            res.render('index',{nodes:nodes})
        }
    })
}

exports.yowyob_map = function(req, res){
    console.log(req.body)
    res.render('map', {nodes:req.body.nodes})
}

exports.yowyob_route = function(req, res){
    res.render('route', {nodes:req.body.nodes , routes:req.body.routes})
}