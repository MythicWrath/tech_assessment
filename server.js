
var express = require('express');
var bodyParser = require('body-parser');

var models = require('./models');
var routes = require('./routes/index');
var db_init = require('./database_util/init');

const app = express();

var config = require('config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api', routes);



// Connect to db then start listening
models.sequelize.sync().then(function() {
    console.log(db_init);
    if (config.init_db)
        db_init.init();

    var server = app.listen(8080, function() {
		var host = server.address().address;
		var port = server.address().port;

		console.log("Listening on http://%s%s", host, port);
		console.log("Dir is " + __dirname);
	});
  });

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


// Export our app for testing purposes
module.exports = app;
  