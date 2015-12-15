var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PhoneSchema = new Schema({
	name: String,
	os: String
});

module.exports = mongoose.model("Phone", PhoneSchema);