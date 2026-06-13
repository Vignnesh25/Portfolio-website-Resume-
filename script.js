/* ============================================================
   VIGNNESH PORTFOLIO — script.js
   Theme Toggle, Typing Animation, Scroll Reveal,
   Skill Bars, Counter Animation, Navbar, Contact Form
   ============================================================ */

'use strict';

/* ---- Theme Toggle ---- */
const html        = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* ---- Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- Active Nav Link on Scroll ---- */
const sections   = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { passive: true });

/* ---- Typing Animation ---- */
const typingEl = document.getElementById('typingText');
const phrases  = [
  'AI & Data Science Student',
  'Future Software Engineer',
  'Tech Enthusiast',
  'IoT Builder',
  'ML Explorer'
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
let typingTimer;

function typeEffect() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typingEl.textContent = current.slice(0, --charIndex);
  } else {
    typingEl.textContent = current.slice(0, ++charIndex);
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  typingTimer = setTimeout(typeEffect, speed);
}

typeEffect();

/* ---- Scroll Reveal ---- */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling elements
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ---- Skill Bar Animation ---- */
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pct = entry.target.getAttribute('data-pct');
      entry.target.style.width = pct + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(bar => barObserver.observe(bar));

/* ---- Counter Animation (About Stats) ---- */
const counters = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute('data-target');
      let current = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          entry.target.textContent = target + '+';
          clearInterval(timer);
        } else {
          entry.target.textContent = current;
        }
      }, 50);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ---- Back To Top Button ---- */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Footer Year ---- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---- Contact Form ---- */
function handleFormSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const message = document.getElementById('fmessage').value.trim();
  const note    = document.getElementById('formNote');

  if (!name || !email || !subject || !message) {
    note.textContent = '⚠️ Please fill in all fields.';
    note.style.color = 'var(--accent-orange)';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    note.textContent = '⚠️ Please enter a valid email address.';
    note.style.color = 'var(--accent-orange)';
    return;
  }

  // Simulate sending (replace with EmailJS / Formspree in production)
  note.textContent = '✅ Message sent! I\'ll get back to you soon.';
  note.style.color = 'var(--accent-secondary)';

  document.getElementById('fname').value    = '';
  document.getElementById('femail').value   = '';
  document.getElementById('fsubject').value = '';
  document.getElementById('fmessage').value = '';

  setTimeout(() => { note.textContent = ''; }, 5000);
}

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});