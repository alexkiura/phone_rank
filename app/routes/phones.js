var Phone = require("../models/phone_schema");
// get phones
exports.getPhones = function(req, res) {
  Phone.find(function(err, phones) {
    if (err) {
      res.send(err);
    } else {
      res.json(phones);
    }
  });
};

// get phone
exports.getPhone = function(req, res) {
  Phone.findById(req.params.phone_id, function(
    err, phone) {
    if (err) {
      res.send(err);
    } else {
      res.json(phone);
    }
  });
};

// post phone
exports.postPhone = function(req, res) {
  var phone = new Phone(); // new instance of the Phone model
  phone.name = req.body.name; //set the name from the request
  phone.os = req.body.os; // set the os from the request
  console.log("reading the data");

  // save and check for errors
  phone.save(function(err) {
    if (err) {
      res.send("Some " + err);
    } else {
      res.json({
        message: "Phone created successfully"
      });
    }
  });
};
// put phone
exports.putPhone = function(req, res) {
  // Use the phone model to find the phone we want
  Phone.findById(req.params.phone_id, function(
    err, phone) {
    if (err) {
      res.send(err);
    } else {
      phone.name = req.body.name;
      phone.os = req.body.os; // Updates a phone's os

      // save the phone 
      phone.save(function(err) {
        if (err) {
          res.send("unable to save :(" +
            err);
        } else {
          res.json({
            message: "Phone details updated successfully"
          });
        }
      });
    }
  });
};
//delete phone
exports.deletePhone = function(req, res) {
  Phone.remove({
      _id: req.params.phone_id
    },
    function(err, phone) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: "successfully deleted",
          "phone_id": req.params.phone_id
        });
      }
    });
};
// delete phones
exports.deletePhones = function(req, res) {
  Phone.remove(function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        "Status": "All phones have been deleted"
      });
    }
  });
};
