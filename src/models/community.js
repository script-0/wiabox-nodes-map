'use strict';

var sql = require('./db.js');

var Community = function (community) {
  this.name = community.name;
  this.creator = community.creator
};
  
Community.create = function(community, result){
    sql.query("INSERT INTO Community SET ?", community, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("Community created: ", res.insertId);
        const sortie = {
          "communityId": res.insertId,
        }
        result(null, sortie);
      }
    });
};

Community.findById = function(id, result) {
    sql.query("SELECT * from Community WHERE id = ?", id, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("Community "+id+": ", res);
        result(null, res[0]);
      }
    });
};

Community.findByName = function (name, result) {
    sql.query("SELECT * FROM Community WHERE name = ?", name, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("Community with name=" + name + " found!");
        console.log(null, res);
        result(null, res[0])
      }
    })
};

Community.list = function(result) {
    sql.query("SELECT * from Community", function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log('Community list: ', res);
        result(null, res);
      }
    })
}

Community.update = function(id, community, result) {
    sql.query("UPDATE Community SET ? WHERE id = ?", [community, id], function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log('Community update: ', res);
        result(null, res);
      }
    })
};

Community.remove = function (id, result) {
  sql.query("DELETE FROM Community WHERE id = ?", id, function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('Community deleted: ', res);
      result(null, res);
    }
  })
};

Community.removeByName = function (name, result) {
  sql.query("DELETE FROM Community WHERE name = ?", name, function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('Community deleted: ', res);
      result(null, res);
    }
  })
};

module.exports = Community;