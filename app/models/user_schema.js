//////////////////////////////////////////////////////////////////////////////////////////////
var mongoose = require("mongoose");
var mSchema  = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

// USer schema
var UserSchema = new mSchema({
	name: String,
	username: { type: String, required: true, index:{unique: true}},
	// the index:{unique:true} attribute ensures that the username 
	// field is unique
	password: { type: String, required: true, select: false}

	// the select:false attribute ensures the password 
	// is not returned when we query users unless explicitly requested
});

// hash the password before the user is saved
UserSchema.pre("save", function(next) {
	var user  = this;

	// hash the password only if the user has been modified 
	// or the user is new.
	if (!user.isModified("password")) return next();

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

// return the model
module.exports = mongoose.model("User", UserSchema);

///////////////////////////////////////////////////////////////////////////////////////