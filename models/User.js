var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  isActive: {
    type: Boolean,
    required: true
  },
  dob: {
    type: Date
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  campaigns: [{
    type: Schema.Types.ObjectId,
    ref: 'Campaign'
  }]
}, {timestamps: {}});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  passwordField: "password"
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
