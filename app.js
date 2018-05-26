// add the package we are going to need 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', function(){
	console.log('it is connected to database !. ' + config.database);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+ err);
});


const app = express();

//we seprate all the routes to  create a clean code
const users = require('./routes/users')

// port we want to use
const port = 3000;

//CORS middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users',users);

// Index Route
app.get('/', function(req,res){
	res.send('Invalid Endpoint');
});

app.listen(port, function(){
	console.log('we are just trying things on port :' + port);
});