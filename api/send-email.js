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
  from: `"Portfolio Form" <${process.env.EMAIL_USER}>`, // always your email
  to: process.env.EMAIL_RECEIVER,
  subject: `[Portfolio] ${subject}`,
  replyTo: email, // ✅ lets you reply directly to user
  text: `
Name: ${name}
Email: ${email}
Message:
${message}
  `,
});


    return res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    return res.status(500).json({ error: "A server error has occurred" });
  }
}
