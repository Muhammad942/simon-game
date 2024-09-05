/*let bt =  $("."+event.currentTarget.id);      
  bt.classList.add("pressed");
  setTimeout(() => {
    bt.classList.remove("pressed");
  }, 100);*/ 
  
  /*function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }*/

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

// Start the game on keypress
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Handle button clicks
$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour); // Play sound for the button
  animatePress(userChosenColour); // Animate the button press

  checkAnswer(userClickedPattern.length - 1); // Check the user's answer
});

// Generate the next sequence
function nextSequence() {
  userClickedPattern = []; // Reset the user pattern for the new level
  level++;
  $("#level-title").text("Level " + level); // Update the level title

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); // Add the new color to the game pattern

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // Flash the button
  playSound(randomChosenColour); // Play sound for the flashed button
}

// Play sound function
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate button press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Check user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the user gets the current level right
    if (userClickedPattern.length === gamePattern.length) {
      // Check if the user finished their sequence
      setTimeout(function() {
        nextSequence(); // Move to the next sequence after a short delay
      }, 1000);
    }
  } else {
    // If the user gets it wrong
    playSound("wrong"); // Play the wrong sound
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); // Restart the game
  }
}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
