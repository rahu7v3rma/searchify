import fs from "fs";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = {
  type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
  project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
  auth_uri: process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_URI,
  token_uri: process.env.GOOGLE_SERVICE_ACCOUNT_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.GOOGLE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
  universe_domain: process.env.GOOGLE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
};

const oauth2Client = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

export const uploadFile = async (fileName: string) => {
  const res = await drive.files.create({
    media: {
      body: fs.createReadStream(fileName),
    },
  });
  return res.data.id;
};

export const getFile = async (fileId: string) => {
  const res = await drive.files.get({
    fileId,
    fields: "webContentLink",
  });
  console.log(res.data);
};
