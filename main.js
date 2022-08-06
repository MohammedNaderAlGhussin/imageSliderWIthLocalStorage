// Create An Array From The Images 
let arrayOfImages = Array.from(document.querySelectorAll(".silder-container img"));
// Get The Length Of The Image Array 
let lengthOfArray = arrayOfImages.length;
// Declare The Starting Number 
let currentNumber = 1;
// Check What Is The Last Bullet Number 
if(window.localStorage.getItem("storedNumber")){
    currentNumber = window.localStorage.getItem("storedNumber");
}
getLastBulletNumberToLS();
// Get The Slide Number Element 
let slideNumberElement = document.querySelector(".slide-number");
// Get The Two Buttons
let prevButton = document.querySelector(".prev");
let nextButton = document.querySelector(".next");

nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;


function nextSlide() {
    if(nextButton.classList.contains("disabled")){
        return false
    }else{ 
        currentNumber++;
    }
    theCheck();
}

function prevSlide(){
    if(prevButton.classList.contains("disabled")){
        return false
    }else{ 
        currentNumber--;
    }
    theCheck();
}

// Create The Main UL Bullts Contianer 
let bulltesContainer = document.createElement("ul");
bulltesContainer.id = "mai-ul";
// Create The Bulltes For The Bulltes Contianer
for(let i = 1 ; i <= lengthOfArray ; i++){
    // Create The Bullet
    let bullet = document.createElement("li");
    bullet.setAttribute("data-index",i);
    // Create The Bullet TextNode
    bullet.appendChild(document.createTextNode(i));
    // Append The Bulltes To The Container
    bulltesContainer.appendChild(bullet);
}
// Appned The Container To The Page 
document.querySelector(".indicators").appendChild(bulltesContainer);

// Create An Array From Bulltes 
let arrayOfBulltes = Array.from(document.querySelectorAll("#mai-ul li"));
//Loop Through All Bulltes Itmes 
for(let i = 0 ; i < arrayOfBulltes.length ; i++){
    arrayOfBulltes[i].onclick = function () {
        currentNumber = parseInt(this.getAttribute("data-index"));
        theCheck();
    }
}
// Calling The Check Fucntion
theCheck();

// Create THe Checker Function
function theCheck() {
    // Set The Slider Number Value
    slideNumberElement.textContent = `Slide #${currentNumber} from #${lengthOfArray}`;
    // Remove All Active Classes
    removeActiveClass();
    // Add Active Class To The First Image And First Bullet
    addActiveClassToFirstElment();
    // Add Disable Classes 
    addDisabledClass();
    // Add Current Number To Local Storage
    addLastBulletNumberToLS(currentNumber);
}

function removeActiveClass(){
    // Removing From Images
    arrayOfImages.forEach((img) => {
        img.classList.remove("active");
    });
    // Removing From Bulltes
    arrayOfBulltes.forEach((bullet) => {
        bullet.classList.remove("active");
    });
}
function addActiveClassToFirstElment() {
    // Set The Active Class For The First Img
    arrayOfImages[currentNumber - 1].classList.add("active");
    // Create An Array From Bulltes Then Adding The Active Class For the First Bullet
    arrayOfBulltes[currentNumber - 1].classList.add("active");
    // Add Disable Classes 
}
function addDisabledClass(){
    // prev Button
    if(currentNumber == 1){
        prevButton.classList.add("disabled");
    } else {
        prevButton.classList.remove("disabled");
    }
    // Next Button
    if(currentNumber == lengthOfArray){
        nextButton.classList.add("disabled");
    }else{
        nextButton.classList.remove("disabled");
    }
}
// Add Last Bullet Number To Local Storage 
function addLastBulletNumberToLS(currentNumber){
    window.localStorage.setItem("storedNumber",currentNumber);
}
// Get Last Bullet Number From Local Storage
function getLastBulletNumberToLS(){
    let data = window.localStorage.getItem("storedNumber");
    return data;
}