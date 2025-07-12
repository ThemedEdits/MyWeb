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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `[Portfolio] ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
    });

    return res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.error("❌ Email error:", err); // Log to Vercel
    return res.status(500).json({ error: "Server failed to send email." });
  }
}
