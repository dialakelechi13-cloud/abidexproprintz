const express = require("express");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// ─── Rate limiter: max 5 submissions per IP per 15 min ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many requests. Please try again later." },
});

router.use(limiter);

// ─── Mailer transporter ─────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
secure: false,
  auth: { 
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─── POST /api/contact ──────────────────────────────────
router.post("/", async (req, res) => {
  const { name, email, phone, service, quantity, details, budget } = req.body;

  // Basic validation
  if (!name || !email || !service) {
    return res.status(400).json({ success: false, message: "Name, email and service are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }

  try {
    // ── Email to business owner ────────────────────────
    await transporter.sendMail({
      from: `"Abidexpro Printz Website" <${process.env.SMTP_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `📦 New Order Request – ${service}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e5e5;border-radius:8px;">
          <h2 style="color:#1a5c2a;margin-bottom:4px;">New Order Request</h2>
          <p style="color:#666;margin-top:0;font-size:13px;">Received from the website contact form</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:bold;width:140px;">Name</td><td style="padding:8px;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || "Not provided"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${service}</td></tr>
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:bold;">Quantity</td><td style="padding:8px;">${quantity || "Not specified"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Budget</td><td style="padding:8px;">${budget || "Not specified"}</td></tr>
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:bold;vertical-align:top;">Details</td><td style="padding:8px;">${details || "None"}</td></tr>
          </table>
          <p style="margin-top:24px;font-size:12px;color:#999;">Abidexpro Printz © ${new Date().getFullYear()}</p>
        </div>
      `,
    });

    // ── Auto-reply to customer ─────────────────────────
    await transporter.sendMail({
      from: `"Abidexpro Printz" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your print request! 🖨",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e5e5;border-radius:8px;">
          <h2 style="color:#1a5c2a;">Thanks, ${name}! 🎉</h2>
          <p>We've received your request for <strong>${service}</strong> and our team will get back to you within <strong>24 hours</strong>.</p>
          <p>In the meantime, feel free to reach us directly on WhatsApp for a faster quote:</p>
          <a href="https://wa.me/${process.env.WHATSAPP_NUMBER}" style="display:inline-block;margin-top:8px;padding:12px 24px;background:#1a5c2a;color:#fff;border-radius:4px;text-decoration:none;font-weight:bold;">Chat on WhatsApp</a>
          <p style="margin-top:24px;font-size:12px;color:#999;">Abidexpro Printz © ${new Date().getFullYear()}</p>
        </div>
      `,
    });

    res.json({ success: true, message: "Message sent! We'll be in touch within 24 hours." });
  } catch (err) {
    console.error("Mail error:", err.message);
    res.status(500).json({ success: false, message: "Failed to send message. Please try WhatsApp instead." });
  }
});

module.exports = router;
