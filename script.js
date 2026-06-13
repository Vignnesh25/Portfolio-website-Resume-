const phrases = [
  "AI & Data Science Student",
  "Future Software Engineer",
  "Tech Enthusiast"
];

const typedEl = document.getElementById("typed");

let pIdx = 0;
let cIdx = 0;
let deleting = false;

function type() {
  const current = phrases[pIdx];

  if (deleting) {
    cIdx--;
    typedEl.textContent = current.substring(0, cIdx);

    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }

    setTimeout(type, 40);

  } else {

    cIdx++;
    typedEl.textContent = current.substring(0, cIdx);

    if (cIdx === current.length) {
      deleting = true;
      setTimeout(type, 1500);
      return;
    }

    setTimeout(type, 80);
  }
}

type();

const themeBtn = document.getElementById("themeToggle");

const savedTheme =
  localStorage.getItem("theme") || "light";

document.documentElement.setAttribute(
  "data-theme",
  savedTheme
);

themeBtn.textContent =
  savedTheme === "dark" ? "☀️" : "🌙";

themeBtn.addEventListener("click", () => {

  const next =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";

  document.documentElement.setAttribute(
    "data-theme",
    next
  );

  localStorage.setItem("theme", next);

  themeBtn.textContent =
    next === "dark" ? "☀️" : "🌙";
});

document.getElementById("year").textContent =
  new Date().getFullYear();
