/* ═══════════════════════════════════════════════════════
   ABIDEXPRO PRINTZ — main.js
   ═══════════════════════════════════════════════════════ */

// ── Config ───────────────────────────────────────────────
const WHATSAPP_NUMBER = "2347060927528";
const EMAILJS_SERVICE_ID = "service_uiqfcod";
const EMAILJS_TEMPLATE_ID = "template_mnvcnh8";
const EMAILJS_PUBLIC_KEY = "LK3UyxCI0LcJXU1NS9avQ";

// ── Helpers ──────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const wa = (msg = "") => `https://wa.me/${WHATSAPP_NUMBER}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;

// ── DOM Ready ────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initWhatsApp();
  initNav();
  initPortfolioFilter();
  loadBlog();
  initContactForm();
  initScrollAnimations();
});

// ── Year ─────────────────────────────────────────────────
function setYear() {
  const el = $("#year");
  if (el) el.textContent = new Date().getFullYear();
}

// ── WhatsApp links ────────────────────────────────────────
function initWhatsApp() {
  const defaultMsg = "Hi Abidexpro Printz! I'd like to get a quote for my print project.";
  const ids = ["whatsappBtn", "footerWhatsapp", "floatingWa"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = wa(defaultMsg);
  });
}

// ── Navigation ───────────────────────────────────────────
function initNav() {
  const header = $("#header");
  const hamburger = $("#hamburger");
  const navLinks = $("#navLinks");

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
  });

  $$(".nav-links a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  const sections = $$("section[id]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$(".nav-links a").forEach(a => a.classList.remove("active"));
        const active = $(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => observer.observe(s));
}

// ── Portfolio filter ──────────────────────────────────────
function initPortfolioFilter() {
  const btns = $$(".filter-btn");
  const items = $$(".portfolio-item");

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === "all" || item.dataset.cat === filter;
        item.classList.toggle("hidden", !show);
        if (show) {
          item.style.animation = "none";
          requestAnimationFrame(() => {
            item.style.animation = "portfolioFadeIn 0.35s ease forwards";
          });
        }
      });
    });
  });

  if (!document.getElementById("dynamicStyles")) {
    const style = document.createElement("style");
    style.id = "dynamicStyles";
    style.textContent = `@keyframes portfolioFadeIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }`;
    document.head.appendChild(style);
  }
}

// ── Blog ──────────────────────────────────────────────────
const BLOG_ICONS = { "Design Tips": "🎨", "Guides": "📖", "Marketing": "📣" };

async function loadBlog() {
  const grid = $("#blogGrid");
  if (!grid) return;

  try {
    const res = await fetch("/api/blog");
    if (!res.ok) throw new Error("Failed to load posts");
    const posts = await res.json();
    renderBlog(posts, grid);
  } catch {
    grid.innerHTML = renderBlogFallback();
  }
}

function renderBlog(posts, grid) {
  grid.innerHTML = posts.map(post => `
    <article class="blog-card fade-in-up" data-id="${post.id}" role="button" tabindex="0" aria-label="Read: ${post.title}">
      <div class="blog-thumb">
        <div class="blog-thumb-inner">${BLOG_ICONS[post.category] || "📰"}</div>
        <span class="blog-cat">${post.category}</span>
      </div>
      <div class="blog-body">
        <div class="blog-meta">
          <span>${formatDate(post.date)}</span>
          <span>·</span>
          <span>${post.readTime}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <span class="blog-read-more">Read more →</span>
      </div>
    </article>
  `).join("");

  $$(".blog-card[data-id]").forEach(card => {
    const open = () => openBlogModal(posts.find(p => p.id === card.dataset.id));
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") open(); });
  });
}

