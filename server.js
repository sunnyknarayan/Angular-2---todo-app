var express = require('express');// used to extract and use express from node modules.
var path = require('path'); // used to work with file system path.
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 3308;
var app = express();

// view engine
app.set('views',path.join(__dirname, 'views')); // to tell system that our views will be in views folder.
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//set static folder to put angular stuff
app.use(express.static(path.join(__dirname,'client'))); // client is folder name for angular2 files and stuff

//body-parser middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// for routes
app.use('/', index);  // root file is associated with index file
app.use('/api', tasks);

app.listen(port, function(){
    console.log("Server running @ "+port);
});