
// ******************** //
//    Player Scores     //
// ******************** //
var userScore = 0;
var enemyScore = 0;
var theThrow = '';

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
		console.log(theThrow);
	});
}

// ******************** //
//    Game Logic   //
// ******************** //
function theBattle(theControls){
	$(theControls).click(function(){
		// Randomize An Index Number From "EnemyThrowStrings"
		var randomIndex = Math.floor(Math.random()*enemyThrowStrings.length);
		var enemyThrow = enemyThrowStrings[randomIndex];
		console.log(enemyThrow);
		if(theThrow == enemyThrow){
			console.log('tied');
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