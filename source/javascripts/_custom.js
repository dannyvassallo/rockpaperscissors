
// ******************** //
//    Player Scores     //
// ******************** //
var userScore = 0;
var enemyScore = 0;
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
function userThrow(userInputClass){
	$(userInputClass).click(function(e){
		e.preventDefault();
		theThrow = $(this).attr("class");
		console.log("USER THREW: "+theThrow);
	});
}

// ******************** //
//    Game Logic   //
// ******************** //
function theBattle(theControls){
	$(theControls).click(function(){
		// Randomize An Index Number From "EnemyThrowStrings"
		var randomIndex = Math.floor(Math.random()*enemyThrowStrings.length);
		// Enemy's Throw
		enemyThrow = enemyThrowStrings[randomIndex];
		console.log("ENEMY THREW: "+enemyThrow);
		// Tie
		if(theThrow == enemyThrow){
			console.log('tied TIE GAME');
		}
		// User Throws Rock
		else if(theThrow == 'rock'){
			if(enemyThrow == 'scissors'){
				console.log('rock beats scissors USER WINS');
			} else if(enemyThrow == 'paper'){
				console.log('paper covers rock USER LOSES');
			}
		}
		// User Throws Scissors
		else if(theThrow == 'scissors'){
			if(enemyThrow == 'rock'){
				console.log('rock beats scissors USER LOSES');
			} else if(enemyThrow == 'paper'){
				console.log('scissors cut paper USER WINS');
			}
		}
		// User Throws Paper
		else if(theThrow == 'paper'){
			if(enemyThrow == 'rock'){
				console.log('paper covers rock USER WINS');
			} else if(enemyThrow == 'scissors'){
				console.log('scissors cut paper USER LOSES');
			}
		}		
	});
}


// ******************** //
// ******************** //
//   Document Ready     //
// ******************** //
// ******************** //


$(function(){
	// ******************** //
	//       User Input     //
	// ******************** //
	userThrow('.rock');
	userThrow('.paper');
	userThrow('.scissors');
	theBattle('#controls a');
});