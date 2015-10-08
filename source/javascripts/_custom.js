
// ******************** //
//    Player Scores     //
// ******************** //
var userScore = 0;
var enemyScore = 0;


// ******************** //
//    Enemy Components  //
// ******************** //


// Enemy Throw String Array
var enemyThrowStrings = [
    'rock',
    'paper',
    'scissors'
];

// Randomize An Index Number From "EnemyThrowStrings"
var randomIndex = Math.floor(Math.random()*enemyThrowStrings.length);
console.log(enemyThrowStrings[randomIndex]);


// ******************** //
//    User Components   //
// ******************** //
function userThrow(userInputClass){
	$(userInputClass).click(function(e){
		e.preventDefault();
		var theThrow = $(this).attr("class");
		console.log(theThrow);
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
});