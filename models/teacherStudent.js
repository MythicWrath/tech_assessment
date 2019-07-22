'use strict';
module.exports = (sequelize, DataTypes) => {
  var TeacherStudent = sequelize.define('TeacherStudent', {
    TeacherEmail: {
        type: DataTypes.STRING,
        references: {
            model: 'Teacher',
            key: 'email'
      },
    },
    StudentEmail: {
        type: DataTypes.STRING,
        references: {
            model: 'Student',
            key: 'email'
        }, 
      } 
    });
  return TeacherStudent;
};