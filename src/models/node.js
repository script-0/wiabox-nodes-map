'use strict';

var sql = require('./db.js');

var Node = function (node) {
  if (!(node.latitude === undefined)) {
    this.latitude = node.latitude;
  }

  if (!(node.longitude === undefined)) {
    this.longitude = node.longitude;
  }

  if (!(node.community === undefined)) {
    this.community = node.community;
  }
};

Node.create = function (node, result) {
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

Node.findById = function (id, result) {
  console.log(id)
  sql.query("SELECT * FROM Node WHERE id = ?", id, function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log("Node " + id + ": ", res);
      result(null, res[0]);
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
  this.findByCommunity(0, result)
};

Node.findByPosition = function (latitude, longitude, result) {
  sql.query("SELECT * FROM Node WHERE latitude = ? AND longitude = ?", [latitude , longitude], function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log("Node with [latitude = " + latitude + " , longitude = "+ longitude +" ] found!");
      console.log(null, res);
      result(null, res[0])
    }
  })
}

Node.list = function (result) {
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

Node.update = function (id, node, result) {
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