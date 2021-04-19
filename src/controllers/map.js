var NodeModel = require('../models/node.js')

exports.show_all = function (req, res) {
    NodeModel.list(function (err, nodes) {
        console.log("controller");
        if (err) {
            res.send(err);
        } else {
            console.log('res', {nodes})
            res.render('index',nodes)
        }
    })
}