var dotenv = require('dotenv')
var mysql = require('mysql');

dotenv.config();

//local mysql db connection
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    port     : process.env.DB_PORT

});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;