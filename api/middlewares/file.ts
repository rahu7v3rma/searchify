import dotenv from "dotenv";
import { RequestHandler } from "express";
import formidable from "formidable";
import path from "path";
import { z } from "zod";

dotenv.config();

export const uploadSingleFile =
  ({
    fileName,
    maxFileSize = 1024 * 1024 * 10,
    allowedTypes,
    fieldSchema,
  }: {
    fileName: string;
    maxFileSize?: number;
    allowedTypes: string[];
    fieldSchema?: z.ZodSchema;
  }): RequestHandler =>
  (req, res, next) => {
    const form = formidable({
      multiples: false,
      maxFileSize,
      maxFields: 10,
      maxFieldsSize: 1024 * 1024 * 1,
      uploadDir: process.env.FILE_UPLOAD_TEMP_DIR_PATH,
      keepExtensions: true,
      maxFiles: 1,
      filter: (part) => {
        return part.name === fileName && allowedTypes.includes(part.mimetype);
      },
      filename: (originalName, ext, part) => {
        const timestamp = Date.now();
        const extension = path.extname(part.originalFilename || "");
        return `${fileName}-${timestamp}${extension}`;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.json({
          success: false,
          message: "Unable to upload file",
          data: null,
        });
      }

      if (!files[fileName]) {
        return res.json({
          success: false,
          message: "Unable to upload file",
          data: null,
        });
      }

      const file = files[fileName]?.[0];
      if (!file) {
        return res.json({
          success: false,
          message: "Unable to upload file",
          data: null,
        });
      }

      if (!allowedTypes.includes(file.mimetype)) {
        return res.json({
          success: false,
          message: "Unable to upload file",
          data: null,
        });
      }

      if (fieldSchema) {
        const fieldsObject = Object.fromEntries(
          Object.entries(fields).map(([k, v]) => [k, v?.[0]])
        );
        const result = fieldSchema.safeParse(fieldsObject);
        if (!result.success) {
          return res.json({
            success: false,
            message: "Invalid request",
            data: null,
          });
        }
        req.fields = fieldsObject;
      }

      req.file = file;

      next();
    });
  };
