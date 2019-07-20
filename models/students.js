'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    suspend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

  Student.associate = function(models) {
    Student.belongsToMany(models.Teacher, {
      through: 'TeacherStudent',
      foreignKey: 'email',
    });
  };

  return Student;
};