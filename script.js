(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal for section blocks
  var revealTargets = document.querySelectorAll(
    ".section .wrap > *, .feature-card"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Photo lightbox
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(src, alt) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".photo-item[data-full]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var img = btn.querySelector("img");
      openLightbox(btn.getAttribute("data-full"), img ? img.alt : "");
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  // Contact form validation (static site: no backend, so we confirm locally)
  var form = document.getElementById("contactForm");
  if (form) {
    var statusEl = document.getElementById("formStatus");

    // simple math captcha, regenerated on every page load
    var captchaA = 1 + Math.floor(Math.random() * 8);
    var captchaB = 1 + Math.floor(Math.random() * 8);
    var captchaAnswer = captchaA + captchaB;
    var captchaLabelEl = document.getElementById("captchaLabel");
    if (captchaLabelEl) {
      captchaLabelEl.textContent = "Even controleren — hoeveel is " + captchaA + " + " + captchaB + "?";
    }

    var fields = {
      name: {
        input: document.getElementById("name"),
        error: document.getElementById("nameError"),
        validate: function (v) {
          return v.trim().length > 0 ? "" : "Vul je naam in.";
        },
      },
      email: {
        input: document.getElementById("email"),
        error: document.getElementById("emailError"),
        validate: function (v) {
          var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(v.trim()) ? "" : "Vul een geldig e-mailadres in.";
        },
      },
      message: {
        input: document.getElementById("message"),
        error: document.getElementById("messageError"),
        validate: function (v) {
          return v.trim().length > 0 ? "" : "Laat een bericht achter.";
        },
      },
      captcha: {
        input: document.getElementById("captcha"),
        error: document.getElementById("captchaError"),
        validate: function (v) {
          return parseInt(v.trim(), 10) === captchaAnswer ? "" : "Dat is niet het juiste antwoord.";
        },
      },
    };

    function validateField(key) {
      var field = fields[key];
      var message = field.validate(field.input.value);
      field.error.textContent = message;
      field.input.closest(".field").classList.toggle("has-error", !!message);
      return !message;
    }

    Object.keys(fields).forEach(function (key) {
      fields[key].input.addEventListener("blur", function () {
        validateField(key);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var allValid = Object.keys(fields)
        .map(validateField)
        .every(Boolean);

      if (!allValid) {
        statusEl.textContent = "";
        return;
      }

      // No backend on a static site — hand off to the visitor's mail client.
      var name = fields.name.input.value.trim();
      var email = fields.email.input.value.trim();
      var message = fields.message.input.value.trim();

      var subject = encodeURIComponent(
        "Interesse in Maria Yssersstraat 41, Rumbeke"
      );
      var body = encodeURIComponent(
        "Naam: " + name + "\nE-mail: " + email + "\n\n" + message
      );

      statusEl.textContent = "Je e-mailprogramma wordt geopend om het bericht te versturen…";
      window.location.href =
        "mailto:info@example.com?subject=" + subject + "&body=" + body;

      form.reset();
    });
  }
})();
