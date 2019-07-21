'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    }
  });

  Teacher.associate = function(models) {
    Teacher.belongsToMany(models.Student, {
        through: 'TeacherStudent',
        // foreignKey: 'email',
    });
  };

  return Teacher;
};