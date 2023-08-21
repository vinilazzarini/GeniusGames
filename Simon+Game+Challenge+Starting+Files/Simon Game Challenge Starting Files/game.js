const buttonColors = [
    'red',
    'blue',
    'green',
    'yellow'
];

var userClickedPattern = [];
var gamePattern = [];
var started = false;

function animatedPress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(()=> {
        $("#" + currentColour).removeClass("pressed");
     }
     ,100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function nextSequence(){
    
    userClickedPattern = [];
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors[randomNumber];
    
    level++;    
    $("h1").text("Level " + level);

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

$(".btn").click(function (){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatedPress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success"); 
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
  
    }else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=> {
            $("body").removeClass("game-over");
         }
         ,200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

var level = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});
