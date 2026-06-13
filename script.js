const words = [
  "AI Engineer",
  "Data Scientist",
  "Web Developer",
  "Machine Learning Enthusiast"
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {

    currentWord = words[i];

    if(isDeleting){
        document.getElementById("typed").textContent =
        currentWord.substring(0,j--);
    }
    else{
        document.getElementById("typed").textContent =
        currentWord.substring(0,j++);
    }

    if(!isDeleting && j === currentWord.length){
        isDeleting = true;
        setTimeout(type,1000);
        return;
    }

    if(isDeleting && j === 0){
        isDeleting = false;
        i = (i + 1) % words.length;
    }

    setTimeout(type,isDeleting ? 50 : 100);
}

type();

document.getElementById("themeToggle")
.addEventListener("click",function(){

    if(document.body.classList.contains("dark")){
        document.body.classList.remove("dark");
        this.innerHTML="🌙";
    }
    else{
        document.body.classList.add("dark");
        this.innerHTML="☀️";
    }

});

document.getElementById("contactForm")
.addEventListener("submit",function(e){

    e.preventDefault();

    document.getElementById("status").innerHTML =
    "Message sent successfully!";

    this.reset();
});
