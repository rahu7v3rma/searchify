import { model, Schema } from "mongoose";
import { User } from "../utils/types";

const UserSchema = new Schema<User>({
  name: String,
  email: String,
  password: String,
  isEmailVerified: Boolean,
  emailVerificationCode: String,
  role: String,
});

const UserModel = model<User>("User", UserSchema);

export default UserModel;
