/* ═══════════════════════════════════════════════════════
   ABIDEXPRO PRINTZ — main.js
   ═══════════════════════════════════════════════════════ */

// ── Config ───────────────────────────────────────────────
var WHATSAPP_NUMBER = "2347060927528";
var EMAILJS_SERVICE_ID = "service_uiqfcod";
var EMAILJS_TEMPLATE_ID = "template_mnvcnh8";
var EMAILJS_PUBLIC_KEY = "LK3UyxCI0LcJXU1NS9avQ";

// ── Wait for page to load ────────────────────────────────
window.onload = function() {
  setYear();
  initWhatsApp();
  initNav();
  initPortfolioFilter();
  loadBlog();
  initScrollAnimations();

  // ── Contact form ──────────────────────────────────────
  var form = document.getElementById("orderForm");
  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      e.stopPropagation();
      alert("step 1");

      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var service = document.getElementById("service").value.trim();
      var phone = document.getElementById("phone").value.trim();
      var quantity = document.getElementById("quantity").value.trim();
      var details = document.getElementById("details").value.trim();
      var budget = document.getElementById("budget").value.trim();
      var honeypotEl = document.getElementById("honeypot");
      var honeypot = honeypotEl ? honeypotEl.value : "";
      var msgEl = document.getElementById("formMessage");
      var submitBtn = document.getElementById("submitBtn");

      // Skip honeypot on mobile

      alert("JS is running! Name: " + name + " Service: " + service);

      alert("JS is running! Name: " + name + " Service: " + service);

      alert("JS is running! Name: " + name + " Service: " + service);

      alert("JS is running! Name: " + name + " Service: " + service);

      alert("JS is running! Name: " + name + " Service: " + service);

      // Validate
      if (!name || !email || !service) {
        msgEl.textContent = "Please fill in your name, email and service.";
        msgEl.className = "form-message error";
        return false;
      }

      // Loading state
      submitBtn.disabled = true;
      submitBtn.querySelector(".btn-text").textContent = "Sending…";
      msgEl.textContent = "";
      msgEl.className = "form-message";

      // Send via EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        phone: phone || "Not provided",
        service: service,
        quantity: quantity || "Not specified",
        budget: budget || "Not specified",
        message: details || "None"
      }).then(function() {
        msgEl.textContent = "✅ Message sent! We'll be in touch within 24 hours.";
        msgEl.className = "form-message success";
        form.reset();
        submitBtn.disabled = false;
        submitBtn.querySelector(".btn-text").textContent = "Send Request";
      }).catch(function(err) {
        console.error("EmailJS error:", err);
        msgEl.textContent = "❌ Failed to send. Please try WhatsApp instead.";
        msgEl.className = "form-message error";
        submitBtn.disabled = false;
        submitBtn.querySelector(".btn-text").textContent = "Send Request";
      });

      return false;
    };
  }
};

// ── Year ─────────────────────────────────────────────────
function setYear() {
  var el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ── WhatsApp links ────────────────────────────────────────
function initWhatsApp() {
  var defaultMsg = "Hi Abidexpro Printz! I'd like to get a quote for my print project.";
  var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(defaultMsg);
  var ids = ["whatsappBtn", "footerWhatsapp", "floatingWa"];
  ids.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.href = url;
  });
}

// ── Navigation ───────────────────────────────────────────
function initNav() {
  var header = document.getElementById("header");
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  if (!header || !hamburger || !navLinks) return;

  window.addEventListener("scroll", function() {
    header.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });

  hamburger.addEventListener("click", function() {
    var open = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
  });

  var navAnchors = navLinks.querySelectorAll("a");
  navAnchors.forEach(function(a) {
    a.addEventListener("click", function() {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

// ── Portfolio filter ──────────────────────────────────────
function initPortfolioFilter() {
  var btns = document.querySelectorAll(".filter-btn");
  var items = document.querySelectorAll(".portfolio-item");

  btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      btns.forEach(function(b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      var filter = btn.dataset.filter;
      items.forEach(function(item) {
        var show = filter === "all" || item.dataset.cat === filter;
        item.classList.toggle("hidden", !show);
      });
    });
  });
}

// ── Blog ──────────────────────────────────────────────────
function loadBlog() {
  var grid = document.getElementById("blogGrid");
  if (!grid) return;
  grid.innerHTML = renderBlogFallback();
}

function renderBlogFallback() {
  var posts = [
    { icon: "🎨", cat: "Design Tips", title: "5 Print Finishes That Make Your Brand Unforgettable", excerpt: "From soft-touch lamination to UV spot varnish — the right finish takes your print from ordinary to premium.", date: "May 2025", time: "4 min read" },
    { icon: "📖", cat: "Guides", title: "How to Prepare Your File for Print", excerpt: "CMYK vs RGB, bleed, resolution — everything you need before sending your artwork to the printer.", date: "Apr 2025", time: "6 min read" },
    { icon: "📣", cat: "Marketing", title: "Branded Merch That Actually Gets Used", excerpt: "The psychology behind branded merchandise people keep — and the ones that end up in the bin.", date: "Mar 2025", time: "5 min read" },
  ];
  return posts.map(function(p) {
    return '<article class="blog-card fade-in-up">' +
      '<div class="blog-thumb"><div class="blog-thumb-inner">' + p.icon + '</div><span class="blog-cat">' + p.cat + '</span></div>' +
      '<div class="blog-body"><div class="blog-meta"><span>' + p.date + '</span><span>·</span><span>' + p.time + '</span></div>' +
      '<h3>' + p.title + '</h3><p>' + p.excerpt + '</p>' +
      '<span class="blog-read-more">Read more →</span></div></article>';
  }).join("");
}

// ── Scroll animations ─────────────────────────────────────
function initScrollAnimations() {
  var targets = document.querySelectorAll(".service-card, .portfolio-item, .pricing-card, .about-stat, .contact-detail");

  targets.forEach(function(el, i) {
    el.classList.add("fade-in-up");
    el.style.transitionDelay = (i % 4 * 0.08) + "s";
  });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function(el) { observer.observe(el); });
}