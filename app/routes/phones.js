var Phone = require("../models/user_schema").PhoneModel;
var User = require("../models/user_schema").UserModel;


exports.postPhone = function(req, res) {
  var phone = {};
  phone.phone_name = req.body.phone_name;
  phone.os = req.body.os;
  phone.screen_size = req.body.screen_size;
  phone.rating = req.body.rating;
  User.findById(req.params.user_id, function(
    err, user) {
    if (err) res.send(err);
    user.phones.push(phone);

    user.save(function(err) {
      if (err) res.send(err);
      res.json({
        "message": "Phone saved successfully"
      });

    });


  });









  // var phone = {};
  // phone.name = req.body.name;
  // phone.os = req.body.os;
  // phone.screenSize = req.body.screenSize;
  // phone.rating = req.body.rating;
  // phones.push(phone);
};

exports.getPhones = function(req, res) {
  User.findById(req.params.user_id, function(
    err, user) {
    if (err) res.send(err);
    res.json(user.phones);
  })
};
