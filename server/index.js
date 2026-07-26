require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const contactRouter = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Security & middleware ───────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
      },
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);

// ─── Static frontend ────────────────────────────────────
app.use(express.static(path.join(__dirname, "../public")));

// ─── API routes ─────────────────────────────────────────
app.use("/api/contact", contactRouter);

// ─── Blog posts (simple in-memory data; swap for a DB) ──
const blogPosts = require("./data/blogPosts");
app.get("/api/blog", (_req, res) => res.json(blogPosts));
app.get("/api/blog/:id", (req, res) => {
  const post = blogPosts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

// ─── Catch-all → SPA fallback ───────────────────────────
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`\n🖨  Abidexpro Printz server running → http://localhost:${PORT}\n`);
});
