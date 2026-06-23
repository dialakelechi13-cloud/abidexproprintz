/* ABIDEXPRO PRINTZ - main.js */

var WHATSAPP_NUMBER = "2347060927528";
var EMAILJS_SERVICE_ID = "service_uiqfcod";
var EMAILJS_TEMPLATE_ID = "template_mnvcnh8";
var EMAILJS_PUBLIC_KEY = "v6yM1_easETvBWAZz";

window.onload = function() {

  // Year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // WhatsApp
  var waMsg = "Hi Abidexpro Printz! I'd like to get a quote for my print project.";
  var waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(waMsg);
  ["whatsappBtn","footerWhatsapp","floatingWa"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.href = waUrl;
  });

  // Nav scroll
  var header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", function() {
      header.classList.toggle("scrolled", window.scrollY > 60);
    });
  }

  // Hamburger menu
  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function() {
      var open = navLinks.classList.toggle("open");
      hamburger.classList.toggle("open", open);
    });
    navLinks.querySelectorAll("a").forEach(function(a) {
      a.addEventListener("click", function() {
        navLinks.classList.remove("open");
        hamburger.classList.remove("open");
      });
    });
  }

  // Portfolio filter
  var filterBtns = document.querySelectorAll(".filter-btn");
  var portfolioItems = document.querySelectorAll(".portfolio-item");
  filterBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      filterBtns.forEach(function(b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var filter = btn.dataset.filter;
      portfolioItems.forEach(function(item) {
        item.classList.toggle("hidden", filter !== "all" && item.dataset.cat !== filter);
      });
    });
  });

  // Blog fallback
  var blogGrid = document.getElementById("blogGrid");
  if (blogGrid) {
    blogGrid.innerHTML = [
      { icon:"🎨", cat:"Design Tips", title:"5 Print Finishes That Make Your Brand Unforgettable", excerpt:"From soft-touch lamination to UV spot varnish — the right finish takes your print from ordinary to premium.", date:"May 2025", time:"4 min read" },
      { icon:"📖", cat:"Guides", title:"How to Prepare Your File for Print", excerpt:"CMYK vs RGB, bleed, resolution — everything you need before sending your artwork to the printer.", date:"Apr 2025", time:"6 min read" },
      { icon:"📣", cat:"Marketing", title:"Branded Merch That Actually Gets Used", excerpt:"The psychology behind branded merchandise people keep — and the ones that end up in the bin.", date:"Mar 2025", time:"5 min read" }
    ].map(function(p) {
      return '<article class="blog-card fade-in-up"><div class="blog-thumb"><div class="blog-thumb-inner">'+p.icon+'</div><span class="blog-cat">'+p.cat+'</span></div><div class="blog-body"><div class="blog-meta"><span>'+p.date+'</span><span>·</span><span>'+p.time+'</span></div><h3>'+p.title+'</h3><p>'+p.excerpt+'</p><span class="blog-read-more">Read more →</span></div></article>';
    }).join("");
  }

  // Scroll animations
  document.querySelectorAll(".service-card,.portfolio-item,.pricing-card,.about-stat,.contact-detail").forEach(function(el, i) {
    el.classList.add("fade-in-up");
    el.style.transitionDelay = (i % 4 * 0.08) + "s";
  });
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".fade-in-up").forEach(function(el) { observer.observe(el); });

  // Contact form
  var form = document.getElementById("orderForm");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    var nameEl = document.getElementById("name");
    var emailEl = document.getElementById("email");
    var serviceEl = document.getElementById("service");
    var phoneEl = document.getElementById("phone");
    var quantityEl = document.getElementById("quantity");
    var detailsEl = document.getElementById("details");
    var budgetEl = document.getElementById("budget");
    var msgEl = document.getElementById("formMessage");
    var submitBtn = document.getElementById("submitBtn");
    var btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;

    var name = nameEl ? nameEl.value.trim() : "";
    var email = emailEl ? emailEl.value.trim() : "";
    var service = serviceEl ? serviceEl.value.trim() : "";

    if (!name || !email || !service) {
      if (msgEl) { msgEl.textContent = "Please fill in your name, email and service."; msgEl.className = "form-message error"; }
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = "Sending…";
    if (msgEl) { msgEl.textContent = ""; msgEl.className = "form-message"; }

    emailjs.init({publicKey: EMAILJS_PUBLIC_KEY});
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      phone: phoneEl ? phoneEl.value.trim() : "Not provided",
      service: service,
      quantity: quantityEl ? quantityEl.value.trim() : "Not specified",
      budget: budgetEl ? budgetEl.value.trim() : "Not specified",
      message: detailsEl ? detailsEl.value.trim() : "None"
    }).then(function() {
      if (msgEl) { msgEl.textContent = "✅ Message sent! We'll be in touch within 24 hours."; msgEl.className = "form-message success"; }
      form.reset();
    }).catch(function(err) {
      var errMsg = JSON.stringify(err) || err.text || err.message || "Unknown error";
      if (msgEl) { msgEl.textContent = "❌ Error: " + errMsg; msgEl.className = "form-message error"; }
    }).finally(function() {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = "Send Request";
    });
  });

};