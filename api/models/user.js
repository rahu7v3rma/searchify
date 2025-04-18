const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  email: String,
  password: String,
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
