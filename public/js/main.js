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
        img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&q=80",
        cat: "Design Tips",
        title: "5 Print Finishes That Make Your Brand Unforgettable",
        excerpt: "From soft-touch lamination to UV spot varnish - the right finish takes your print from ordinary to premium.",
        date: "May 2025", time: "4 min read",
        content: "<p>When most people think about printing, they think about paper and colours. But experienced designers know the finish is what separates a forgettable flyer from something people actually keep.</p><h3>1. Soft-Touch Lamination</h3><p>Also called velvet lamination, this gives your print a smooth, matte feel that is almost fabric-like. It communicates luxury without saying a word. Perfect for business cards and brochures.</p><h3>2. UV Spot Varnish</h3><p>Apply gloss selectively while the rest stays matte. The contrast grabs attention and creates a tactile surprise.</p><h3>3. Foil Stamping</h3><p>Gold, silver, rose gold, holographic - foil makes any design feel premium. Ideal for wedding stationery, certificates, and luxury packaging.</p><h3>4. Embossing and Debossing</h3><p>Raise or sink elements into the paper for a 3D tactile effect. Often combined with foil for maximum impact.</p><h3>5. Aqueous Coating</h3><p>A water-based protective coating that is both durable and eco-friendly. Great for high-volume flyers and catalogues.</p><p>Ready to upgrade your next print job? Chat with us on WhatsApp and let us pick the right finish for your brand.</p>"
      },
      {
        img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
        cat: "Guides",
        title: "How to Prepare Your File for Print",
        excerpt: "CMYK vs RGB, bleed, resolution - everything you need before sending your artwork to the printer.",
        date: "Apr 2025", time: "6 min read",
        content: "<p>Nothing kills a beautiful design faster than sending the wrong file to the printer. Here is a checklist we give every new client.</p><h3>CMYK, Not RGB</h3><p>Your screen uses RGB light. Printers use CMYK ink. Always convert your file to CMYK before sending, otherwise colours can shift dramatically.</p><h3>300 DPI Minimum</h3><p>Screen resolution will print blurry. Set your document to at least 300 dpi from the start.</p><h3>Add Bleed</h3><p>Bleed is an extra 3mm around every edge. It ensures no white borders appear after trimming.</p><h3>Outline Your Fonts</h3><p>If your printer does not have the same fonts, text will reflow. Convert all text to outlines before saving.</p><h3>Preferred File Formats</h3><p>Press-ready PDF is the gold standard. AI and EPS also work well. Avoid JPEGs for precise colour work.</p><p>Still unsure? Send us your file and we will check it for free before printing.</p>"
      },
      {
        img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
        cat: "Marketing",
        title: "Branded Merch That Actually Gets Used",
        excerpt: "The psychology behind branded merchandise people keep - and the ones that end up in the bin.",
        date: "Mar 2025", time: "5 min read",
        content: "<p>Every year, businesses spend billions on branded merchandise that ends up in a bin. The ones that do not follow a simple rule: utility first.</p><h3>Give People Something They Will Use</h3><p>Tote bags, water bottles, notebooks - people keep things that serve a daily function. A beautifully printed notebook with your logo lives on a desk for months.</p><h3>Quality Signals Value</h3><p>A cheap, flimsy t-shirt with a cracked print communicates the opposite of what you intend. Invest in quality. People associate the quality of your merch with the quality of your service.</p><h3>Less Logo, More Personality</h3><p>The best branded merch feels like something people would choose to wear even without the brand. Use your brand colours and a subtle logo.</p><h3>Think About Your Audience</h3><p>A tech startup gifts AirPods cases. A food brand gifts aprons. Match the merch to the lifestyle of your customer.</p><p>We produce everything from custom tote bags to branded packaging - let us talk about what works for your brand.</p>"
      },
      {
        img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
        cat: "Guides",
        title: "Choosing the Right Paper for Your Print Job",
        excerpt: "GSM, finish, texture - a simple guide to picking the perfect paper stock for any project.",
        date: "Feb 2025", time: "5 min read",
        content: "<p>The paper you choose says as much about your brand as the design printed on it. Here is how to choose right.</p><h3>Understanding GSM</h3><p>GSM means grams per square metre - basically how thick and heavy the paper is. A flyer might use 130gsm, while a premium business card uses 350gsm or more. Higher GSM feels more substantial and premium.</p><h3>Matte vs Gloss</h3><p>Gloss paper makes colours pop and works great for vibrant photos. Matte paper is easier to read and feels more sophisticated. Your choice depends on the mood you want.</p><h3>Textured Stocks</h3><p>Linen, felt, and laid paper add a tactile premium feel. Perfect for wedding invitations and luxury branding.</p><h3>Recycled Options</h3><p>Eco-conscious brands can choose recycled stocks that look great and tell a sustainability story.</p><p>Not sure which to pick? We will show you samples before printing so you feel confident in your choice.</p>"
      },
      {
        img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80",
        cat: "Marketing",
        title: "Why Every Lagos Business Needs Professional Signage",
        excerpt: "Your signage is a 24/7 salesperson. Here is how to make it work harder for your brand.",
        date: "Jan 2025", time: "4 min read",
        content: "<p>In a busy city like Lagos, your signage is often the first thing a customer sees. Make it count.</p><h3>First Impressions Matter</h3><p>A clean, professional sign tells customers you are serious and trustworthy. A faded or cheap-looking sign does the opposite, no matter how good your service is.</p><h3>Visibility Is Everything</h3><p>Bold colours, clear fonts, and the right size mean people notice you from across the street or in heavy traffic. We design signage that gets seen.</p><h3>Built to Last</h3><p>Lagos weather is tough. We use durable, weather-resistant materials so your sign looks sharp through rain and sun.</p><h3>Consistent Branding</h3><p>Your signage should match your business cards, flyers, and online presence. Consistency builds recognition and trust.</p><p>From shop fronts to event backdrops, we produce signage that makes your brand impossible to miss.</p>"
      },
      {
        img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80",
        cat: "Design Tips",
        title: "The Power of Consistent Brand Colours in Print",
        excerpt: "Why getting your brand colours right across every print matters more than you think.",
        date: "Dec 2024", time: "4 min read",
        content: "<p>Strong brands are instantly recognisable by their colours alone. Think of the big names - you know them by colour before you even read the name.</p><h3>Colour Builds Recognition</h3><p>When your business cards, flyers, banners, and packaging all use the same exact colours, customers start to recognise you instantly. That recognition builds trust over time.</p><h3>The CMYK Challenge</h3><p>Colours on your screen do not always match printed colours. We use professional colour management so your brand red stays your brand red, every single time.</p><h3>Pantone Matching</h3><p>For brands that need exact colour every time, we offer Pantone spot colour matching - the same system global brands use.</p><h3>Consistency Across Materials</h3><p>Different papers absorb ink differently. Our experience ensures your colours stay consistent whether on a glossy flyer or a matte business card.</p><p>Want your brand to look consistent everywhere? Let us handle your colour management.</p>"
      }
    ];

    var html = "";
    for (var i = 0; i < blogPosts.length; i++) {
      var p = blogPosts[i];
      html += '<article class="blog-card fade-in-up" data-blog="' + i + '">';
      html += '<div class="blog-thumb" style="background-image:url(\'' + p.img + '\');background-size:cover;background-position:center;">';
      html += '<span class="blog-cat">' + p.cat + '</span></div>';
      html += '<div class="blog-body"><div class="blog-meta"><span>' + p.date + '</span><span>&middot;</span><span>' + p.time + '</span></div>';
      html += '<h3>' + p.title + '</h3><p>' + p.excerpt + '</p>';
      html += '<span class="blog-read-more">Read more &rarr;</span></div></article>';
    }
    blogGrid.innerHTML = html;

    var cards = document.querySelectorAll(".blog-card[data-blog]");
    cards.forEach(function(card) {
      card.addEventListener("click", function() {
        var post = blogPosts[card.dataset.blog];
        var overlay = document.createElement("div");
        overlay.className = "blog-modal-overlay";
        var modal = '<div class="blog-modal"><div class="blog-modal-header"><div>';
        modal += '<span class="section-tag">' + post.cat + '</span>';
        modal += '<h3 style="margin-top:0.5rem">' + post.title + '</h3>';
        modal += '<div class="blog-meta" style="margin-top:0.5rem">' + post.date + ' &middot; ' + post.time + '</div></div>';
        modal += '<button class="blog-modal-close" aria-label="Close">&times;</button></div>';
        modal += '<div class="blog-modal-content">' + post.content + '</div></div>';
        overlay.innerHTML = modal;
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";
        function closeModal() { overlay.remove(); document.body.style.overflow = ""; }
        overlay.querySelector(".blog-modal-close").addEventListener("click", closeModal);
        overlay.addEventListener("click", function(e) { if (e.target === overlay) closeModal(); });
      });
    });
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