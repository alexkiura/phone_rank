//////////////////////////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
var mSchema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// USer schema

// Define a phone schema that will be embedded in the userSchema

var PhoneSchema = new mSchema({
  phone_name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  cpu_speed: Number,
  ram: Number,
  year: Number,
  battery_life: Number,
  score: Number,
});

var UserSchema = new mSchema({
  name: String,
  // the index:{unique:true} attribute ensures that the username 
  // field is unique
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  // the select:false attribute ensures the password 
  // is not returned when we query users unless explicitly requested  
  password: {
    type: String,
    required: true,
    select: false
  },
  // the phones saved by the user
  phones: [PhoneSchema]

});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
  var user = this;

  // hash the password only if the user has been modified 
  // or the user is new.
  if (!user.isModified('password')) return next();

  // generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});

// method to compare a given password with db hash
UserSchema.methods.comparePassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

exports.UserModel = mongoose.model('User', UserSchema);
exports.PhoneModel = mongoose.model('Phone', PhoneSchema);
// return the model


///////////////////////////////////////////////////////////////////////////////////////
