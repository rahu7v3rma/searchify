const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isEmailVerified: Boolean,
  emailVerificationCode: String,
  role: String,
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
