/* ============================================
   PORTFOLIO — Cursor + Scroll Progress + Lenis + Reveals
   ============================================ */

(function () {
  'use strict';

  var hasHover = window.matchMedia('(hover: hover)').matches;

  /* -----------------------------------------------
     1. CUSTOM CURSOR DOT
     ----------------------------------------------- */
  function initCursor() {
    if (!hasHover) return;

    var dot = document.querySelector('.cursor-dot');
    if (!dot) return;

    var mx = 0, my = 0;
    var dx = 0, dy = 0;
    var hovering = false;

    var hoverTargets = 'a, button, .work-panel, .contact-link, .work-cta';

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (!dot.classList.contains('visible')) {
        dot.classList.add('visible');
      }
    });

    document.addEventListener('mouseleave', function () {
      dot.classList.remove('visible');
    });

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverTargets)) {
        if (!hovering) { hovering = true; dot.classList.add('hovering'); }
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverTargets)) {
        var related = e.relatedTarget;
        if (!related || !related.closest(hoverTargets)) {
          hovering = false;
          dot.classList.remove('hovering');
        }
      }
    });

    function tick() {
      requestAnimationFrame(tick);
      dx += (mx - dx) * 0.15;
      dy += (my - dy) * 0.15;
      dot.style.left = dx + 'px';
      dot.style.top = dy + 'px';
    }
    tick();
  }

  /* -----------------------------------------------
     2. SCROLL PROGRESS BAR
     ----------------------------------------------- */
  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* -----------------------------------------------
     3. LENIS — Smooth Scroll
     ----------------------------------------------- */
  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    var lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* -----------------------------------------------
     4. HERO REVEAL
     ----------------------------------------------- */
  function initHeroReveal() {
    var heroTitles = document.querySelectorAll('.hero-name h1');
    heroTitles.forEach(function (h1, i) {
      var text = h1.textContent;
      var span = document.createElement('span');
      span.className = 'char-wrap';
      span.textContent = text;
      h1.textContent = '';
      h1.appendChild(span);

      setTimeout(function () {
        span.classList.add('visible');
      }, 300 + i * 150);
    });
  }

  /* -----------------------------------------------
     5. SCROLL REVEAL
     ----------------------------------------------- */
  function initScrollReveal() {
    var selectors = ['.about', '.work-section-label', '.contact-heading', '.contact-links'];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { el.classList.add('reveal'); });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  }

  /* -----------------------------------------------
     6. FOOTER YEAR
     ----------------------------------------------- */
  function initFooterYear() {
    var span = document.querySelector('.footer .mono-sm');
    if (span) span.textContent = '\u00A9 ' + new Date().getFullYear() + ' Filippo Cappa';
  }

  /* -----------------------------------------------
     BOOT
     ----------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initHeroReveal();
    initScrollReveal();
    initFooterYear();
    initLenis();
    initCursor();
    initScrollProgress();
  });

})();
