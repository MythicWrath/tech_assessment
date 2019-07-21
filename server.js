
var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');

var models = require('./models');
var routes = require('./routes/index');

const app = express();

var config = require('config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api', routes);


// Connect to db then start listening
models.sequelize.sync().then(function() {
    let bulkC = true;

    if (bulkC){
        models.Student.bulkCreate([
            {email: 'studentagnes@gmail.com'},
            {email: 'studentbob@gmail.com'},
            {email: 'studentkelly@gmail.com'},
            {email: 'studentmark@gmail.com'},
            {email: 'studentjon@gmail.com'},
            {email: 'studentsally@gmail.com'},
            {email: 'studentmary@gmail.com'},
            {email: 'studenthon@gmail.com'},
        ]);

        models.Teacher.bulkCreate([
            {email: 'teacherken@gmail.com'},
            {email: 'teacherjoe@gmail.com'},
            {email: 'teacherlana@gmail.com'},
            {email: 'teachertom@gmail.com'},
        ]).then(() => {
            models.Teacher.findByPk('teacherjoe@gmail.com').then((teachJoe) =>{
                teachJoe.addStudents([
                    'studentkelly@gmail.com', 
                    'studentmark@gmail.com',
                    'studentjon@gmail.com',
                ])
            });

            models.Teacher.findByPk('teacherlana@gmail.com').then((teachLana) =>{
                teachLana.addStudents([
                    'studentkelly@gmail.com', 
                    'studentsally@gmail.com',
                    'studentmary@gmail.com',
                    'studenthon@gmail.com',
                ])
            });

            models.Teacher.findByPk('teacherken@gmail.com').then((teachKen) =>{
                teachKen.addStudents([
                    'studentagnes@gmail.com', 
                ])
            });
        });
    }

    var server = app.listen(8080, function() {
		var host = server.address().address;
		var port = server.address().port;

		console.log("Listening on http://%s%s", host, port);
		console.log("Dir is " + __dirname);
	});
  });

// app.post('/api/register', checkEmailLength, regStudent);
// app.get('/api/commonstudents', checkEmailLength, getCommonStudents);
// app.post('/api/suspend', checkEmailLength, suspendStudents);
// app.post('/api/retrievefornotifications', checkEmailLength, retrNotifStudents);

/**
 *  MIDDLEWARES
 */
// Middleware to check length of teacher and student emails are within 40 characters
// var checkEmailLength = function(req, res, next){
//     let body =  req.body;
//     let emailTooLong = false;
    
//     if ('teacher' in body && body.teacher.length > 40){
//         emailTooLong = true;
//     } else if ('student' in body && body.student.length > 40){
//         emailTooLong = true;
//     } else if ('students' in body){
//         for(var student in body.students){
//             if (student.length > 40){
//                 emailTooLong = true;
//             }
//         }
//     }

//     if (emailTooLong){
//         console.log("Emails too long");
// 		res.status(400).send({message: "Length of emails cannot be longer than 40 characters."});
//     } else {
//         next();
//     }

// }

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
module.exports = app;
  
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//     if (err) throw err
  
//     console.log('The solution is: ', rows[0].solution)
// })
  
// connection.end()