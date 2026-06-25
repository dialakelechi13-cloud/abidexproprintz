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
    var blogPosts = [
      { img:"https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&q=80", cat:"Design Tips", title:"5 Print Finishes That Make Your Brand Unforgettable", excerpt:"From soft-touch lamination to UV spot varnish — the right finish takes your print from ordinary to premium.", date:"May 2025", time:"4 min read", content:"<p>When most people think about printing, they think about paper and colours. But experienced designers know the <em>finish</em> is what separates a forgettable flyer from something people actually keep.</p><h3>1. Soft-Touch Lamination</h3><p>Also called velvet lamination, this gives your print a smooth, matte feel that is almost fabric-like. It communicates luxury without saying a word. Perfect for business cards and brochures.</p><h3>2. UV Spot Varnish</h3><p>Apply gloss selectively — just on your logo for example — while the rest stays matte. The contrast grabs attention and creates a tactile surprise.</p><h3>3. Foil Stamping</h3><p>Gold, silver, rose gold, holographic — foil makes any design feel premium. Ideal for wedding stationery, certificates, and luxury packaging.</p><h3>4. Embossing &amp; Debossing</h3><p>Raise or sink elements into the paper for a 3D tactile effect. Often combined with foil for maximum impact.</p><h3>5. Aqueous Coating</h3><p>A water-based protective coating that is both durable and eco-friendly. Great for high-volume flyers and catalogues.</p><p><strong>Ready to upgrade your next print job?</strong> Chat with us on WhatsApp and let us pick the right finish for your brand.</p>" },
      { img:"https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80", cat:"Guides", title:"How to Prepare Your File for Print", excerpt:"CMYK vs RGB, bleed, resolution — everything you need before sending your artwork to the printer.", date:"Apr 2025", time:"6 min read", content:"<p>Nothing kills a beautiful design faster than sending the wrong file to the printer. Here is a checklist we give every new client.</p><h3>CMYK, Not RGB</h3><p>Your screen uses RGB light. Printers use CMYK ink. Always convert your file to CMYK before sending — otherwise colours can shift dramatically.</p><h3>300 DPI Minimum</h3><p>Screen resolution (72 dpi) will print blurry. Set your document to at least 300 dpi from the start.</p><h3>Add Bleed</h3><p>Bleed is an extra 3mm around every edge. It ensures no white borders appear after trimming. Always extend your background into the bleed area.</p><h3>Outline Your Fonts</h3><p>If your printer does not have the same fonts, text will reflow. Convert all text to outlines before saving your final file.</p><h3>Preferred File Formats</h3><p>Press-ready PDF is the gold standard. AI and EPS also work well. Avoid JPEGs for anything needing precise colour matching.</p><p>Still unsure? Send us your file and we will check it for free before printing.</p>" },
      { img:"https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80", cat:"Marketing", title:"Branded Merch That Actually Gets Used", excerpt:"The psychology behind branded merchandise people keep — and the ones that end up in the bin.", date:"Mar 2025", time:"5 min read", content:"<p>Every year, businesses spend billions on branded merchandise that ends up in a bin. The ones that do not? They follow a simple rule: utility first.</p><h3>Give People Something They Will Use</h3><p>Tote bags, water bottles, notebooks — people keep things that serve a daily function. A beautifully printed notebook with your logo lives on a desk for months.</p><h3>Quality Signals Value</h3><p>A cheap, flimsy t-shirt with a cracked print communicates the opposite of what you intend. Invest in quality. People associate the quality of your merch with the quality of your service.</p><h3>Less Logo, More Personality</h3><p>The best branded merch feels like something people would choose to wear even without the brand. Use your brand colours and a subtle logo, not a giant billboard.</p><h3>Think About Your Audience</h3><p>A tech startup gifts AirPods cases. A food brand gifts aprons. Match the merch to the lifestyle of your customer.</p><p>We produce everything from custom tote bags to branded packaging — let us talk about what works for your brand.</p>" }
    ];

    blogGrid.innerHTML = blogPosts.map(function(p, i) {
      return '<article class="blog-card fade-in-up" data-blog="'+i+'"><div class="blog-thumb" style="background-image:url(\'' + p.img + '\');background-size:cover;background-position:center;"><span class="blog-cat">'+p.cat+'</span></div><div class="blog-body"><div class="blog-meta"><span>'+p.date+'</span><span>·</span><span>'+p.time+'</span></div><h3>'+p.title+'</h3><p>'+p.excerpt+'</p><span class="blog-read-more">Read more →</span></div></article>';
    }).join("");

    document.querySelectorAll(".blog-card[data-blog]").forEach(function(card) {
      card.addEventListener("click", function() {
        var post = blogPosts[card.dataset.blog];
        var overlay = document.createElement("div");
        overlay.className = "blog-modal-overlay";
        overlay.innerHTML = '<div class="blog-modal"><div

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