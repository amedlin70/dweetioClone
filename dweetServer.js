var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');

// Connect to the mongodb
mongoose.connect('mongodb://localhost/dweet');

// Load all files in models directory
var models_path = __dirname+'/app/models';
fs.readdirSync(models_path).forEach(function (filename) {
  if(~filename.indexOf('.js')) require(models_path+'/'+filename);
});

var app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

require('./config/routes')(app);

console.log("Server starting on port 3000");

app.listen(3000);