function renderBlogFallback() {
  const posts = [
    { icon: "🎨", cat: "Design Tips", title: "5 Print Finishes That Make Your Brand Unforgettable", excerpt: "From soft-touch lamination to UV spot varnish — the right finish takes your print from ordinary to premium.", date: "May 2025", time: "4 min read" },
    { icon: "📖", cat: "Guides", title: "How to Prepare Your File for Print", excerpt: "CMYK vs RGB, bleed, resolution — everything you need before sending your artwork to the printer.", date: "Apr 2025", time: "6 min read" },
    { icon: "📣", cat: "Marketing", title: "Branded Merch That Actually Gets Used", excerpt: "The psychology behind branded merchandise people keep — and the ones that end up in the bin.", date: "Mar 2025", time: "5 min read" },
  ];
  return posts.map(p => `
    <article class="blog-card fade-in-up">
      <div class="blog-thumb">
        <div class="blog-thumb-inner">${p.icon}</div>
        <span class="blog-cat">${p.cat}</span>
      </div>
      <div class="blog-body">
        <div class="blog-meta"><span>${p.date}</span><span>·</span><span>${p.time}</span></div>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <span class="blog-read-more">Read more →</span>
      </div>
    </article>
  `).join("");
}

function openBlogModal(post) {
  if (!post) return;
  const overlay = document.createElement("div");
  overlay.className = "blog-modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", post.title);

  overlay.innerHTML = `
    <div class="blog-modal">
      <div class="blog-modal-header">
        <div>
          <span class="section-tag">${post.category}</span>
          <h3 style="margin-top:0.5rem">${post.title}</h3>
          <div class="blog-meta" style="margin-top:0.5rem">${formatDate(post.date)} · ${post.readTime}</div>
        </div>
        <button class="blog-modal-close" aria-label="Close">✕</button>
      </div>
      <div class="blog-modal-content">${post.content}</div>
    </div>
  `;

  const close = () => { overlay.remove(); document.body.style.overflow = ""; };
  $(".blog-modal-close", overlay).addEventListener("click", close);
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", function esc(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
  });

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

// ── Contact form ──────────────────────────────────────────
function initContactForm() {
  const form = $("#orderForm");
  const submitBtn = $("#submitBtn");
  const msgEl = $("#formMessage");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    // Honeypot check — if filled, it's a bot
    if (document.getElementById("honeypot").value) return;

    submitBtn.disabled = true;
    $(".btn-text", submitBtn).textContent = "Sending…";
    $(".btn-spinner", submitBtn).hidden = false;
    msgEl.textContent = "";
    msgEl.className = "form-message";

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      await emailjs.init(EMAILJS_PUBLIC_KEY);
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || "Not provided",
        service: data.service,
        quantity: data.quantity || "Not specified",
        budget: data.budget || "Not specified",
        message: data.details || "None",
      });

      msgEl.textContent = "✅ Message sent! We'll be in touch within 24 hours.";
      msgEl.className = "form-message success";
      form.reset();

      setTimeout(() => {
        const msg = `Hi! I just sent a quote request for ${data.service || "print services"} via your website. My name is ${data.name}.`;
        const wpLink = document.createElement("a");
        wpLink.href = wa(msg);
        wpLink.target = "_blank";
        wpLink.rel = "noopener noreferrer";
        wpLink.textContent = " Or chat on WhatsApp →";
        wpLink.style.cssText = "color:#25d366;font-weight:600;display:block;margin-top:0.4rem;";
        msgEl.appendChild(wpLink);
      }, 500);

    } catch (err) {
      console.error("EmailJS error:", err);
      msgEl.textContent = "❌ Failed to send. Please try WhatsApp instead.";
      msgEl.className = "form-message error";
    } finally {
      submitBtn.disabled = false;
      $(".btn-text", submitBtn).textContent = "Send Request";
      $(".btn-spinner", submitBtn).hidden = true;
    }
  });
}

function validateForm(form) {
  let valid = true;
  const required = ["name", "email", "service"];
  required.forEach(name => {
    const el = form.elements[name];
    if (!el) return;
    if (!el.value.trim()) {
      el.classList.add("error");
      valid = false;
    } else {
      el.classList.remove("error");
    }
  });

  const email = form.elements["email"];
  if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add("error");
    valid = false;
  }

  $$("[required], #email", form).forEach(el => {
    el.addEventListener("input", () => el.classList.remove("error"), { once: true });
  });

  return valid;
}

// ── Scroll animations ─────────────────────────────────────
function initScrollAnimations() {
  const targets = [
    ...$$(".service-card"),
    ...$$(".portfolio-item"),
    ...$$(".pricing-card"),
    ...$$(".about-stat"),
    ...$$(".blog-card"),
    ...$$(".contact-detail"),
  ];

  targets.forEach((el, i) => {
    el.classList.add("fade-in-up");
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
}