$(document).ready(function() {
  // Global variables
   var bgSound =  new Audio("assets/audio/bg.mp3");

  //  music play flag..initially no music will be played 
   var play = false;

   var targetNumber;

   var numberOfCrystals = 4;

  //  array with image names
   var imageArray=["crystal1.gif",
                    "crystal2.gif",
                    "crystal3.gif",
                    "crystal4.gif"];

    var points = [];
    var point;
    var win =0;
    var loss = 0;
    var score = 0;
    var crystals = $("#crystals");

    // flag for play again button
    var playAgn = true;

    // background music on or off
    turnMusicOnOff();

    // generate the target number
    generateTargetNumber();
    // generate random numbers for each crystal
    generateRandomNumbers();
    // assign generated random numbers to crystals
    assignPointToCrystals();
    // scoring when crystal is clicked
    crystals.on("click", ".crystal-image", scoreFunction);

   
  
 
   function generateTargetNumber(){
     // Math.floor(Math.random() * (max - min + 1) ) + min; -> 19 to 120
     targetNumber = Math.floor(Math.random() * 102)+19;  
     $("#targetNumber").html(targetNumber);
    }  

    function generateRandomNumbers(){
        points=[];
        for(var i=0; i < numberOfCrystals;){
          // rand between 1 to 12 inclusve
          point = Math.floor(Math.random() * 12)+1;
          // unique random number will be assigned to each crystal
          if(points.indexOf(point) === -1){
            points.push(point);
            // console.log(point +" unique");
            i++;
          } 
      }
    }

    function assignPointToCrystals(){
        for(var i =0; i<points.length;i++){
            // For each iteration, we will create an imageCrystal
            var imageCrystal = $("<img>");
  
            // First each crystal will be given the class ".crystal-image".
            // This will allow the CSS to take effect.
            imageCrystal.addClass("img-fluid crystal-image");
  
            // Each imageCrystal will be given a src link to the crystal image
            imageCrystal.attr("src", "assets/images/"+imageArray[i]);
  
            // Each imageCrystal will be given a data attribute called data-crystalValue.
            // This data attribute will be set equal to the array value.
            imageCrystal.attr("data-crystalvalue", points[i]);
            console.log("p:"+points[i]);
  
            // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
            crystals.append(imageCrystal);
         }
      }

      function scoreFunction() {
        // user plays again or playing for the first time
        if(playAgn === true){
          // if music is turned on
          if(play=== true){
              var clickSound = new Audio("assets/audio/correct.wav");
              clickSound.play();
          }
         // add clicked crystal value to score
          var crystalValue = ($(this).attr("data-crystalvalue"));
          crystalValue = parseInt(crystalValue);
          score +=crystalValue;   

          // win 
          if(score === targetNumber){
              // if music is not mute
              if(play===true){
                var winSound = new Audio("assets/audio/win.wav");
                winSound.play();
              }
              win++;
              $("#win").html(win);
              $("#msg").show();
              $("#msg").html("You won!!");
              flyBalloon();
          }
          // loss
          else if(score > targetNumber){
            if(play===true){
                var lossSound = new Audio("assets/audio/lost.wav");
                lossSound.play();
            }
            loss++;
            $("#loss").html(loss);
            $("#msg").show();
            $("#msg").html("You lost :( ");
          }

          $("#score").html(score);

          // show play again button
          if(score>=targetNumber){
            playAgn = false;
            playAgain();
            
          }   
        }
    }

    function playAgain(){
      $("#btn-play").show();
      // if button clicked
      $("#btn-play").click(function(){
           playAgn = true;
           $(this).hide();
           $("#msg").hide();
         
           generateTargetNumber();
           generateRandomNumbers();
           $( ".crystal-image" ).remove();
           assignPointToCrystals();
           score = 0;
           $("#score").html(score);
      });
    }

    // winning balloons
    function flyBalloon(){
        $("#winBalloon").attr("src", "assets/images/win.gif");
        $("#winBalloon").show();
        $("#winBalloon").css("bottom","0px");
        $("#winBalloon").animate({bottom: '+=1000px'},3000);
        $("#winBalloon").fadeOut();
    }

    function turnMusicOnOff(){
      $("#btn-sound").click(function(){
        if(play === true){
             $("#sound").attr("src", "assets/images/icons8_No_Audio_40px.png");
             play = false;
             bgSound.pause();
        }
        else{
            playMusic();
            $("#sound").attr("src", "assets/images/icons8_Speaker_40px.png");
            play = true;
        }
        
    });
  }

  function playMusic(){
     bgSound.loop = true;
     bgSound.play();
  }
 



})