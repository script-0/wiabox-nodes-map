'use strict';

var sql = require('./db.js');

var Node = function (node) {
  this.lat = node.lat;
  this.long = node.long;
  if (!(node.community === undefined)) {
    this.community = node.community;
  }
};
  
Node.create = function(node, result){
    sql.query("INSERT INTO Node SET ?", node, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("Node created: ", res.insertId);
        const sortie = {
          "nodeId": res.insertId,
        }
        result(null, sortie);
      }
    });
};

Node.findById = function(id, result) {
    sql.query("SELECT * from Node WHERE id = ?", id, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("Node "+id+": ", res);
        result(null, res);
      }
    });
};

Node.findByCommunity = function (community_id, result) {
  sql.query("SELECT * FROM Node WHERE community = ?", [community_id], function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log("Node with community_id=" + community_id + " found!");
      console.log(null, res);
      result(null, res)
    }
  })
};


Node.findOutliers = function (result) {
  this.findByCommunity(-1,result)
};

Node.list = function(result) {
    sql.query("SELECT * from Node", function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log('Node list: ', res);
        result(null, res);
      }
    })
}

Node.update = function(id, node, result) {
    sql.query("UPDATE Node SET ? WHERE id = ?", [node, id], function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log('Node update: ', res);
        result(null, res);
      }
    })
};

Node.remove = function (id, result) {
  sql.query("DELETE FROM Node WHERE id = ?", id, function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('Node deleted: ', res);
      result(null, res);
    }
  })
};

module.exports = Node;