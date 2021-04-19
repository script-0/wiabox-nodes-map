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