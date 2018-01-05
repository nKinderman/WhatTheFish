//**** Variables ****//
numTiles = 6;
var randomFish;
var pickedFish;
var images = document.querySelectorAll(".fish");
var fishDisplay = document.querySelector("#fishName");
var statusDisplay = document.querySelector("#status");
var topSection = document.querySelector("#top");
var middleSection = document.querySelector("#middle");
var resetButton = document.querySelector("#reset");
var difficultyButtons = document.querySelectorAll(".difficulty");

//**** Functions & Event Listeners ****//
start();

// initialize main functions: setupTiles, setupFish, and reset
function start(){
  setupTiles();
  setupFish();
  reset();
}

// Setup the game board for easy(3), medium(6), & hard(9) difficulties
// The default is medium(6)
function setupTiles(){
  for(var i = 0; i < difficultyButtons.length; i++){
    difficultyButtons[i].addEventListener("click", function(){
      difficultyButtons[0].classList.remove("active"); // remove active class
      difficultyButtons[1].classList.remove("active"); // remove active class
      difficultyButtons[2].classList.remove("active"); // remove active class
      this.classList.add("active"); // add active class to current button

      // setup board for three tiles
      if(this.textContent === "Easy"){
        numTiles = 3;
        for(var i = 3; i < images.length; i++){
          images[i].src = ""; // remove image from img tag
          images[i].classList.remove("fish"); // remove fish class
          images[i].parentNode.classList.remove("tile"); // remove tile class
        }
      }

      // setup board for six tiles
      else if(this.textContent === "Medium"){
        numTiles = 6;
        for(var i = 6; i < images.length; i++){
          images[i].src = ""; // remove image from img tag
          images[i].classList.remove("fish"); // remove fish class
          images[i].parentNode.classList.remove("tile"); // remove tile class
        }
      }

      // setup board for 9 tiles
      else if(this.textContent === "Hard"){
        numTiles = 9;
      }
      reset();
    });
  }
}

// Setup the click listeners for each of the fish tiles
function setupFish(){
  for(var i = 0; i < images.length; i++){
    images[i].addEventListener("click", function(){
      var clickedFish = this.name;   // get name of clicked fish
      // compare name to pickedFish
      if(clickedFish === pickedFish){
        statusDisplay.textContent = "Huzzah!!"; // status success message
        statusDisplay.style.color = this.color; // status message color
        correctFish(this.src); // change all fish to correct fish
        topSection.style.background = this.color; // top section color
        resetButton.textContent = "Play again?"; // set reset button text
      }
      else{
      this.classList.add("opacity"); // set opacity of img to 0
      this.parentNode.classList.add("opacity"); // set opacity of rectangle to 0
      statusDisplay.textContent = "WTF?!"; // status fail message
      statusDisplay.style.color = "#a04863"; // status fail color
      }
    });
  }
}

// reset function for gameplay
function reset(){
  // generate new fish
  randomFish = generateRandomFish(numTiles);
  // pick a new random fish from array
  pickedFish = pickFish(randomFish[Math.floor(Math.random() * numTiles)]);
  // change top display to match picked fish
  fishDisplay.textContent = pickedFish + "?";
  // change fish in rectangles
  for(var i = 0; i < numTiles; i++){
    // add random fish to rectangles
    var x = randomFish[i];
    images[i].src = fish[x].source; // append image source address
    images[i].name = fish[x].name; // append image name
    images[i].color = fish[x].color; // append image color
    images[i].classList.remove("opacity"); // set opacity of img to 1
    images[i].parentNode.classList.remove("opacity"); // set opacity of img to 1
    images[i].parentNode.classList.add("tile"); // add tile to board
    images[i].classList.add("fish"); // add fish to board
  }
  topSection.style.background = "#778899"; // set top background
  middleSection.style.color = "#778899"; // section middle section color
  statusDisplay.textContent = ""; // empty status display
  resetButton.textContent = "Reset Fish"; // change reset button text
};

// click event for reset button
resetButton.addEventListener("click", function(){
  reset();
});

// set all fish tiles to the correct fish
function correctFish(image){
  // loop through rectangles
  for(var i = 0; i < numTiles; i++){
    // change each rectangle to match given image
    images[i].classList.remove("opacity");
    images[i].parentNode.classList.remove("opacity");
    images[i].src = image; // set img src
  }
}

// return picked fish name
function pickFish(number){
  return fish[number].name;
}

// generate distinct random numbers from fish array 
function generateRandomFish(length){
  var array = [];
  var n;
  for(var i = 0; i < length; i++)
  {
    // generate unique random numbers from 0 - length of fish array
    n = Math.floor(Math.random()* fish.length);
    while(array.indexOf(n) !== -1){
      n = Math.floor(Math.random()* fish.length);
    }
    // fill an array with unique random numbers
    array[i] = n;
  }
  return array;
}
