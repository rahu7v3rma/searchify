import express, { Request, Response } from "express";
import { uploadSingleFile } from "../middlewares/file";
import { AdminContactUsSchema } from "../validators/admin";
import { z } from "zod";
import { unlinkSync } from "fs";
import { uploadFile } from "../utils/googleDrive";
import Contact from "../models/contact";

const AdminRouter = express.Router();

AdminRouter.post(
  "/contact-us",
  uploadSingleFile({
    fileName: "attachment",
    allowedTypes: ["image/png"],
    fieldSchema: AdminContactUsSchema,
  }),
  async (req: Request, res: Response) => {
    const attachmentFilePath = req.file.filepath;
    const { email, message } = req.fields as z.infer<
      typeof AdminContactUsSchema
    >;

    const attachmentGoogleDriveFileId = await uploadFile(attachmentFilePath);

    const contact = new Contact({
      email,
      attachmentGoogleDriveFileId,
      message,
    });
    await contact.save();

    unlinkSync(attachmentFilePath);

    res.json({
      success: true,
      message: "Contact us details received",
      data: null,
    });
  }
);

export default AdminRouter;
