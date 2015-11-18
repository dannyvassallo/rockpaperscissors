
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
	gameLogic();
	rpsAnimSeq();
}

// the rock paper scissors shoot animation
function rpsAnimSeq(){
	function clearClasses(){
		$('.animation-container .fa').removeClass('fa-hand-scissors-o').removeClass('fa-hand-rock-o').removeClass('fa-hand-paper-o').removeClass('fa-github-alt').removeClass('fa-smile-o');
	}
	function anim(rps){
		// unbind controls during animation
		unbindControls();
		var faIcon = 'fa-hand-'+rps+'-o';
		clearClasses();
		$('.animation-container .fa').addClass(faIcon);
		$('.animation-container .message').html(rps);
		$('.animation-container').fadeIn(600).delay(200).fadeOut(600);	
	}	
	anim('rock');
	window.setTimeout(function(){
		anim('paper');
	}, 1400);
	window.setTimeout(function(){		
		anim('scissors');
	}, 2800);
	window.setTimeout(function(){		
		clearClasses();
		$('.animation-container .fa').addClass('fa-smile-o');
		$('.animation-container .message').html("YOU SHOT:");
		$('.animation-container').fadeIn(600).delay(200).fadeOut(600);	
	}, 4200);	
	window.setTimeout(function(){		
		anim(theThrow);
	}, 5600);	
	window.setTimeout(function(){		
		clearClasses();
		$('.animation-container .fa').addClass('fa-github-alt');
		$('.animation-container .message').html("OCTO SHOT:");
		$('.animation-container').fadeIn(600).delay(200).fadeOut(600);	
	}, 7000);	
	window.setTimeout(function(){		
		anim(enemyThrow);
	}, 8400);
	window.setTimeout(function(){
		if(gameStatus == 'win'){
			clearClasses();
			$('.animation-container .fa').addClass('fa-smile-o');
			$('.animation-container .message').html("YOU WIN!");
			$('.animation-container').fadeIn(600).delay(400).fadeOut(600);	
		} else if(gameStatus == 'lose'){
			clearClasses();
			$('.animation-container .fa').addClass('fa-github-alt');
			$('.animation-container .message').html("OCTO WINS!");
			$('.animation-container').fadeIn(600).delay(400).fadeOut(600);	
		} else if(gameStatus == 'tie'){
			clearClasses();
			$('.animation-container .fa').addClass('fa-github-alt');
			$('.animation-container .message').html("TIE GAME!");
			$('.animation-container').fadeIn(600).delay(400).fadeOut(600);				
		}
	}, 10000);	
	window.setTimeout(function(){
		// re-enable controls and update scores
		updateScores();
		bindControls();			
	}, 10000);
}


// ******************** //
//    Game Logic   //
// ******************** //


// this function updates the user and enemy score on the page
function updateScores(){
	$('.user-score .score-value').html(userScore);
	$('.enemy-score .score-value').html(enemyScore);
	$('.round-counter .value').html(roundCounter);
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
			userScore+=1;
		} else if(enemyThrow == 'paper'){	
			gameStatus = 'win';
			enemyScore+=1;
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

function bindControls(){
	$('.rock').bind('click', userThrow);
	$('.paper').bind('click', userThrow);
	$('.scissors').bind('click', userThrow);
}

function unbindControls(){
	$('.rock').unbind('click', userThrow);
	$('.paper').unbind('click', userThrow);
	$('.scissors').unbind('click', userThrow);
}

bindControls();