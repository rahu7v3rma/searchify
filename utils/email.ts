import nodemailer from "nodemailer";

const createTransporter = async () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export async function sendAdminMail(subject: string, text: string) {
  try {
    const transporter = await createTransporter();

    const info = await transporter.sendMail({
      from: `Searchify <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject,
      text,
    });

    console.log("Admin mail sent:", info.messageId);

    return true;
  } catch (error) {
    console.error("sendAdminMail error:", error);
    return false;
  }
}
