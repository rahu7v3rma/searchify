import mongoose from "mongoose";

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    email: String,
    attachmentGoogleDriveFileId: String,
    message: String,
  })
);

export default Contact;
