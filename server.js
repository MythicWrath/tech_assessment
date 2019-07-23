var express = require('express');
var bodyParser = require('body-parser');

var models = require('./controllers/models');
var routes = require('./controllers/routes/index');
var db_init = require('./controllers/database_util/init');

const app = express();

var config = require('config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api', routes);

// Connect to db then start listening
models.sequelize.sync().then(function() {
    if (config.init_db)
        db_init.init();

    var server = app.listen(config.server_port, function() {
      var host = server.address().address;
      var port = server.address().port;

      console.log(process.env.NODE_ENV);
      if (process.env.NODE_ENV === 'dev'){
        console.log("Listening on http://%s%s", host, port);
        console.log("Dir is " + __dirname);
      }
	});
});

// Export our app for testing purposes
module.exports = app;
  