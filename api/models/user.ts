import { Document, model, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  emailVerificationCode: string;
  role: string;
}

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
