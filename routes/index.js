var models  = require('../models');
var express = require('express');
var router  = express.Router();

var Sequelize = require('sequelize');
var Op = Sequelize.Op;

router.post('/register', regStudent);
router.get('/commonstudents', getCommonStudents);
router.post('/suspend', suspendStudents);
router.post('/retrievefornotifications', retrNotifStudents);

/**
* Teacher registers student
*/
async function regStudent(req, res){
    var body = req.body;   

    // Block to check that body is well-formed
    if ('teacher' in body === false){
        return res.status(400).send({message: "'teacher' field not found in request body."});
    } else if ('students' in body === false){
        return res.status(400).send({message: "'students' field not found in request body."});
    } else if (body.students.length === 0){
        return res.status(400).send({message: "'students' field should not be empty."}); 
    }

    let teacher = await models.Teacher.findOne({where: {email: body.teacher}});
    if (!teacher)
        return res.status(400).send({message: "Indicated teacher email not found."});

    // body.students.forEach(async (studEmail) => {

    //     let student = await models.Student.findOne({where: {email: studEmail}});
    //     if (!student)
    //         res.status(400).send({message: "One of the student email does not exist."}); 
        
    //     teacher.addStudent(student);
    // });

    for(studEmail of body.students){
        let student = await models.Student.findOne({where: {email: studEmail}});
        if (!student){
            return res.status(400).send({message: "One of the student email not found."}); 
        }
        
        teacher.addStudent(student); 
    }
    
    res.status(204).end(); 



    // Check that indicated teacher exists
    // models.Teacher.findOne({where: {email: body.teacher}}).then(teacher => {
    //     if (!teacher)
    //         res.status(400).send({message: "Indicated teacher email does not exist."});
    // }).then(() => {
    //     // Loop through all the students
    //     req.body.students.forEach(async (studEmail) => {

    //         let student = await models.Student.findOne({where: {email: studEmail}});
    //         if (!student)
    //             res.status(400).send({message: "One of the student email does not exist."}); 
            
    //         teacher.addStudent(student);

            // Check that student exists
            // models.Student.findOne({where: {email: studEmail}}).then(student => {
            //     if (!student)
            //         res.status(400).send({message: "One of the student email does not exist."}); 

            //     teacher.addStudent(student);
               
                // Create a dictionary with which to create the registration relationship
                // const ts = {
                //     Teacher_email: teacher.email,
                //     Student_email: student.email,
                // }

                // // Create and save a TeacherStudent relationship
                // models.TeacherStudent.findOrCreate({where: ts}).then(([result, created]) => {
                //     res.status(204).end();
                // });
            // })
        // })
        
    // }).then(() => res.status(204).end());

    // Check that 
    // res.status(204).end();
};


/**
* Retrieve list of students common to given list of teachers
*/
async function getCommonStudents(req, res){
    // Make sure query contains 'teacher' param
    if ('teacher' in req.query === false)
        return res.status(400).send({message: "'teacher' parameter not found in query parameters."});

    //Make sure teacher param is in array form. Cast it in array form if not.
    let params;

    if (Array.isArray(req.query.teacher)){
        params = req.query.teacher;
    } else if (typeof req.query.teacher === 'string'){
        params = [req.query.teacher];
    } else {
        return res.status(400).send({message: "Unrecognized parameter type: Expecting 'string' or 'array'."})
    }

    // Check if queried teachers exist
    // If all queried teachers exist, returned results count should be exactly the same as number of queried teachers
    let results = await models.Teacher.findAndCountAll({
        where: {
            email: {
                [Op.in]: params,
            }
        }
    });

    if (results.count !== params.length)
        return res.status(400).send({message: "One or more email addresses sent do not exist in records."});

    // Get students for each teacher, and find their intersection
    let studEmails = [];
    let firstPass = true;
    
    for (teacher of results.rows) {
        let students = await teacher.getStudents({
            attributes: ['email'],
            raw: true,
        });

        let tempArr = students.map(x => x.email);

        if (firstPass){
            studEmails = tempArr;
            firstPass = false;
        } else {
            studEmails = studEmails.filter(x => tempArr.includes(x));
        }
    };
    console.log(studEmails);
    res.status(200).send({students: studEmails})
};


/**
* Suspend a student
*/
async function suspendStudents(req, res){
    // Make sure request body is well formed
    if ('student' in req.body === false)
        return res.status(400).send({message: "'student' field not found in request body."});
    else if(typeof req.body.student !== 'string')
        return res.status(400).send({message: "Type of data in 'student' field must be a string."});

    let studentEmail = req.body.student;
    // Check student exists
    let student = await models.Student.findByPk(studentEmail);
    if (!student)
        return res.status(400).send({message: "Indicated student email not found."}); 
    
    // Suspend the student
    student.update({suspend: true}, {where: studentEmail}).then(() => {
        res.status(204).end();
    }).catch((e) => {
        console.log(e);
        res.status(500).send({message: "Something went wrong when suspending the student."});
    })

};


/**
* As a teacher, retrieve list of students who can receive a given notification
*/
function retrNotifStudents(req, res){

};

module.exports = router;