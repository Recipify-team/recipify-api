const mysql = require('mysql');

//local mysql db connection
const db = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

db.connect(function(err) {
	if (err) throw err;
	console.log("Successfully connected to the database.");
});

module.exports = db;