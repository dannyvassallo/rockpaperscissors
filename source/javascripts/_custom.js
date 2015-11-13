
// ******************** //
//       Scores         //
// ******************** //
var userScore = 0;
var enemyScore = 0;
var roundCounter = 0;
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
function userThrow(userInputClass){
	$(userInputClass).click(function(e){
		e.preventDefault();
		theThrow = $(this).attr("class");
		theThrow = theThrow.replace('button ', '');
		theThrow = theThrow.replace('control ', '');
		alert("USER THREW: "+theThrow);
	});
}

// ******************** //
//       User Input     //
// ******************** //
// This registers the users throw on click.
// It takes the users input on click and calls the previous
// user throw function
userThrow('.rock');
userThrow('.paper');
userThrow('.scissors');


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
function theBattle(theControls){
	$(theControls).click(function(){
		// Randomize An Index Number From "EnemyThrowStrings"
		var randomIndex = Math.floor(Math.random()*enemyThrowStrings.length);
		// Enemy's Throw
		enemyThrow = enemyThrowStrings[randomIndex];
		alert("ENEMY THREW: "+enemyThrow);
		// Tie
		if(theThrow == enemyThrow){
			alert('tied TIE GAME');
			roundCounter+=1;
			updateScores();
		}
		// User Throws Rock
		else if(theThrow == 'rock'){
			if(enemyThrow == 'scissors'){
				alert('rock beats scissors USER WINS');
				userScore+=1;
			} else if(enemyThrow == 'paper'){
				alert('paper covers rock USER LOSES');
				enemyScore+=1;
			}
			roundCounter+=1;
			updateScores();
		}
		// User Throws Scissors
		else if(theThrow == 'scissors'){
			if(enemyThrow == 'rock'){
				alert('rock beats scissors USER LOSES');
				userScore+=1;
			} else if(enemyThrow == 'paper'){
				alert('scissors cut paper USER WINS');
				enemyScore+=1;
			}
			roundCounter+=1;
			updateScores();
		}
		// User Throws Paper
		else if(theThrow == 'paper'){
			if(enemyThrow == 'rock'){
				alert('paper covers rock USER WINS');
				userScore+=1;
			} else if(enemyThrow == 'scissors'){
				alert('scissors cut paper USER LOSES');
				enemyScore+=1;
			}
			roundCounter+=1;
			updateScores();
		}		
	});
}

// Start the game
theBattle('.control');