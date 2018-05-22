$(document).ready(function() {
  // Global variables
   var bgSound =  new Audio("assets/audio/bg.mp3");
   var play = false;
   var targetNumber;
   var numberOfCrystals = 4;
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
    var playAgn = true;

    // playMusic();
    generateTargetNumber();
    generateRandomNumbers();
    assignPointToCrystals();
    crystals.on("click", ".crystal-image", scoreFunction);


   $("#btn-sound").click(function(){
       if(play === true){
            $("#sound").attr("src", "assets/images/icons8_No_Audio_40px.png");
            console.log("vol down");
            play = false;
            bgSound.pause();
       }
       else{
           playMusic();
           $("#sound").attr("src", "assets/images/icons8_Speaker_40px.png");
           play = true;
       }
       
   });


   function playMusic(){
     console.log("play");
      bgSound.loop = true;
      bgSound.play();
   }
    
   function generateTargetNumber(){
     // Math.floor(Math.random() * (max - min + 1) ) + min;
     targetNumber = Math.floor(Math.random() * (120-19+1))+19;  
     console.log(targetNumber);
     $("#targetNumber").html(targetNumber);
    }  

    function generateRandomNumbers(){
        points=[];
        for(var i=0; i < numberOfCrystals;){
          point = Math.floor(Math.random() * 12)+1;
          if(points.indexOf(point) === -1){
            points.push(point);
            console.log(point +" unique");
            i++;
          }
          else{
            console.log(point +" not unique");
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
        if(playAgn=== true){
          if(play!== false){
              var clickSound = new Audio("assets/audio/correct.wav");
              clickSound.play();
          }
          var crystalValue = ($(this).attr("data-crystalvalue"));
          crystalValue = parseInt(crystalValue);
          score +=crystalValue;   
          if(score === targetNumber){
              if(play!==false){
                var winSound = new Audio("assets/audio/win.wav");
                winSound.play();
              }
              win++;
              $("#win").html(win);
              $("#msg").show();
              $("#msg").html("You won!!");
              flyBalloon();
          }
          else if(score > targetNumber){
            if(play!==false){
                var lossSound = new Audio("assets/audio/lost.wav");
                lossSound.play();
            }
            loss++;
            $("#loss").html(loss);
            $("#msg").show();
            $("#msg").html("You lost :( ");
          }

          $("#score").html(score);
         
          if(score>=targetNumber){
            playAgn = false;
            playAgain();
            
          }   
        }
    }

    function playAgain(){
      $("#btn-play").show();
      $("#btn-play").click(function(){
           playAgn = true;
           $(this).hide();
           $("#msg").hide();
           console.log("play again");
           generateTargetNumber();
           generateRandomNumbers();
           $( ".crystal-image" ).remove();
           assignPointToCrystals();
           score = 0;
           $("#score").html(score);
      });
    }

    function flyBalloon(){
        $("#winBalloon").attr("src", "assets/images/win.gif");
        $("#winBalloon").show();
        $("#winBalloon").css("bottom","0px");
        $("#winBalloon").animate({bottom: '+=1000px'},3000);
        $("#winBalloon").fadeOut();
    }
 



})