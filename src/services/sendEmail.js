import nodemailer from "nodemailer";
export async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDEMAIL,
      pass: process.env.SENDPASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: `"Saraha" <${process.env.SENDEMAIL}>`,
    to,
    subject,
    html,
  });
  return info;
}
