//javascript that simulates a grid where hawkes and doves interact

//an array that keeps track of the grid
var gridArray = [];

//generate a 10x10 grid?
generateGridArray(10, 10);

//render the grid
renderGridArray()

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