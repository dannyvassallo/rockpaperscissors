
// ******************** //
//       Scores         //
// ******************** //
var userScore = 0;
var enemyScore = 0;
var roundCounter = 1;
var userWon;
var theThrow = '';
var enemyThrow = '';

// ******************** //
//    Enemy Components  //
// ******************** //
// Enemy Throw String Array
var enemyThrowStrings = [
	'rock',
	'paper',
	'scissors'
];


// ******************** //
//    User Components   //
// ******************** //
// This function takes the class from the user's
// clicked element and turns it into a string
// that the "Battle" function can understand
function userThrow(){
	theThrow = $(this).attr("class");
	theThrow = theThrow.replace('button ', '');
	theThrow = theThrow.replace('control ', '');
	theThrow = theThrow.replace(' animate', '');
	gameLogic();
	rpsAnimSeq();
}

// the rock paper scissors shoot animation
function rpsAnimSeq(){

	var animationClock = 0;
	$('.score').fadeIn(250).delay(300);
	$('.round-counter').fadeIn(450).delay(300);

	function clearClasses(){
		unbindControls();
		$('.animation-container .fa').removeClass('fa-hand-scissors-o').removeClass('fa-hand-rock-o').removeClass('fa-hand-paper-o').removeClass('fa-github-alt').removeClass('fa-smile-o').removeClass('fa-thumbs-up').removeClass('fa-hand-peace-o').removeClass('fa-gamepad');
	}
	function anim800(rps){
		var faIcon = 'fa-hand-'+rps+'-o';
		clearClasses();
		$('.animation-container .fa').addClass(faIcon);
		$('.animation-container .message').html(rps);
		$('.animation-container').fadeIn(250).delay(300).fadeOut(250);
	}
	function anim1500(faClass, message){
		clearClasses();
		$('.animation-container .fa').addClass(faClass);
		$('.animation-container .message').html(message);
		$('.animation-container').fadeIn(450).delay(600).fadeOut(450);
	}

	anim800('rock');
	window.setTimeout(function(){
		anim800('paper');
	}, animationClock+=900);
	window.setTimeout(function(){
		anim800('scissors');
	}, animationClock+=900);
	window.setTimeout(function(){
		anim1500('fa-smile-o', 'YOU SHOT:');
	}, animationClock+=900);
	window.setTimeout(function(){
		anim1500('fa-hand-'+theThrow+'-o', theThrow);
	}, animationClock+=1600);
	window.setTimeout(function(){
		anim1500('fa-github-alt', 'OCTO SHOT:');
	}, animationClock+=1600);
	window.setTimeout(function(){
		anim1500('fa-hand-'+enemyThrow+'-o', enemyThrow);
	}, animationClock+=1600);
	window.setTimeout(function(){
		updateScores();
		$('.score').delay(1150).fadeOut(450);
		$('.round-counter').delay(1150).fadeOut(450);
		if(gameStatus == 'win'){
			anim1500('fa-smile-o', 'YOU WIN!');
		} else if(gameStatus == 'lose'){
			anim1500('fa-github-alt', 'OCTO WINS!');
		} else if(gameStatus == 'tie'){
			anim1500('fa-hand-peace-o', 'TIE GAME!');
		}
	}, animationClock+=1600);
	window.setTimeout(function(){
		clearClasses();
		endGame();
		$('.animation-container .fa').addClass('fa-thumbs-up');
		$('.animation-container .message').html('ready round '+roundCounter);
		$('.animation-container').fadeIn(450).delay(600);
		window.setTimeout(function(){
			$('.round-counter .value').html(roundCounter);
			bindControls();
		}, 1150);
	}, animationClock+=1600);
}


// ******************** //
//    Game Logic   //
// ******************** //


// this function updates the user and enemy score on the page
function updateScores(){
	$('.user-score .score-value').html(userScore);
	$('.enemy-score .score-value').html(enemyScore);
}



// This takes a class applied to all user throw inputs
// and checks the user throw. The enemy's logic is also decided here.
function gameLogic(){
// Randomize An Index Number From "EnemyThrowStrings"
	var randomIndex = Math.floor(Math.random()*enemyThrowStrings.length);
	// Enemy's Throw
	enemyThrow = enemyThrowStrings[randomIndex];
	// Tie
	if(theThrow == enemyThrow){
		gameStatus = 'tie';
		roundCounter+=1;
	}
	// User Throws Rock
	else if(theThrow == 'rock'){
		if(enemyThrow == 'scissors'){
			gameStatus = 'win';
			userScore+=1;
		} else if(enemyThrow == 'paper'){
			gameStatus = 'lose';
			enemyScore+=1;
		}
		roundCounter+=1;
	}
	// User Throws Scissors
	else if(theThrow == 'scissors'){
		if(enemyThrow == 'rock'){
			gameStatus = 'lose';
			enemyScore+=1;
		} else if(enemyThrow == 'paper'){
			gameStatus = 'win';
			userScore+=1;
		}
		roundCounter+=1;
	}
	// User Throws Paper
	else if(theThrow == 'paper'){
		if(enemyThrow == 'rock'){
			gameStatus = 'win';
			userScore+=1;
		} else if(enemyThrow == 'scissors'){
			gameStatus = 'lose';
			enemyScore+=1;
		}
		roundCounter+=1;
	}
}

