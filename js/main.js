/* ===================================
   BMP – Main JavaScript v2
   Scroll Progress · Mobile Nav · Enhanced Reveal · Parallax · Accordion
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavigation();
  initMobileNav();
  initScrollReveal();
  initParallax();
  initAccordion();
  initSmoothScroll();
  initNavActive();
  initCounters();
  initFormInteractions();
  initPartnerCards();
});

/* ── Scroll Progress Bar ── */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${pct})`;
  }, { passive: true });
}

/* ── Navigation Scroll State ── */
function initNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile Navigation ── */
function initMobileNav() {
  const nav = document.querySelector('.nav');
  const navLinks = document.getElementById('nav-links');
  if (!nav || !navLinks) return;

  const toggle = document.createElement('button');
  toggle.className = 'nav__toggle';
  toggle.setAttribute('aria-label', 'Menü öffnen');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = `
    <span class="nav__toggle-bar"></span>
    <span class="nav__toggle-bar"></span>
    <span class="nav__toggle-bar"></span>
  `;
  nav.querySelector('.nav__inner').appendChild(toggle);

  const open = () => {
    navLinks.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Menü schließen');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => toggle.classList.contains('open') ? close() : open());
  navLinks.querySelectorAll('.nav__link, .nav__cta').forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ── Enhanced Scroll Reveal ── */
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal], .reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);

      setTimeout(() => {
        el.classList.add('revealed');

        el.querySelectorAll('.stagger-item').forEach((child, i) => {
          setTimeout(() => child.classList.add('revealed'), i * 130);
        });
      }, delay);

      observer.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ── Parallax on Hero ── */
function initParallax() {
  const heroBg = document.querySelector('.hero__bg');
  const heroContent = document.querySelector('.hero__content');
  if (!heroBg && !heroContent) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (heroBg) heroBg.style.transform = `translateY(${y * 0.35}px)`;
      if (heroContent) {
        heroContent.style.transform = `translateY(${y * 0.12}px)`;
        heroContent.style.opacity = String(Math.max(0, 1 - y / 700));
      }
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}

/* ── Accordion ── */
function initAccordion() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const isOpen = item.classList.contains('active');

      item.closest('.accordion')?.querySelectorAll('.accordion__item').forEach(i => {
        i.classList.remove('active');
      });

      if (!isOpen) item.classList.add('active');
    });
  });
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Active Nav Link ── */
function initNavActive() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ── Animated Counters ── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 2200;
  const start = performance.now();
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';

  (function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  })(start);
}

/* ── Partner Cards & Modal ── */
function initPartnerCards() {
  const cards = document.querySelectorAll('.partner-card');
  const modal = document.getElementById('partner-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  if (!cards.length || !modal) return;

  const partnerData = {
    ihk: {
      name: 'IHK Bayern',
      role: 'Wissenstransfer & Vernetzung',
      desc: 'Die IHK Bayern ist das Sprachrohr der bayerischen Wirtschaft. Als Partner des BMP unterstützt sie die Nominierten dabei, über regionale Grenzen hinweg sichtbar zu werden und fördert den Austausch zwischen etablierten Unternehmen und aufstrebenden Visionären.'
    },
    staatsregierung: {
      name: 'Bayerische Staatsregierung',
      role: 'Schirmherrschaft',
      desc: 'Unter der Schirmherrschaft des Wirtschaftsministeriums bildet der BMP die Brücke zwischen privater Exzellenz und staatlicher Anerkennung. Die Staatsregierung fördert den Preis als Zeichen für die Bedeutung des Mittelstands für den Standort Bayern.'
    },
    bvmw: {
      name: 'BVMW Bayern',
      role: 'Identifikation & Scouting',
      desc: 'Der Bundesverband mittelständische Wirtschaft (BVMW) nutzt sein deutschlandweites Netzwerk, um herausragende Hidden Champions in Bayern zu identifizieren und sie zur Teilnahme am BMP zu motivieren.'
    },
    ey: {
      name: 'EY Deutschland',
      role: 'Audit-Qualität & Neutralität',
      desc: 'EY (Ernst & Young) bürgt für die Integrität des Preises. Durch die Expertise in der Wirtschaftsprüfung stellt EY sicher, dass die qualitativen Audits vor Ort nach höchsten Standards und absolut neutral durchgeführt werden.'
    }
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.partner;
      const data = partnerData[id];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="overline" style="color: var(--color-accent);">${data.role}</span>
        <h2 style="color: var(--color-primary); margin: var(--space-sm) 0 var(--space-lg);">${data.name}</h2>
        <div class="gold-divider gold-divider--left"></div>
        <p style="color: var(--color-gray-dark); line-height: 1.8; font-size: 1.1rem;">${data.desc}</p>
        <button class="btn btn--primary btn--sm" style="margin-top: var(--space-xl);" onclick="document.getElementById('partner-modal').classList.remove('active')">Schließen</button>
      `;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalClose?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
/* ── Form Submit Feedback ── */
function initFormInteractions() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (!btn) return;

      const originalText = btn.innerHTML;
      btn.innerHTML = 'Wird gesendet...';
      btn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        btn.innerHTML = 'Anfrage gesendet ✓';
        btn.classList.add('btn--success');
        
        // Show success message if exists
        const successMsg = form.querySelector('.form-success-message');
        if (successMsg) successMsg.classList.add('active');

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.classList.remove('btn--success');
          if (successMsg) successMsg.classList.remove('active');
          form.reset();
        }, 3000);
      }, 1500);
    });
  });
}
