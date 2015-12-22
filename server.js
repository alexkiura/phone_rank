// Server.js
// pull in needed modules
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');

// get the ROUTES
var routePhone = require('./app/routes/phones');
var routeUser = require('./app/routes/users');

// pull in the schemas
var Phone = require('./app/models/user_schema').PhoneModel;
var User = require('./app/models/user_schema').UserModel;

mongoose.connect(
  config.db);
//'mongodb://alex:mongolo@ds051903.mongolab.com:51903/p_shop');

var db = mongoose.connection;
db.on('error', console.error.bind(console,
  'connection error:'));
db.once('open', function() {
  console.log('Connected successfully to database:');
});

app.use(express.static(path.join(__dirname, 'public')));

// for grabbing info from POST requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// configure the app to handle CORS 
// Crosss Origin Resource Sharing requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));


var router = express.Router();

//route for authenticating users
router.post('/authenticate', routeUser.authenticateUser);

// middleware to verify the token that was passed
router.use(routeUser.verifyToken);
// the index route 
router.get('/', function(req, res) {
  res.json({
    Message: 'Welcome',
    API: 'phone_shop',
    version: '0.0.1',
    author: 'github.com/alexkiura'

  });
});

// /api/phones
router.route('/users/:user_id/phones')
  .post(routePhone.postPhone)
  .get(routePhone.getPhones)
  .delete(routePhone.deletePhones);


router.route('/users/:user_id/phones/:phone_id')
  .get(routePhone.getPhone)
  //update the phone that has this id
  //Accessed by PUT http://localhost:8080/api/phones/:phone_id
  .put(routePhone.putPhone)
  // delete the phone
  .delete(routePhone.deletePhone);

// api/users
router.route('/users')
  .get(routeUser.getUsers)
  .post(routeUser.postUser);

// api/users/:user_id
router.route('/users/:user_id')
  // get a user using the id
  .get(routeUser.getUser)
  .put(routeUser.putUser)
  .delete(routeUser.deleteUser);

router.get('/me', routeUser.getDecoded);
// register the routes
app.use('/api', router);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

//start server
var port = process.env.PORT || config.port;
app.listen(port);
console.log('listening on port ' + port);
