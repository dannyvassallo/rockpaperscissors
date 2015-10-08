// Document Ready
$(function(){
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

});