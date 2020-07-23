const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;
let started = false;
let correct = true;

function resetGame() {
  level = 0;
  started = false;
  correct = true;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
}

$(document).keypress(function () {
  if (!started) {
    setTimeout(nextSquence, 150);
    started = true;
  }
});

function nextSquence() {
  level++;
  $("#level-title").text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  userClickedPattern.length = 0;
  $(`.row div#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColour) {
  $(`.row div#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`.row div#${currentColour}`).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

$(`.row div`).click(function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkUserClick();
});

function checkUserClick() {
  for (let i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      correct = false;
    }
  }
  if (correct === true) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSquence, 1000);
    }
  } else {
    resetGame();
    $("body").css("background-color", "red");
    playSound("wrong");
    $("#level-title").text(`Game Over, Press Any Key to Restart`);
    setTimeout(function () {
      $("body").css("background-color", "#011F3F");
    }, 200);
  }
}
