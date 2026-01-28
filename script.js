//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const playerInputs = document.getElementById("player-inputs");
const board = document.getElementById("board");
const messageDiv = document.querySelector(".message");
const gameTitle = document.getElementById("game-title");

let players = [];
let currentPlayerIndex = 0;
let gameActive = true;

const winningCombinations = [
  [1,2,3], [4,5,6], [7,8,9], // rows
  [1,4,7], [2,5,8], [3,6,9], // columns
  [1,5,9], [3,5,7]           // diagonals
];

submitBtn.addEventListener("click", () => {
  const player1 = document.getElementById("player-1").value.trim();
  const player2 = document.getElementById("player-2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players!");
    return;
  }

  players = [
    { name: player1, symbol: "X" },
    { name: player2, symbol: "O" }
  ];

  playerInputs.style.display = "none";
  board.style.display = "grid";
  gameTitle.classList.remove("hidden");
  messageDiv.textContent = `${players[currentPlayerIndex].name}, you're up!`;
});

board.addEventListener("click", (e) => {
  const cell = e.target;
  if (!cell.classList.contains("cell") || cell.textContent || !gameActive) return;

  cell.textContent = players[currentPlayerIndex].symbol;

  if (checkWin(players[currentPlayerIndex].symbol)) {
    messageDiv.textContent = `${players[currentPlayerIndex].name}, congratulations you won!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    messageDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayerIndex = 1 - currentPlayerIndex;
  messageDiv.textContent = `${players[currentPlayerIndex].name}, you're up!`;
});

function checkWin(symbol) {
  return winningCombinations.some(combination =>
    combination.every(id => document.getElementById(id).textContent === symbol)
  );
}

function isDraw() {
  return [...document.querySelectorAll(".cell")].every(cell => cell.textContent);
}
