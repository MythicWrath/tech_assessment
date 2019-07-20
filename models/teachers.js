'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('teacher', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  });

  Teach.associate = function(models) {
    models.Teacher.belongsToMany(models.Student, {
        through: 'TeacherStudent',
        foreignKey: 'email',
    });
  };

  return Teacher;
};