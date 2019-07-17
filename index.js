
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

var config = require('./src/config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


var connection = mysql.createConnection({
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_pw,
    database: config.db_name
});
  
connection.connect();

/**
 * Teacher registers student
 */
app.post('/api/register', function(req, res){

});


/**
 * Retrieve list of students common to given list of teachers
 */
app.get('/api/commonstudents', function(req, res){

});


/**
 * Suspend a student
 */
app.post('/api/suspend', function(req, res){

});


/**
 * As a teacher, retrieve list of students who can receive a given notification
 */
app.post('/api/retrievefornotifications', function(req, res){

});
  
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//     if (err) throw err
  
//     console.log('The solution is: ', rows[0].solution)
// })
  
// connection.end()