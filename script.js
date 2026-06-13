const words = [
"AI Engineer",
"Data Scientist",
"ML Enthusiast",
"Web Developer"
];

let i = 0;
let j = 0;
let deleting = false;

function type(){

let current = words[i];

if(deleting){
document.getElementById("typed").textContent =
current.substring(0,j--);
}
else{
document.getElementById("typed").textContent =
current.substring(0,j++);
}

if(!deleting && j === current.length){
deleting = true;
setTimeout(type,1200);
return;
}

if(deleting && j === 0){
deleting = false;
i = (i + 1) % words.length;
}

setTimeout(type,deleting ? 50 : 100);
}

type();

document.getElementById("themeToggle")
.addEventListener("click",function(){

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
this.innerHTML="☀️";
}
else{
this.innerHTML="🌙";
}

});

document.getElementById("contactForm")
.addEventListener("submit",function(e){

e.preventDefault();

document.getElementById("status")
.innerHTML =
"✅ Message Sent Successfully!";

this.reset();

});
