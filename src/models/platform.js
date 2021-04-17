'use strict';

var sql = require('./db.js');

var Platform = function (platform) {
  this.name = platform.name
  this.token = platform.token
  this.id =  platform.id
};


Platform.create = function(platform, result){
    sql.query("INSERT INTO Platform SET ?", platform, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("Platform created: ", res.insertId);
        platform.id = res.insertId,
        result(null, platform);
      }
    });
};


Platform.get = function(id, result) {
    sql.query("SELECT * from Platform WHERE id = ?", id, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("Platform "+id+": ", res);
        result(null, res);
      }
    });
};

Platform.get_id = function(platform, result) {
    sql.query("SELECT id from Platform WHERE name = ? AND token = ?", [platform.name , platform.token], function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("Platform "+ platform.name + " id =  ", res);
        result(null, res[0]);
      }
    });
};


Platform.list = function(result) {
    sql.query("SELECT * from Platform", function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log('Platform list: ', res);
        result(null, res);
      }
    });
  }

Platform.update = function(platform, result) {
    sql.query("UPDATE Platform SET ? WHERE id = ?", [platform, platform.id], function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log('Platform updated: ', res);
        result(null, res);
      }
    });
  }

Platform.remove = function (name, token , result) {
  sql.query("DELETE FROM Platform WHERE name = ? AND token = ?", name, token ,function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('Platform ( name = '+name+' ) deleted ');
      result(null, res);
    }
  });
};

Platform.find = function (name, token, result) {
  sql.query("SELECT * FROM Platform WHERE name = ? AND token = ?", [name, token], function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }else if (res.length ==0 ){
        console.log("Platform with name ="+name+"not found")
        result("Platform { name : "+name+" } not found",null)
    }
    else {
      console.log("Platform with name=" + name + " and token=" + token + " found!");
      console.log(null, res);
      result(null, res[0])
    }
  })
}

module.exports = Platform;