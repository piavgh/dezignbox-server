var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {type: String, required: true},
    isActive: {type: Boolean, required: true},
    dob: {type: Date}
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    passwordField: "password"
});

const User = mongoose.model("User", UserSchema);
module.exports = User;