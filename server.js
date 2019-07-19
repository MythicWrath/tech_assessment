
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

app.post('/api/register', checkEmailLength, regStudent);
app.get('/api/commonstudents', checkEmailLength, getCommonStudents);
app.post('/api/suspend', checkEmailLength, suspendStudents);
app.post('/api/retrievefornotifications', checkEmailLength, retrNotifStudents);

/**
 *  MIDDLEWARES
 */
// Middleware to check length of teacher and student emails are within 40 characters
var checkEmailLength = function(req, res, next){
    let body =  req.body;
    let emailTooLong = false;
    
    if ('teacher' in body && body.teacher.length > 40){
        emailTooLong = true;
    } else if ('student' in body && body.student.length > 40){
        emailTooLong = true;
    } else if ('students' in body){
        for(var student in body.students){
            if (student.length > 40){
                emailTooLong = true;
            }
        }
    }

    if (emailTooLong){
        console.log("Emails too long");
		res.status(400).send({message: "Length of emails cannot be longer than 40 characters."});
    } else {
        next();
    }

}

/**
 * ENDPOINT FUNCTIONS
 */
/**
 * Teacher registers student
 */
function regStudent(req, res){
    var body = req.body;
   
    // Check that 

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