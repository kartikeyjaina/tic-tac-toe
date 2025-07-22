const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer = "X";
let gameGrid;
const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//initialize game
function initGame() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";               // Clear each box text
        box.style.pointerEvents = "all"; // Enable clicks on boxes
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


initGame();

function swapTurn() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    }
    else {
        currentPlayer = 'X';
    }
    gameInfo.innerText = `Current Player is ${currentPlayer}`;
}
function checkGameOver() {
  let winner = "";

  winningPosition.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" &&
      gameGrid[position[1]] !== "" &&
      gameGrid[position[2]] !== "") &&
      (gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]])
    ) {
      winner = gameGrid[position[0]]; // 'X' or 'O'

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  if (winner !== "") {
    gameInfo.innerText = `Player ${winner} Won!`;
    newGameBtn.classList.add("active");

    boxes.forEach((box) => {
      box.style.pointerEvents = "none"; // Disable further clicks
    });

    return true; // Game over
  }

  // Check for draw
  if (!gameGrid.includes("")) {
    gameInfo.innerText = "Game Draw!";
    newGameBtn.classList.add("active");
    return true;
  }

  return false; // Game continues
}

       

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}






boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


newGameBtn.addEventListener("click", initGame);