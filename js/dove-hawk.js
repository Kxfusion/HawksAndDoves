//javascript that simulates a grid where hawkes and doves interact

//an array that keeps track of the grid
var gridArray = [];

//how big we want our grid to be
var gridHeight = 10;
var gridWidth = 10;

//generate the initial grid
generateGridArray(gridWidth, gridHeight);

//render the grid
renderGridArray()

//every 5 seconds, update the grid
setInterval(function() {
    nextTick();
}, 5000);

//updates the grid
function nextTick() {
    updateGrid(gridWidth, gridHeight);
    renderGridArray()
}

function updateGrid(Width, Height){
	var checkGrid = [];
	for(var a = 0; a < Width; a++){
		checkGrid[a] = [];
		for(var b = 0; b < Height; b++){
			checkGrid[a][b] = false;
		}
	}
	for(var i = 0; i < Height; i++) {
        for(var j = 0; j < Width; j++) {
			checkGrid[j][i] = determineLife(i, j, true);
		}
	}
	
	for(var i = 0; i < Height; i++) {
        for(var j = 0; j < Width; j++) {
			if(checkGrid[i][j] == true){
				if(Math.floor(Math.random() * 2) == 1){
					gridArray[i][j].birdType = 'hawk';
				}
				
				else{
					gridArray[i][j].birdType = 'dove';
				}
			}
		}
	}
}

//determines if bird lives or dies
function determineLife(x, y, first){
	if(first == true){
		first = false;
		var up = determineLife(y-1, x, first);
		var down = determineLife(y+1, x, first);
		var right = determineLife(y, x-1, first); 
		var left = determineLife(y, x+1, first);
		if(up == true || down == true || right == true || left == true){
			//dead
			return true;
		}
		else{
			//alive
			return false;
		}
	}
	else if(x < gridWidth && y < gridHeight && x != -1 && y != -1){
		if(gridArray[x][y].birdType == 'hawk'){
			return true;
		}	
		else{
			return false;
		}
	}
	else{
		return false;
	}
}

function generateGridArray(width, height) {

    //clear the array
    gridArray = [];


    for (var i = 0; i < height; i++) {
        var row = [];
        for (var j = 0; j < width; j++) {
			
            //flip a coin, decide if bird is hawk or a dove
            if (Math.floor(Math.random() * 2) == 1) {
                row.push({
                    birdType: "hawk"
                });
            } else {
                row.push({
                    birdType: "dove"
                });
            }

        }
        gridArray.push(row);
    }
}


function renderGridArray() {
    //build string?
    var newGridHtml = '';
    for (var i = 0; i < gridArray.length; i++) {
        newGridHtml += '<div class="row">';
        for (var j = 0; j < gridArray[i].length; j++) {

            newGridHtml += '<img src="images/';
            newGridHtml += gridArray[i][j].birdType == "hawk" ? 'hawk' : 'dove';
            newGridHtml += '.png">';

        }
        newGridHtml += '</div>';
    }
    $('#grid').html(newGridHtml);
}