function bindAnimationClass(el){
	$(el).bind('mouseenter', function(){
		$(this).addClass('animate');
	});
	$(el).bind('mouseleave', function(){
		$(this).removeClass('animate');
	});
	$(el).bind('click', function(){
		$(this).removeClass('animate');
	});
}

function unbindAnimationClass(el){
	$(el).removeClass('animate');
	$(el).unbind('mouseenter');
	$(el).unbind('mouseleave');
	$(el).unbind('click');
}

// Bind and unbind controls
function bindControls(){
	$('.rock').bind('click', userThrow);
	$('.paper').bind('click', userThrow);
	$('.scissors').bind('click', userThrow);
	bindAnimationClass('.control');
}

function unbindControls(){
	$('.rock').unbind('click', userThrow);
	$('.paper').unbind('click', userThrow);
	$('.scissors').unbind('click', userThrow);
	unbindAnimationClass('.control');
}

function endGame(){
	if(roundCounter > 3){
		// set score for firebase
		$('#scoreInput').val(userScore);
		if(userScore > enemyScore){
			$('#winModal').modal('toggle');
			roundCounter = 1;
			userScore = 0;
			enemyScore = 0;
		} else if(userScore < enemyScore){
			$('#loseModal').modal('toggle');
			roundCounter = 1;
			userScore = 0;
			enemyScore = 0;
		} else {
			$('#tieModal').modal('toggle');
			roundCounter = 1;
			userScore = 0;
			enemyScore = 0;
		}
	}
}

$('.start').on('click', function(){
	bindControls();
	unbindAnimationClass('.start');
	$('.animation-container .fa').addClass('fa-thumbs-up');
	$('.animation-container .message').html('ready round '+roundCounter);
	$('.animation-container').fadeIn(450).delay(600);
});

bindAnimationClass('.start');
$('.blank-error').hide();
// Start leaderboard code

  var LEADERBOARD_SIZE = 5;

  // Create our Firebase reference
  var scoreListRef = new Firebase('https://rockpaperscissorsrcb.firebaseio.com');

  // Keep a mapping of firebase locations to HTML elements, so we can move / remove elements as necessary.
  var htmlForPath = {};

  // Helper function that takes a new score snapshot and adds an appropriate row to our leaderboard table.
  function handleScoreAdded(scoreSnapshot, prevScoreName) {
    var newScoreRow = $("<tr/>");
    newScoreRow.append($("<td/>").append($("<em/>").text(scoreSnapshot.val().name)));
    newScoreRow.append($("<td/>").text(scoreSnapshot.val().score));

    // Store a reference to the table row so we can get it again later.
    htmlForPath[scoreSnapshot.key()] = newScoreRow;

    // Insert the new score in the appropriate place in the table.
    if (prevScoreName === null) {
      $("#leaderboardTable").append(newScoreRow);
    }
    else {
      var lowerScoreRow = htmlForPath[prevScoreName];
      lowerScoreRow.before(newScoreRow);
    }
  }

  // Helper function to handle a score object being removed; just removes the corresponding table row.
  function handleScoreRemoved(scoreSnapshot) {
    var removedScoreRow = htmlForPath[scoreSnapshot.key()];
    removedScoreRow.remove();
    delete htmlForPath[scoreSnapshot.key()];
  }

  // Create a view to only receive callbacks for the last LEADERBOARD_SIZE scores
  var scoreListView = scoreListRef.limitToLast(LEADERBOARD_SIZE);

  // Add a callback to handle when a new score is added.
  scoreListView.on('child_added', function (newScoreSnapshot, prevScoreName) {
    handleScoreAdded(newScoreSnapshot, prevScoreName);
  });

  // Add a callback to handle when a score is removed
  scoreListView.on('child_removed', function (oldScoreSnapshot) {
    handleScoreRemoved(oldScoreSnapshot);
  });

  // Add a callback to handle when a score changes or moves positions.
  var changedCallback = function (scoreSnapshot, prevScoreName) {
    handleScoreRemoved(scoreSnapshot);
    handleScoreAdded(scoreSnapshot, prevScoreName);
  };
  scoreListView.on('child_moved', changedCallback);
  scoreListView.on('child_changed', changedCallback);

  // When the user presses enter on scoreInput, add the score, and update the highest score.
  $("#nameInput").keypress(function (e) {
    if (e.keyCode == 13) {
      if($("#nameInput").val().trim() != ""){
        var newScore = Number($("#scoreInput").val());
        var name = $("#nameInput").val();
        $('.blank-error').hide();
        $("#scoreInput").val("");

        if (name.length === 0)
          return;

        var userScoreRef = scoreListRef.child(name);
        $("#nameInput").val("");
        $("#winModal").modal('toggle');

        // Use setWithPriority to put the name / score in Firebase, and set the priority to be the score.
        userScoreRef.setWithPriority({ name:name, score:newScore }, newScore);
      } else {
        $('.blank-error').fadeIn();
      }
    }
  });
