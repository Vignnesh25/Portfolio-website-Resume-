// =========================
// Typing Animation
// =========================

const words = [
  "AI Engineer",
  "Data Scientist",
  "Machine Learning Enthusiast",
  "Web Developer",
  "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typedText = document.getElementById("typed");

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typedText.textContent =
        currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typedText.textContent =
        currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        isDeleting ? 50 : 100
    );
}

typeEffect();


// =========================
// Dark Mode Toggle
// =========================

const themeButton =
document.getElementById("themeToggle");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (
        document.body.classList.contains("dark")
    ) {

        themeButton.innerHTML = "☀️";

    } else {

        themeButton.innerHTML = "🌙";
    }

});


// =========================
// Contact Form
// =========================

const form =
document.getElementById("contactForm");

const status =
document.getElementById("status");

form.addEventListener("submit", function(e){

    e.preventDefault();

    status.innerHTML =
    "✅ Thank you! Your message has been sent successfully.";

    status.style.color = "#4ade80";

    form.reset();

    setTimeout(() => {

        status.innerHTML = "";

    }, 5000);

});


// =========================
// Fade In Animation
// =========================

const cards =
document.querySelectorAll(".card");

const observer =
new IntersectionObserver(

(entries) => {

entries.forEach((entry) => {

if(entry.isIntersecting){

entry.target.style.opacity = "1";

entry.target.style.transform =
"translateY(0px)";

}

});

},

{
threshold:0.2
}

);

cards.forEach((card)=>{

card.style.opacity = "0";

card.style.transform =
"translateY(50px)";

card.style.transition =
"all 0.8s ease";

observer.observe(card);

});


// =========================
// Navbar Highlight
// =========================

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

const sectionTop =
section.offsetTop - 150;

if(
pageYOffset >= sectionTop
){
current = section.getAttribute("id");
}

});

navLinks.forEach(link => {

link.classList.remove("active");

if(
link.getAttribute("href")
=== "#" + current
){
link.classList.add("active");
}

});

});


// =========================
// Smooth Scroll Enhancement
// =========================

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

anchor.addEventListener("click",

function(e){

e.preventDefault();

document.querySelector(
this.getAttribute("href")
).scrollIntoView({

behavior:"smooth"

});

});

});


// =========================
// Welcome Message
// =========================

window.addEventListener("load", () => {

console.log(
"🚀 Portfolio Loaded Successfully!"
);

});


// =========================
// Current Year Footer
// =========================

const footer =
document.querySelector("footer p");

const year =
new Date().getFullYear();

footer.innerHTML =
`© ${year} Vignnesh Portfolio. All Rights Reserved.`;


// =========================
// Resume Button Effect
// =========================

const buttons =
document.querySelectorAll(".btn");

buttons.forEach(btn => {

btn.addEventListener("mouseenter", () => {

btn.style.transform =
"translateY(-4px) scale(1.03)";

});

btn.addEventListener("mouseleave", () => {

btn.style.transform =
"translateY(0px) scale(1)";

});

});
