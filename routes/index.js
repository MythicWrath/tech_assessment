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
async function regStudent(req, res){
    var body = req.body;   

    // Block to check that body is well-formed
    if ('teacher' in body === false){
        return res.status(400).send({message: "'teacher' field is missing."});
    } else if ('students' in body === false){
        return res.status(400).send({message: "'students' field is missing."});
    } else if (body.students.length === 0){
        return res.status(400).send({message: "'students' field should not be empty."}); 
    }

    let teacher = await models.Teacher.findOne({where: {email: body.teacher}});
    if (!teacher)
        return res.status(400).send({message: "Indicated teacher email does not exist."});

    // body.students.forEach(async (studEmail) => {

    //     let student = await models.Student.findOne({where: {email: studEmail}});
    //     if (!student)
    //         res.status(400).send({message: "One of the student email does not exist."}); 
        
    //     teacher.addStudent(student);
    // });

    for(studEmail of body.students){
        let student = await models.Student.findOne({where: {email: studEmail}});
        if (!student){
            return res.status(400).send({message: "One of the student email does not exist."}); 
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