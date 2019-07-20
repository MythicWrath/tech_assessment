var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/register', regStudent);
router.get('/commonstudents', getCommonStudents);
router.post('/suspend', suspendStudents);
router.post('/retrievefornotifications', retrNotifStudents);

/**
* Teacher registers student
*/
function regStudent(req, res){
    var body = req.body;   
    console.log("here");
    // Check that 
    res.status(404).end();
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

module.exports = router;