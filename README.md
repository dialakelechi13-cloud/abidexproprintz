# Abidexpro Printz — Website

Full-stack website for Abidexpro Printz, a Lagos printing business.

**Stack:** Node.js + Express (backend) · Vanilla HTML/CSS/JS (frontend)

---

## Project Structure

```
abidexproprintz/
├── public/                 # Frontend (served as static files)
│   ├── index.html          # Main single-page site
│   ├── css/style.css       # All styles
│   └── js/main.js          # All frontend JS
├── server/
│   ├── index.js            # Express server entry point
│   ├── routes/contact.js   # Contact/order form API route
│   └── data/blogPosts.js   # Blog content (swap with DB later)
├── .env.example            # Environment variables template
└── package.json
```

---

## Sections

- **Hero** — Full-screen ink-dark hero with animated headline + marquee
- **Services** — 6 service cards (Business Cards, Flyers, Banners, Merch, Packaging, Design)
- **Portfolio** — Filterable grid (Cards / Banners / Merch / Packaging)
- **Pricing** — 4 transparent pricing cards
- **About** — Stats + brand story
- **Blog** — Loaded from `/api/blog` with modal reader
- **Contact** — Side-by-side: info + order form + WhatsApp button

---

## Setup & Running

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```
Then edit `.env`:
```
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
OWNER_EMAIL=abidexproprintz@gmail.com
WHATSAPP_NUMBER=2348012345678
```

> **Gmail App Password:** Go to Google Account → Security → 2-Step Verification → App Passwords. Generate one for "Mail" and paste it as `SMTP_PASS`.

### 3. Update WhatsApp number in frontend JS
Open `public/js/main.js` and update line 7:
```js
const WHATSAPP_NUMBER = "2348012345678"; // your real number
```

### 4. Start the server
```bash
# Production
npm start

# Development (auto-reload)
npm run dev
```

Visit **http://localhost:3000**

---

## Deployment Options

| Platform | Notes |
|---|---|
| **Railway** | `npm start` as start command, add environment vars in dashboard |
| **Render** | Free tier available, same setup |
| **VPS / DigitalOcean** | Use PM2: `pm2 start server/index.js --name abidexproprintz` |
| **Heroku** | `Procfile`: `web: node server/index.js` |

---

## Customising Content

| What | Where |
|---|---|
| WhatsApp number | `.env` → `WHATSAPP_NUMBER` and `public/js/main.js` line 7 |
| Services | `public/index.html` → Services section |
| Pricing | `public/index.html` → Pricing section |
| Blog posts | `server/data/blogPosts.js` |
| Portfolio items | `public/index.html` → Portfolio section |
| Brand colours | `public/css/style.css` → `:root` CSS variables |
| Logo | Replace `.logo-mark` letter "A" in `index.html` with your logo image |

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/contact` | Submit order/quote request (rate-limited: 5/15min per IP) |
| `GET` | `/api/blog` | Get all blog posts |
| `GET` | `/api/blog/:id` | Get single blog post |

---

## Adding Real Portfolio Images

Replace the CSS gradient thumbnails in `index.html` with real images:
```html
<div class="portfolio-thumb" style="background-image:url('images/my-work.jpg'); background-size:cover;">
```
Place images in `public/images/`.

---

Built with ❤️ for Abidexpro Printz, Lagos.
