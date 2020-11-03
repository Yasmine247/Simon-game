
//Random clicks

var buttonColours =["red", "blue", "green", "yellow"];

var userClickedPattern=[];

var gamePattern =[];

var started= false;

var level=0;


//$(document).keypress( function(event){

  //var key = event.key ;
  //console.log(key);})
 //if( (key == 'a')){

  $(document).keypress(function() {
    if (!started) {
  
      $("#level-title").text("Level "+ level);
      nextSequence();
      started = true;
    }
  });




 function nextSequence () {

  // we need to empty it to check if the user remembers the order
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+ level);
    
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
  $("#" + randomChosenColour).fadeOut(300).fadeIn(100).fadeOut(300).fadeIn(100);
  
  playSound (randomChosenColour);
  
}

//User clicks


$(".btn").click(function(){  

 var userChosenColour = $(this).attr("id");
 userClickedPattern.push(userChosenColour);
 animatePress(userChosenColour);
 playSound(userChosenColour);
 checkAnswer(userClickedPattern.length -1);
}); 


function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function animatePress(currentColour){
  
      $("#" + currentColour).addClass("pressed");
    
      setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);

}


function checkAnswer(curretLevel){

  
    if ( userClickedPattern[curretLevel] == gamePattern [curretLevel]) {
      console.log("sucess");
     
      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function ( ){nextSequence();},1000);
      }
    }
    else{
      console.log("wrong");
      playSound ("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }

}

function startOver(){
  started= false;
  var gamePattern =[];
  var level=0;

}