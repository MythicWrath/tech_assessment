'use strict';
process.env.NODE_ENV = 'test';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'dev';
// var config = require(__dirname + '/../config/test.js');
var config = require('config');
var db = {};

var sequelize = new Sequelize(config.db_name, config.db_user, config.db_pw, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;