import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Setup transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,    // your Gmail
        pass: process.env.EMAIL_PASS     // Gmail app password
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_RECEIVER,    // your receiving email
      subject: `[Portfolio] ${subject}`,
      text: `
You received a new message:

Name: ${name}
Email: ${email}
Message:
${message}
      `,
    });

    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
}
