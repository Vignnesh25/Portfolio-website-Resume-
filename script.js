/* ============================================================
   VIGNNESH PORTFOLIO — Enhanced Script
   ============================================================ */

const TYPING_PHRASES = [
  "AI & Data Science Student",
  "Future Software Engineer",
  "ML & IoT Builder",
  "Tech Enthusiast",
];

/* ---------- Theme ---------- */
function initTheme() {
  const stored = localStorage.getItem('theme');
  const isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', isDark);

  const btn = document.getElementById('theme-toggle');
  btn.addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });
}

/* ---------- Typing Animation ---------- */
function initTyping() {
  const el = document.getElementById('typing-text');
  let phraseIdx = 0, charIdx = 0, deleting = false, pausing = false;

  function tick() {
    if (pausing) return;
    const phrase = TYPING_PHRASES[phraseIdx];

    if (deleting) {
      charIdx--;
      if (charIdx < 0) {
        charIdx = 0;
        deleting = false;
        phraseIdx = (phraseIdx + 1) % TYPING_PHRASES.length;
        setTimeout(tick, 400);
        return;
      }
    } else {
      charIdx++;
      if (charIdx > phrase.length) {
        pausing = true;
        setTimeout(() => { pausing = false; deleting = true; tick(); }, 1800);
        return;
      }
    }
    el.textContent = phrase.slice(0, charIdx);
    setTimeout(tick, deleting ? 40 : 75);
  }
  tick();
}

/* ---------- Mobile Nav ---------- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target))
      navLinks.classList.remove('open');
  });
}

/* ---------- Skill Bars ---------- */
function initSkillBars() {
  const cards = document.querySelectorAll('.skill-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.dataset.level;
        const fill = entry.target.querySelector('.skill-fill');
        const levelEl = entry.target.querySelector('.skill-level');
        const delay = parseInt(entry.target.dataset.index || 0) * 80;
        setTimeout(() => {
          fill.style.width = level + '%';
          if (levelEl) levelEl.textContent = level + '%';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  cards.forEach((card, i) => { card.dataset.index = i; observer.observe(card); });
}

/* ---------- Scroll Reveal ---------- */
function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => observer.observe(el));
}

/* ---------- Scroll Progress Bar ---------- */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = ((scrolled / max) * 100).toFixed(1) + '%';
  }, { passive: true });
}

/* ---------- Active Nav Link ---------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === '#' + id;
          link.style.color = isActive ? 'var(--primary)' : '';
          link.style.fontWeight = isActive ? '700' : '';
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-60px 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ---------- Resume Modal ---------- */
function initResumeModal() {
  const overlay = document.getElementById('resume-modal-overlay');
  if (!overlay) return;

  const triggers = document.querySelectorAll('[data-modal="resume"]');
  const closeBtn = overlay.querySelector('.modal-close');

  function openModal() { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  triggers.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
  closeBtn?.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

/* ---------- Animated Counters ---------- */
function initCounters() {
  const statValues = document.querySelectorAll('.stat-value[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const startTime = performance.now();
        function update(time) {
          const progress = Math.min((time - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statValues.forEach(el => observer.observe(el));
}

/* ---------- Navbar Shadow on Scroll ---------- */
function initNavScroll() {
  const nav = document.querySelector('.nav-bar');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10 ? '0 1px 20px rgba(0,0,0,0.1)' : '';
  }, { passive: true });
}

/* ---------- Year ---------- */
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTyping();
  initMobileNav();
  initSkillBars();
  initReveal();
  initScrollProgress();
  initActiveNav();
  initResumeModal();
  initCounters();
  initNavScroll();
  setYear();
});
