import { User } from "../utils/types";
import formidable from "formidable";

declare global {
  namespace Express {
    interface Request {
      user: User;
      file: formidable.File;
      fields: Record<string, string>;
    }
  }
}

export {};
