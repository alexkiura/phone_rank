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
};

exports.getPhones = function(req, res) {
  User.findById(req.params.user_id, function(
    err, user) {
    if (err) res.send(err);
    res.json(user.phones);
  })
};

exports.putPhone = function(req, res) {
  User.findById(req.params.user_id, function(
    err, user) {

    var pId = req.params.phone_id;
    if (err) res.send(err);

    if (req.body.phone_name)
      user.phones.id(pId).phone_name = req.body
      .phone_name;
    if (req.body.os)
      user.phones.id(pId).os = req.body.os;
    if (req.body.screen_size)
      user.phones.id(pId).screen_size = req
      .body.screen_size;
    if (req.body.rating)
      user.phones.id(pId).rating = req.body
      .rating;

    // save the new phone details
    user.save(function(err) {
      if (err) res.send(err);
      res.json({
        message: "Phone details updated successfully"
      });
    });
  });
};

exports.getPhone = function(req, res) {
  User.findById(req.params.user_id,
    function(err, user) {
      if (err) res.send(err);
      res.json(user.phones.id(req.params.phone_id));
    });
};

exports.deletePhone = function(req, res) {
  User.findById(req.params.user_id,
    function(err, user) {
      if (err) res.send(err);
      user.phones.id(req.params.phone_id).remove();
      user.save(function(err) {
        if (err) res.send(err);
        res.json({"message": "Phone deleted successfully"});
      });
    });
};
