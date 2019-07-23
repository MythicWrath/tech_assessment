var models  = require('../models');

var drop_and_init_db = async function(){
    // Empty all tables
    // TeacherStudent must be dropped before the other tables due to foreign key constraint
    await models.TeacherStudent.drop().catch((error)=>console.log('error1'+ error));
    await models.Teacher.drop().catch((error)=>console.log('error2'+ error));
    await models.Student.drop().catch((error)=>console.log('error3'+ error));

    await init_db();
}

var init_db = async function(){
    // Create and populate Student table
    try{
        await models.Student.sync();
        await models.Student.bulkCreate([
            {email: 'studentagnes@gmail.com'},
            {email: 'studentbob@gmail.com'},
            {email: 'studentkelly@gmail.com'},
            {email: 'studentmark@gmail.com'},
            {email: 'studentjon@gmail.com'},
            {email: 'studentsally@gmail.com'},
            {email: 'studentmary@gmail.com'},
            {email: 'studenthon@gmail.com'},
        ]);
    }catch(error){
        console.log('error: ' + error);
    }
    
    // Create and populate Teacher table
    try {
        await models.Teacher.sync();
    } catch(e){
        console.log('error: ' + error);
    }
    await models.Teacher.bulkCreate([
        {email: 'teacherken@gmail.com'},
        {email: 'teacherjoe@gmail.com'},
        {email: 'teacherlana@gmail.com'},
        {email: 'teachertom@gmail.com'},
    ]);

    // Create TeacherStudent table, then add relations
    try{
        await models.TeacherStudent.sync();
        var teachJoe = await models.Teacher.findByPk('teacherjoe@gmail.com');
        await teachJoe.addStudents([
            'studentkelly@gmail.com', 
            'studentmark@gmail.com',
            'studentjon@gmail.com',
        ]);
    
        var teachLana = await models.Teacher.findByPk('teacherlana@gmail.com');
        await teachLana.addStudents([
            'studentkelly@gmail.com', 
            'studentsally@gmail.com',
            'studentmary@gmail.com',
            'studenthon@gmail.com',
        ]);
        var teachKen = await models.Teacher.findByPk('teacherken@gmail.com');
        await teachKen.addStudents([
            'studentagnes@gmail.com', 
        ]);

    } catch(e){
        console.log('error: '+e);
    }
    return 1;
};

module.exports.dropAndInit = drop_and_init_db;
module.exports.init = init_db;