var models  = require('../models');

var drop_and_init_db = async function(){
    // console.log("IN HEREEEEEEE**************************");
    await models.TeacherStudent.drop().catch((error)=>console.log('error1'+ error));
    await models.Teacher.drop().catch((error)=>console.log('error2'+ error));
    await models.Student.drop().catch((error)=>console.log('error3'+ error));
    // await models.Teacher.destroy({truncate: true});
    
    // await models.Student.destroy({truncate: true});
    // console.log('AFTTEEEEEEEEEEEEER******************************' + a);

    await init_db();
}

// var init_db = function(){
//     models.Student.sync()
//         .catch((error)=>console.log('error4*** ' + error + "88888"))
//         .then(()=>{
//         models.Student.bulkCreate([
//             {email: 'studentagnes@gmail.com'},
//             {email: 'studentbob@gmail.com'},
//             {email: 'studentkelly@gmail.com'},
//             {email: 'studentmark@gmail.com'},
//             {email: 'studentjon@gmail.com'},
//             {email: 'studentsally@gmail.com'},
//             {email: 'studentmary@gmail.com'},
//             {email: 'studenthon@gmail.com'},
//         ]).then(() => {
//             models.Teacher.sync()
//                 .catch((error)=>console.log('error4*** ' + error + "88888"))
//                 .then(()=>{
//                 models.Teacher.bulkCreate([
//                     {email: 'teacherken@gmail.com'},
//                     {email: 'teacherjoe@gmail.com'},
//                     {email: 'teacherlana@gmail.com'},
//                     {email: 'teachertom@gmail.com'},
//                 ]).then(() => {
//                     models.Teacher.findByPk('teacherjoe@gmail.com').then((teachJoe) =>{
//                         teachJoe.addStudents([
//                             'studentkelly@gmail.com', 
//                             'studentmark@gmail.com',
//                             'studentjon@gmail.com',
//                         ])
//                     }).catch((error)=>console.log('error11'+ error));

//                     models.Teacher.findByPk('teacherlana@gmail.com').then((teachLana) =>{
//                         teachLana.addStudents([
//                             'studentkelly@gmail.com', 
//                             'studentsally@gmail.com',
//                             'studentmary@gmail.com',
//                             'studenthon@gmail.com',
//                         ])
//                     });

//                     models.Teacher.findByPk('teacherken@gmail.com').then((teachKen) =>{
//                         teachKen.addStudents([
//                             'studentagnes@gmail.com', 
//                         ])
//                     });
//                 }).catch((error)=>console.log('error6'+ error));
//             });
//         }).catch((error)=>console.log('error5'+error));
//     });
// };


var init_db = async function(){
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
        console.log('error4*** ' + error + "88888");
    }
    
    console.log('her');
    try {
        await models.Teacher.sync();
        // console.log('here');
    } catch(e){
        console.log('error4*** ' + error + "88888");
    }
    await models.Teacher.bulkCreate([
        {email: 'teacherken@gmail.com'},
        {email: 'teacherjoe@gmail.com'},
        {email: 'teacherlana@gmail.com'},
        {email: 'teachertom@gmail.com'},
    ]);

    // console.log('heree');
    try{
        await models.TeacherStudent.sync();
        var teachJoe = await models.Teacher.findByPk('teacherjoe@gmail.com');
        await teachJoe.addStudents([
            'studentkelly@gmail.com', 
            'studentmark@gmail.com',
            'studentjon@gmail.com',
        ]);
    
        // console.log('hereee');
        var teachLana = await models.Teacher.findByPk('teacherlana@gmail.com');
        await teachLana.addStudents([
            'studentkelly@gmail.com', 
            'studentsally@gmail.com',
            'studentmary@gmail.com',
            'studenthon@gmail.com',
        ]);
        // console.log('hereee');
        var teachKen = await models.Teacher.findByPk('teacherken@gmail.com');
        await teachKen.addStudents([
            'studentagnes@gmail.com', 
        ]);
        // console.log('hereee');
    } catch(e){
        console.log('error111;'+e);
    }
    return 1;
};

module.exports.dropAndInit = drop_and_init_db;
module.exports.init = init_db;