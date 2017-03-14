'use strict';

//JavaScript that simulates a grid where hawks and doves interact

//an array that keeps track of the grid
var gridArray = [];

//how big we want our grid to be
var gridHeight = 10;
var gridWidth = 10;

//how long we want each turn to last (in ms)
var turnTime = 1000;

//when a bird is created, the probability that it will be a dove 
// probabilities go from 0 to 1 (0.5 is equivalent to 50%, 0.75 is 75%, etc)
var probabilityOfDoveSpawning = 0.5;

//generate the initial grid
generateGridArray();

//render the grid
renderGridArray();

//start the first turn
nextTick();


//this function starts each new turn
// the function will recursively call itself after a timeout
// this is what keeps the game going
function nextTick() {

	//mark all relevant birds for death
	killBirds();

	//we can update to GUI to show which were killed during this round
	// however this isn't worth doing if we have extremely short turns
	// since it will all happen too fast to be noticeable
	if (turnTime > 100) {
		//update the GUI so that we can see which birds are alive
		renderGridArray();
	}

	//halfway through the turn, we replace the birds with new one's
	setTimeout(function() {

		//replace all birds marked for death with new birds
		replaceBirds();

		//update the GUI
		renderGridArray();

		//we wait a bit and then start the next turn
		setTimeout(function() {
			nextTick();
		}, turnTime / 2);

	}, turnTime / 2);
}

//returns a string, either dove or hawk
function chooseBirdType() {

	//  50/50 chance of being a dove or a hawk
	if (Math.random() > probabilityOfDoveSpawning) {
		return 'hawk';
	} else {
		return 'dove';
	}
}

//loop through the grid, mark all the the appropriate birds as dead
function killBirds() {
	for (var i = 0; i < gridHeight; i++) {
		for (var j = 0; j < gridWidth; j++) {
			gridArray[i][j].isDead = determineLife(i, j, true);
		}
	}
}

//replace all the dead birds with new ones
function replaceBirds() {
	for (var i = 0; i < gridHeight; i++) {
		for (var j = 0; j < gridWidth; j++) {
			if (gridArray[i][j].isDead === true) {

				//give it a new randomly selected bird type
				gridArray[i][j].birdType = chooseBirdType();

				//bring the bird back to life!
				gridArray[i][j].isDead = false;

			}
		}
	}
}

//determines if bird lives or dies
function determineLife(x, y, first) {
	if (first === true) {
		first = false;
		var up = determineLife(x + 1, y, first);
		var down = determineLife(x - 1, y, first);
		var right = determineLife(x, y + 1, first);
		var left = determineLife(x, y - 1, first);

		if (up === true || down === true || right === true || left === true) {
			//dead
			return true;
		} else {
			//alive
			return false;
		}
	} else if (x < gridHeight && y < gridWidth && x !== -1 && y !== -1) {
		if (gridArray[x][y].birdType === 'hawk') {
			//encountering a hawk, we are dead
			return true;
		} else {
			//encountering a dove, we are alive (for now)
			return false;
		}
	} else {
		//nothing to this side, so we are alive
		return false;
	}
}

//this is called to initially populate the array with birds
function generateGridArray() {

	//clear the array
	gridArray = [];

	for (var i = 0; i < gridHeight; i++) {
		var row = [];
		for (var j = 0; j < gridWidth; j++) {

			//add an object representing the bird to the array
			row.push({
				birdType: chooseBirdType(), //decide if bird is hawk or a dove
				isDead: false //all birds start out alive
			});


		}
		gridArray.push(row);
	}
}

//this will update the GUI table
function renderGridArray() {
	//we build an HTML string containing the entire grid
	var newGridHtml = '';
	for (var i = 0; i < gridArray.length; i++) {
		newGridHtml += '<div class="row">';
		for (var j = 0; j < gridArray[i].length; j++) {

			//set the text for when we hover on a table cell
			var hoverText = gridArray[i][j].birdType + ' (' + i + ',' + j + ')';

			newGridHtml += '<a title="' + hoverText + '">' +
				'<img src="images/' + gridArray[i][j].birdType;

			if (gridArray[i][j].isDead === true) {
				//use the version of the image with an X through it
				newGridHtml += '_dead';
			}

			newGridHtml += '.png"></a>';

		}
		newGridHtml += '</div>';
	}

	//update the grid
	$('#grid').html(newGridHtml);
}


//code relating to the slider
var doveSlider = new Dragdealer('dove_slider', {
	x: probabilityOfDoveSpawning,
	animationCallback: function(x) {
		//update the probability of the the dove spawning
		probabilityOfDoveSpawning = x;
		$('#dove_slider .value').text(Math.round(x * 100));
	}
});



var timeSlider = new Dragdealer('time_slider', {
	x: (turnTime / 10000),
	animationCallback: function(x) {
		//update the time of each turn
		turnTime = x * 10000;
		$('#time_slider .value').text(Math.round(x * 100) / 10);
	}
});