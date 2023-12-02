var board = [];
var columns = 10;
var rows = 10;

var minesAmount = 15;
var minesLocation = [];
var tilesClicked = 0;

var gameOver = false;

window.onload = function () {
    startGame();
}

let setScore = document.getElementById("score");
setScore.value = tilesClicked;


//fill the field with mines
function setMines() {
    //randomly select mines
    let minesLeft = minesAmount;
    while (minesLeft > 0){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
          
        }
    }
        }

function startGame() {
    setMines();

    //make board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + '-' + c.toString();
            tile.addEventListener("click", clickTile);
            tile.addEventListener("contextmenu", flagTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

//set flag on tile
function flagTile(event) {
    event.preventDefault();
    let tile = this;
    if (gameOver || this.classList.contains("tile-clicked")) { 
        return;
    }
    if (tile.innerText == "") {
        tile.innerText = "`";
    }
    else if (tile.innerText == "`") {
        tile.innerText = "";
    }
    return;
}

function clickTile() {
    //check if game over
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }
    //game over if you click mine
    let tile = this;
    if (minesLocation.includes(tile.id)) {
        gameOver = true;
        tile.style.backgroundColor = "red";
        revealMines();
        return;
    }
    //if its not a mine, take coords and continue 
    let coordinates = tile.id.split("-");
    let r = parseInt(coordinates[0]);
    let c = parseInt(coordinates[1]);
    checkMines(r, c)
    setScore.value = tilesClicked;
}

//checks how many mines are in the vicinity of the clicked tile
function checkMines(r, c) {
    //out of bounds check
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }

    if (board[r][c].classList.contains("tile-clicked")) {
        return;

    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let minesFound = 0; //<-- the number in the actual tile

    // check top row
    minesFound += checkTile(r - 1, c - 1);
    minesFound += checkTile(r - 1, c);
    minesFound += checkTile(r - 1, c + 1);

    // check middle left/right
    minesFound += checkTile(r, c - 1);
    minesFound += checkTile(r, c + 1);

    // check bottom row
    minesFound += checkTile(r + 1, c - 1);
    minesFound += checkTile(r + 1, c);
    minesFound += checkTile(r + 1, c + 1);

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString()); //add a class to the tile so it shows the correct number 
    }

    else { // tile is empty -> reveal adjacent empty tiles
        board[r][c].innerText = "";

        checkMines(r - 1, c - 1);
        checkMines(r - 1, c);
        checkMines(r - 1, c + 1);

        checkMines(r, c - 1);
        checkMines(r, c + 1);

        checkMines(r + 1, c - 1);
        checkMines(r + 1, c);
        checkMines(r + 1, c + 1);
    }
    
    if (tilesClicked == rows * columns - minesAmount) {
        gameOver = true;
       
        

    }
}

// check if a mine is on a tile -> add 1 or 0
function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;

}

//reveal all mines (when game over)
function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "*";
                
            }
        }
    }
}

var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);

function resetGame() {
    // post results
    sendResult();
    // clear board divs
    const boardElement = document.getElementById("board");
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }
    //reset gamestates
    board = [];
    tilesClicked = 0;
    gameOver = false;
    minesLocation = [];
    setScore.value = 0;
    //start over
    startGame();
}


function sendResult() {
    let username = document.getElementById("username").value;
    let score = {
        "username": username,
        "score": tilesClicked,
        "time": '123',
    }

    if (username !== '') {
        fetch('script.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(score)
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            console.log(data);
        })
    }
}