/* ABIDEXPRO PRINTZ - main.js */

var WHATSAPP_NUMBER = "2347060927528";
var EMAILJS_SERVICE_ID = "service_uiqfcod";
var EMAILJS_TEMPLATE_ID = "template_mnvcnh8";
var EMAILJS_PUBLIC_KEY = "v6yM1_easETvBWAZz";

window.onload = function() {

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var waMsg = "Hi Abidexpro Printz! I would like to get a quote for my print project.";
  var waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(waMsg);
  ["whatsappBtn","footerWhatsapp","floatingWa"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.href = waUrl;
  });

  var header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", function() {
      header.classList.toggle("scrolled", window.scrollY > 60);
    });
  }

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

  // Service detail popups
  var serviceDetails = {
    "Business Cards": { icon: "🖊", content: "<p>Your business card is often the first physical impression of your brand. We make it count.</p><h3>What's Included</h3><p>Double-sided full-colour printing on premium 350gsm stock, precision cutting, and your choice of finish. Standard size 85 x 54mm, or custom sizes on request.</p><h3>Finishes Available</h3><p>Matte lamination, gloss lamination, soft-touch velvet, spot UV, gold/silver foil, embossing, and rounded corners. Mix and match to create something memorable.</p><h3>Turnaround</h3><p>Standard 3-day turnaround, with express options available for urgent orders. Minimum order 100 units.</p>" },
    "Flyers & Brochures": { icon: "📄", content: "<p>High-impact marketing materials that get your message into customers' hands.</p><h3>What's Included</h3><p>Full-colour printing on quality 130gsm or 170gsm stock. Available in A4, A5, A6, and DL sizes. Single sheets or folded brochures (bi-fold, tri-fold, gate-fold).</p><h3>Perfect For</h3><p>Event promotion, product catalogues, menus, corporate presentations, and promotional campaigns. Bulk discounts available for large runs.</p><h3>Turnaround</h3><p>2-day standard turnaround. Design service available if you need artwork created.</p>" },
    "Banners & Signage": { icon: "🏗", content: "<p>Large format printing that makes your brand impossible to miss.</p><h3>What's Included</h3><p>Roll-up banners (2400mm x 800mm) complete with stand and carry bag, flex banners for outdoor use, X-stands, and event backdrops. Weather-resistant materials for durability.</p><h3>Perfect For</h3><p>Trade shows, store fronts, events, conferences, and outdoor advertising. Built to withstand Lagos weather.</p><h3>Turnaround</h3><p>48-hour express turnaround available. Includes free design consultation to maximise visibility.</p>" },
    "Branded Merchandise": { icon: "👕", content: "<p>Turn everyday items into walking advertisements for your brand.</p><h3>What's Included</h3><p>Custom T-shirts and hoodies (200-250gsm cotton), tote bags, mugs, caps, pens, and corporate gift items. Screen printing, DTG, and embroidery options.</p><h3>Perfect For</h3><p>Staff uniforms, event giveaways, corporate gifts, and promotional campaigns. Minimum order 10 units for apparel.</p><h3>Sizing</h3><p>Apparel available in sizes XS to 3XL. We can produce samples before full production runs.</p>" },
    "Packaging & Labels": { icon: "📦", content: "<p>Packaging that protects your product and elevates your brand.</p><h3>What's Included</h3><p>Custom boxes, product labels, stickers, hang tags, and wrapping. Available with premium finishes like spot UV and foil for a luxury feel.</p><h3>Perfect For</h3><p>Product brands, food and beverage businesses, cosmetics, and e-commerce shipping. Custom shapes and sizes available.</p><h3>Materials</h3><p>Durable card stock, waterproof label options, and eco-friendly recyclable materials.</p>" },
    "Design Services": { icon: "🎨", content: "<p>No artwork? Our in-house designers bring your ideas to life.</p><h3>What's Included</h3><p>Logo design, business card design, flyer and brochure layout, banner design, and complete brand identity packages. All files delivered print-ready.</p><h3>How It Works</h3><p>Share your idea, references, and brand colours. We create initial concepts, refine based on your feedback, and prepare final print-ready files.</p><h3>Turnaround</h3><p>Design timelines vary by project complexity. Simple designs in 1-2 days, full brand packages in about a week.</p>" }
  };

  document.querySelectorAll(".service-card").forEach(function(card) {
    var link = card.querySelector(".service-link");
    if (link) {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        var title = card.querySelector("h3").textContent;
        var detail = serviceDetails[title];
        if (!detail) { window.location.hash = "#contact"; return; }
        var overlay = document.createElement("div");
        overlay.className = "blog-modal-overlay";
        var modal = '<div class="blog-modal"><div class="blog-modal-header"><div>';
        modal += '<span class="section-tag">Service</span>';
        modal += '<h3 style="margin-top:0.5rem">' + detail.icon + ' ' + title + '</h3></div>';
        modal += '<button class="blog-modal-close" aria-label="Close">&times;</button></div>';
        modal += '<div class="blog-modal-content">' + detail.content + '<div style="margin-top:1.5rem;text-align:center;"><a href="#contact" class="btn btn-primary" onclick="document.querySelector(\'.blog-modal-overlay\').remove();document.body.style.overflow=\'\';">Get a Quote →</a></div></div></div>';
        overlay.innerHTML = modal;
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";
        function closeModal() { overlay.remove(); document.body.style.overflow = ""; }
        overlay.querySelector(".blog-modal-close").addEventListener("click", closeModal);
        overlay.addEventListener("click", function(ev) { if (ev.target === overlay) closeModal(); });
      });
    }
  });

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

  // Blog
  var blogGrid = document.getElementById("blogGrid");
  if (blogGrid) {
    var blogPosts = [
      {
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
        cat: "Pricing",
        title: "How Much Does Printing Cost in Lagos?",
        excerpt: "A plain-English 2026 price guide - what things cost, what changes the price, and where people waste money.",
        date: "Aug 2026", time: "7 min read",
        url: "/blog/printing-cost-lagos"
      },
      {
        img: "https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=600&q=80",
        cat: "Pricing",
        title: "Roll-Up Banner Prices in Lagos",
        excerpt: "What you should actually pay, what separates a cheap stand from a good one, and the design mistakes that ruin banners.",
        date: "Aug 2026", time: "6 min read",
        url: "/blog/roll-up-banner-prices-lagos"
      },
      {
        img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
        cat: "Guides",
        title: "Business Card Paper Guide",
        excerpt: "GSM explained, matte versus gloss, and when lamination is genuinely worth paying for.",
        date: "Aug 2026", time: "6 min read",
        url: "/blog/business-card-paper-guide"
      },
      {
        img: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&q=80",
        cat: "Guides",
        title: "How Long Does Printing Take in Lagos?",
        excerpt: "Realistic turnaround times by product, what causes delays, and how to plan backwards from an event date.",
        date: "Aug 2026", time: "5 min read",
        url: "/blog/printing-turnaround-lagos"
      },
      {
        img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
        cat: "Guides",
        title: "DTF, Screen Printing or Vinyl?",
        excerpt: "The four ways to print a t-shirt, which suits which job, and why some prints crack after three washes.",
        date: "Aug 2026", time: "6 min read",
        url: "/blog/t-shirt-printing-methods-lagos"
      }
    ];

    var html = "";
    for (var i = 0; i < blogPosts.length; i++) {
      var p = blogPosts[i];
      html += '<a class="blog-card fade-in-up" href="' + p.url + '" style="text-decoration:none;color:inherit;display:block;">';
      html += '<div class="blog-thumb" style="background-image:url(\'' + p.img + '\');background-size:cover;background-position:center;">';
      html += '<span class="blog-cat">' + p.cat + '</span></div>';
      html += '<div class="blog-body"><div class="blog-meta"><span>' + p.date + '</span><span>&middot;</span><span>' + p.time + '</span></div>';
      html += '<h3>' + p.title + '</h3><p>' + p.excerpt + '</p>';
      html += '<span class="blog-read-more">Read more &rarr;</span></div></a>';
    }
    blogGrid.innerHTML = html;
  }

  // Scroll animations
  document.querySelectorAll(".service-card,.portfolio-item,.pricing-card,.about-stat,.contact-detail,.process-step").forEach(function(el, i) {
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
    if (btnText) btnText.textContent = "Sending...";
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
      if (msgEl) { msgEl.textContent = "Message sent! We will be in touch within 24 hours."; msgEl.className = "form-message success"; }
      form.reset();
    }).catch(function(err) {
      if (msgEl) { msgEl.textContent = "Failed to send. Please try WhatsApp instead."; msgEl.className = "form-message error"; }
    }).finally(function() {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = "Send Request";
    });
  });

};