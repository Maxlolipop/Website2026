/* ═══════════════════════════════════════════════════
   VOLTFRAME — Interaction Layer
   ═══════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ─── Mobile Navigation ──────────────────────────
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("active");
      document.body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : "";
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // ─── Navbar scroll effect ───────────────────────
  const topBar = document.getElementById("topBar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    if (current > 100) {
      topBar.style.borderBottomColor = "var(--border-charcoal)";
    } else {
      topBar.style.borderBottomColor = "transparent";
    }
    lastScroll = current;
  }, { passive: true });

  // ─── Gallery Filtering ──────────────────────────
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card[data-category]");
  const recordCount = document.getElementById("recordCount");

  if (filterBtns.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("filter-btn--active"));
        btn.classList.add("filter-btn--active");

        const filter = btn.dataset.filter;
        let visible = 0;

        cards.forEach((card) => {
          if (filter === "all" || card.dataset.category === filter) {
            card.classList.remove("hidden");
            visible++;
          } else {
            card.classList.add("hidden");
          }
        });

        if (recordCount) {
          recordCount.textContent = `Displaying ${visible} of ${cards.length} records`;
        }
      });
    });
  }

  // ─── Contact Form ──────────────────────────────
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusDot = formStatus.querySelector(".contact__status-dot");
      const statusText = formStatus.querySelector(".contact__status-text");

      contactForm.classList.add("form--sending");
      statusDot.style.background = "var(--warning)";
      statusText.textContent = "TRANSMITTING...";

      setTimeout(() => {
        contactForm.classList.remove("form--sending");
        contactForm.classList.add("form--sent");
        statusDot.style.background = "var(--green-signal)";
        statusText.textContent = "TRANSMISSION COMPLETE";
        contactForm.reset();

        setTimeout(() => {
          contactForm.classList.remove("form--sent");
          statusText.textContent = "SYSTEM READY";
        }, 4000);
      }, 1500);
    });
  }

  // ─── Scroll Reveal ─────────────────────────────
  const revealElements = document.querySelectorAll(
    ".card, .about__card, .contact__form, .contact__info-card, .service-card, .process__step, .equipment__card"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ─── Smooth scroll for anchor links ─────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
})();
