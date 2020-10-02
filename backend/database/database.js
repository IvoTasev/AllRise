const mysql = require('mysql');
const configuration = require('./config')

let db = mysql.createConnection(configuration);

module.exports = db;