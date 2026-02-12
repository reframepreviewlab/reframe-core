/* ============================================================
   REFRAME — script.js
   Structured Website Preview Platform
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM REFS ─────────────────────────────────────────── */
  const modal       = document.getElementById('videoModal');
  const openBtn     = document.getElementById('openModal');
  const closeBtn    = document.getElementById('closeModal');
  const form        = document.getElementById('overviewForm');
  const formSuccess = document.getElementById('formSuccess');
  const heroVisual  = document.getElementById('heroVisual');
  const nav         = document.querySelector('.nav');

  /* ── MODAL ────────────────────────────────────────────── */
  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openBtn)  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  /* ── SCROLL REVEAL ────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // Hero elements visible immediately (above fold)
  document.querySelectorAll('.hero .reveal').forEach(function (el) {
    el.classList.add('visible');
  });

  /* ── STICKY NAV SCROLL TINT ───────────────────────────── */
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        nav.style.background = 'rgba(14,14,17,0.96)';
      } else {
        nav.style.background = 'rgba(14,14,17,0.82)';
      }
    }, { passive: true });
  }

  /* ── HERO PARALLAX (mouse move) ───────────────────────── */
  if (heroVisual) {
    var ticking = false;
    var mouseX = 0;
    var mouseY = 0;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!ticking) {
        requestAnimationFrame(function () {
          var cx = window.innerWidth  / 2;
          var cy = window.innerHeight / 2;
          var dx = (mouseX - cx) / cx;
          var dy = (mouseY - cy) / cy;

          heroVisual.style.transform =
            'translate(' + (dx * -6) + 'px, ' + (dy * -4) + 'px)';

          ticking = false;
        });
        ticking = true;
      }
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', function () {
      heroVisual.style.transform = 'translate(0, 0)';
    });
  }

  /* ── FORM SUBMISSION (Formspree / static host) ────────── */
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;
      }

      var data = new FormData(form);

      try {
        var response = await fetch(form.action, {
          method:  'POST',
          body:    data,
          headers: { 'Accept': 'application/json' }
        });

        // Formspree returns 200 on success
        if (response.ok) {
          showSuccess();
        } else {
          var json = await response.json();
          if (json.errors) {
            alert('There was a problem: ' + json.errors.map(function(e){ return e.message; }).join(', '));
            if (submitBtn) {
              submitBtn.textContent = 'Send Overview';
              submitBtn.disabled = false;
            }
          } else {
            showSuccess(); // still show success for demo
          }
        }
      } catch (err) {
        // Network error or CORS — show success for local/demo previews
        showSuccess();
      }
    });
  }

  function showSuccess() {
    if (form) form.style.display = 'none';
    if (formSuccess) formSuccess.classList.add('visible');
  }

  /* ── SMOOTH SCROLL for anchor links ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
