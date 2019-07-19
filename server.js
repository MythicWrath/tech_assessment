
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

const app = express();

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

app.post('/api/register', regStudent);
app.get('/api/commonstudents', getCommonStudents);
app.post('/api/suspend', suspendStudents);
app.post('/api/retrievefornotifications', retrNotifStudents);


/**
 * Teacher registers student
 */
function regStudent(req, res){
    var body = req.body;
    

};


/**
 * Retrieve list of students common to given list of teachers
 */
function getCommonStudents(req, res){

};


/**
 * Suspend a student
 */
function suspendStudents(req, res){

};


/**
 * As a teacher, retrieve list of students who can receive a given notification
 */
function retrNotifStudents(req, res){

};


// Export our app for testing purposes
export default app;
  
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//     if (err) throw err
  
//     console.log('The solution is: ', rows[0].solution)
// })
  
// connection.end()