const words = [
"AI & Data Science Student",
"Machine Learning Enthusiast",
"Future Software Engineer",
"IoT Developer",
"Web Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingText =
document.getElementById("typing-text");

function typeEffect(){

const currentWord =
words[wordIndex];

if(!isDeleting){

typingText.textContent =
currentWord.substring(0,charIndex+1);

charIndex++;

if(charIndex === currentWord.length){
isDeleting = true;
setTimeout(typeEffect,1500);
return;
}

}
else{

typingText.textContent =
currentWord.substring(0,charIndex-1);

charIndex--;

if(charIndex === 0){
isDeleting = false;
wordIndex =
(wordIndex+1)%words.length;
}
}

setTimeout(typeEffect,
isDeleting ? 50 : 100);

}

typeEffect();

const counters =
document.querySelectorAll(".counter");

counters.forEach(counter=>{

counter.innerText="0";

const updateCounter=()=>{

const target=
+counter.getAttribute("data-target");

const count=
+counter.innerText;

const increment=
target/100;

if(count<target){

counter.innerText=
`${Math.ceil(count+increment)}`;

setTimeout(updateCounter,20);

}
else{

counter.innerText=target;

}

};

updateCounter();

});

document.querySelector(".contact-form")
.addEventListener("submit",function(e){

e.preventDefault();

alert(
"Thank you! Your message has been received."
);

this.reset();

});
