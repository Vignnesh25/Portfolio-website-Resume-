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
/* ============================================================
   13. RESUME DOWNLOAD GENERATOR
   Generates a professional resume PDF using browser print
   ============================================================ */

function downloadResume(e) {
  e.preventDefault();

  // Create a hidden iframe with resume content
  const resumeHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <title>Vignnesh - Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 13px;
          color: #1a1a2e;
          background: #fff;
          padding: 0;
        }

        /* ---- Header ---- */
        .header {
          background: linear-gradient(135deg, #7c6af7, #06d6a0);
          color: #fff;
          padding: 32px 40px 28px;
        }
        .header h1 {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 4px;
        }
        .header .role {
          font-size: 14px;
          opacity: 0.92;
          font-weight: 500;
          margin-bottom: 14px;
          letter-spacing: 0.3px;
        }
        .contact-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 20px;
          font-size: 12px;
          opacity: 0.93;
        }
        .contact-row span { display: flex; align-items: center; gap: 5px; }

        /* ---- Body Layout ---- */
        .body {
          display: grid;
          grid-template-columns: 1fr 2fr;
          min-height: calc(100vh - 130px);
        }

        /* ---- Sidebar ---- */
        .sidebar {
          background: #f4f5ff;
          padding: 28px 24px;
          border-right: 2px solid #e0e1f5;
        }

        /* ---- Main ---- */
        .main {
          padding: 28px 36px;
          background: #fff;
        }

        /* ---- Section Titles ---- */
        .section-title {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #7c6af7;
          border-bottom: 2px solid #7c6af7;
          padding-bottom: 4px;
          margin-bottom: 14px;
          margin-top: 22px;
        }
        .section-title:first-child { margin-top: 0; }

        /* ---- Skills ---- */
        .skill-group { margin-bottom: 12px; }
        .skill-group h4 {
          font-size: 11px; font-weight: 700;
          color: #4a4b6e; margin-bottom: 6px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .skill-tag {
          background: #7c6af7;
          color: #fff;
          font-size: 10px; font-weight: 600;
          padding: 3px 9px; border-radius: 100px;
        }
        .skill-tag.green  { background: #06d6a0; }
        .skill-tag.orange { background: #ff8c42; }

        /* ---- Info items ---- */
        .info-item { margin-bottom: 10px; }
        .info-item .label {
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.5px;
          color: #8889a8; margin-bottom: 2px;
        }
        .info-item .value { font-size: 12px; font-weight: 600; color: #14152b; }

        /* ---- Certifications ---- */
        .cert-item { margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #7c6af7; }
        .cert-item h4 { font-size: 12px; font-weight: 700; color: #14152b; }
        .cert-item p  { font-size: 11px; color: #8889a8; }
        .cert-item span { font-size: 10px; color: #06d6a0; font-weight: 600; }

        /* ---- Experience/Project entries ---- */
        .entry { margin-bottom: 20px; }
        .entry-header {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 4px;
        }
        .entry h3 { font-size: 14px; font-weight: 700; color: #14152b; }
        .entry .meta {
          font-size: 11px; color: #7c6af7;
          font-weight: 600; white-space: nowrap;
        }
        .entry .sub {
          font-size: 12px; color: #4a4b6e;
          font-weight: 500; margin-bottom: 6px;
        }
        .entry ul { padding-left: 16px; }
        .entry ul li {
          font-size: 12px; color: #4a4b6e;
          margin-bottom: 3px; line-height: 1.5;
        }
        .entry ul li::marker { color: #7c6af7; }
        .tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
        .tag {
          background: rgba(124,106,247,0.1);
          color: #7c6af7; font-size: 10px;
          font-weight: 600; padding: 2px 8px;
          border-radius: 100px;
        }

        /* ---- Objective ---- */
        .objective {
          background: linear-gradient(135deg, rgba(124,106,247,0.08), rgba(6,214,160,0.05));
          border-left: 3px solid #7c6af7;
          padding: 12px 16px; border-radius: 0 8px 8px 0;
          font-size: 12.5px; color: #4a4b6e; line-height: 1.7;
          margin-bottom: 20px;
        }

        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      </style>
    </head>
    <body>

      <!-- HEADER -->
      <div class="header">
        <h1>Vignnesh</h1>
        <div class="role">AI & Data Science Engineering Student | Age: 19</div>
        <div class="contact-row">
          <span>📧 vignnesh@example.com</span>
          <span>🔗 linkedin.com/in/vignnesh</span>
          <span>💻 github.com/vignnesh</span>
          <span>📍 India</span>
        </div>
      </div>

      <!-- BODY -->
      <div class="body">

        <!-- SIDEBAR -->
        <div class="sidebar">

          <!-- Personal Info -->
          <div class="section-title">Personal Info</div>
          <div class="info-item">
            <div class="label">Age</div>
            <div class="value">19 Years Old</div>
          </div>
          <div class="info-item">
            <div class="label">Degree</div>
            <div class="value">B.E. — AI & Data Science</div>
          </div>
          <div class="info-item">
            <div class="label">Year</div>
            <div class="value">2nd Year (2023–2027)</div>
          </div>
          <div class="info-item">
            <div class="label">Languages</div>
            <div class="value">English, Tamil</div>
          </div>
          <div class="info-item">
            <div class="label">Available For</div>
            <div class="value">Internships & Projects</div>
          </div>

          <!-- Skills -->
          <div class="section-title">Programming</div>
          <div class="skill-group">
            <div class="skill-tags">
              <span class="skill-tag">Python</span>
              <span class="skill-tag">C</span>
              <span class="skill-tag">Java</span>
              <span class="skill-tag">HTML5</span>
              <span class="skill-tag">CSS3</span>
              <span class="skill-tag">JavaScript</span>
            </div>
          </div>

          <div class="section-title">AI / ML</div>
          <div class="skill-group">
            <div class="skill-tags">
              <span class="skill-tag green">Machine Learning</span>
              <span class="skill-tag green">Data Science</span>
              <span class="skill-tag green">Neural Networks</span>
              <span class="skill-tag green">NumPy</span>
              <span class="skill-tag green">Pandas</span>
              <span class="skill-tag green">Scikit-learn</span>
            </div>
          </div>

          <div class="section-title">IoT & Tools</div>
          <div class="skill-group">
            <div class="skill-tags">
              <span class="skill-tag orange">IoT</span>
              <span class="skill-tag orange">RFID</span>
              <span class="skill-tag orange">Arduino</span>
              <span class="skill-tag orange">Embedded C</span>
              <span class="skill-tag orange">Git</span>
              <span class="skill-tag orange">VS Code</span>
            </div>
          </div>

          <!-- Certifications -->
          <div class="section-title">Certifications</div>

          <div class="cert-item">
            <h4>Python for Data Science</h4>
            <p>NPTEL / Coursera</p>
            <span>2024</span>
          </div>
          <div class="cert-item">
            <h4>Machine Learning Fundamentals</h4>
            <p>Google / Coursera</p>
