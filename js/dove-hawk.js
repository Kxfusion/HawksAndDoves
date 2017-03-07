//javascript that simulates a grid where hawkes and doves interact

//an array that keeps track of the grid
var gridArray = [];

//how big we want our grid to be
var gridHeight = 10;
var gridWidth = 10;

//generate the initial grid
generateGridArray();

//render the grid
renderGridArray()

//every 5 seconds, start a new turn
setInterval(function() {
	nextTick();
}, 10000);

//updates the grid
function nextTick() {

	//mark all relevant birds for death
	killBirds();

	//update the GUI so that we can see which birds are alive
	renderGridArray()

	//five seconds later we replace the birds with new one's
	setTimeout(function() {

		//replace all birds marked for death with new birds
		replaceBirds();

		//update the GUI
		renderGridArray();
	}, 5000)
}

//returns a string, either dove or hawk
function chooseBirdType() {

	//  50/50 chance of being a dove or a hawk
	if (Math.floor(Math.random() * 2) == 1) {
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
			if (gridArray[i][j].isDead == true) {

				gridArray[i][j].birdType = chooseBirdType(); //give it a new randomly selected bird type
				gridArray[i][j].isDead = false; //bring the bird back to life!

			}
		}
	}
}

//determines if bird lives or dies
function determineLife(x, y, first) {
	if (first == true) {
		first = false;
		var up = determineLife(x + 1, y, first);
		var down = determineLife(x - 1, y, first);
		var right = determineLife(x, y + 1, first);
		var left = determineLife(x, y - 1, first);

		if (up == true || down == true || right == true || left == true) {
			//dead
			return true;
		} else {
			//alive
			return false;
		}
	} else if (x < gridHeight && y < gridWidth && x != -1 && y != -1) {
		if (gridArray[x][y].birdType == 'hawk') {
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
				birdType: chooseBirdType(), //flip a coin, decide if bird is hawk or a dove
				isDead: false //all birds start out alive
			});


		}
		gridArray.push(row);
	}
}

//this will update the GUI table
function renderGridArray() {
	//we build an html string
	var newGridHtml = '';
	for (var i = 0; i < gridArray.length; i++) {
		newGridHtml += '<div class="row">';
		for (var j = 0; j < gridArray[i].length; j++) {

			//set the text for when we hover on a table cell
			var hoverText = gridArray[i][j].birdType + " (" + i + "," + j + ")";

			newGridHtml += '<a title="' + hoverText + '"><img src="images/' + gridArray[i][j].birdType;

			if (gridArray[i][j].isDead == true) {
				newGridHtml += "_dead";//use the version of the image with an X through it
			}

			newGridHtml += '.png"></a>';

		}
		newGridHtml += '</div>';
	}
	$('#grid').html(newGridHtml);
}