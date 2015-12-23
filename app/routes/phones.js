var Phone = require('../models/user_schema').PhoneModel;
var User = require('../models/user_schema').UserModel;
var calcScore = require('../fxn/phone_score');

exports.postPhone = function(req, res) {
  var phone = {};

  phone.phone_name = req.body.phone_name;
  phone.cpu_speed = req.body.cpu_speed;
  phone.ram = req.body.ram;
  phone.year = req.body.year;
  phone.battery_life = req.body.battery_life;
  phone.score = calcScore(
    phone.cpu_speed, phone.ram, phone.year, phone.battery_life);
  User.findById(req.params.user_id, function(
    err, user) {
    if (err) res.send(err);
    user.phones.push(phone);

    user.save(function(err) {
      if (err) res.send(err);
      res.json({
        message: 'Phone saved successfully'
      });
    });
  });
};

exports.getPhones = function(req, res) {
  User.findById(req.params.user_id, function(
    err, user) {
    if (err) res.send(err);
    res.json(user.phones.sort(function(a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    }));
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
    if (req.body.cpu_speed)
      user.phones.id(pId).cpu_speed = req.body.cpu_speed;
    if (req.body.ram)
      user.phones.id(pId).ram = req
      .body.ram;
    if (req.body.year)
      user.phones.id(pId).year = req.body.year;
    if (req.body.battery_life)
      user.phones.id(pId).battery_life = req.body.battery_life;
    user.phones.id(pId).score = calcScore(
      user.phones.id(pId).cpu_speed,
      user.phones.id(pId).ram,
      user.phones.id(pId).year,
      user.phones.id(pId).battery_life);

    // save the new phone details
    user.save(function(err) {
      if (err) res.send(err);
      res.json({
        message: 'Phone details updated successfully'
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
        res.json({
          message: 'Phone deleted successfully '
        });
      });
    });
};

exports.deletePhones = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) res.send(err);
    user.phones = [];
    user.save(function(err) {
      if (err) res.send(err);
      res.json({
        message: 'Phones deleted successfully'
      });
    })
  })
}
