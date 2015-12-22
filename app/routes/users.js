var User = require('../models/user_schema').UserModel;
var Phone = require('../models/user_schema').PhoneModel;
var phones = require('./phones');
var jwt = require('jsonwebtoken');
var uuid = require('node-uuid');
var supersecret = //uuid.v4();
  'api_test45727617$randomsecretcode';

exports.postUser = function(req, res) {
  // new instance of the user model
  var user = new User();

  // obtain the user information from the incoming request
  if (!req.body.name || !req.body.username) {
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    // save the user 
    user.save(function(err) {
      if (err) {
        // duplicate entry
        if (err.code = 11000) {
          return res.json({
            success: false,
            message: 'A user with that username already exists.'

          });
        } else {
          return res.send(err);
        }
      }
      res.json({
        message: 'user successfully created.'

      });
    })
  }
  res.json({
    message: 'A user must have a Username or Name.'
  })

};

exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
};

exports.getUser = function(req, res) {
  User.findById(req.params.user_id, function(
    err, user) {
    if (err) res.send(err);

    // return the user with the id
    res.json(user);
  })
};

exports.putUser = function(req, res) {
  // get the user we want. 
  User.findById(req.params.user_id, function(
    err, user) {
    if (err) res.send(err);

    // update the user details
    if (req.body.name) user.name = req.body
      .name;
    if (req.body.username) user.username =
      req.body.username;
    if (req.body.password) user.password =
      req.body.password;


    // save the new user details
    user.save(function(err) {
      if (err) res.send(err);

      res.json({
        message: 'User info updated successfully'

      });
    });

  });
};

exports.deleteUser = function(req, res) {
  User.remove({
    _id: req.params.user_id
  }, function(err, user) {
    if (err) return res.send(err);
    res.json({
      message: 'USer successfully deleted'

    });
  });
};

// user authentication
exports.authenticateUser = function(req, res) {
  // find the user and select the username and password explcitly
  var authData = {
    username: req.body.username,
    password: req.body.password
  };

  var userRes = {};

  if (!authData.username) {
    userRes.success = false;
    userRes.message = 'Authentication failed. You did not provide a username';

    res.send(userRes);

  }

  User.findOne({
      username: authData.username // get the user with the provided username
    }, 'name username password', // get me his name, username and ofcourse password
    function(err, user) { // and lastly, do as i say :)
      if (err) {
        userRes.success = false;
        userRes.message = 'Authentication failed. Please try again';
        throw err;
      }

      // no user with that username was found
      if (!user) {
        userRes.success = false;
        userRes.message = 'Authentication failed. User not found';
      } else if (user) {
        // check if password matches
        if (!authData.password) {
          userRes.success = false;
          userRes.message = 'Authentication failed. You did not provide a password';
        }

        var validPassword = user.comparePassword(
          authData.password);

        if (!validPassword) {
          userRes.success = false;
          userRes.message = 'Authentication failed. Wrong password';
          res.json(userRes);
        } else {
          // if password found
          //create a token
          var token = jwt.sign({
            name: user.name,
            username: user.username,
            id: user._id
          }, supersecret, {
            expiresInMinutes: 1440 // after 24 hours
          });

          // return the info as token including token
          userRes.success = true;
          userRes.message = 'Enjoy your token';
          userRes.token = token;
          userRes.id = user._id;
          res.json(userRes);
        }
      }
    });
};

exports.verifyToken = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.param('token') || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verify secret and exp
    jwt.verify(token, supersecret, function(err,
      decoded) {
      if (err) {
        return res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'

        });
      } else {
        // save to request for use in other routes
        req.decoded = decoded;
        // show the keys of the token
        next();
      }
    });
  } else {
    // no token
    // return an access forbidden request
    return res.status(403).send({
      success: false,
      message: 'Access denied. Please provide a token'

    });
  }
}

exports.getDecoded = function(req, res) {
  res.send(req.decoded);
};
