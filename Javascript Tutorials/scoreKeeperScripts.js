var pOneButton = document.querySelector("#p1");
var pTwoButton = document.querySelector("#p2");
var pOneDisplay = document.querySelector("#pOneDisplay");
var pTwoDisplay = document.querySelector("#pTwoDisplay");
var resetButton = document.querySelector("#reset");
var h1 = document.querySelector("h1");
var numberField = document.querySelector("input");
var p = document.querySelector("p span");
var pOneScore = 0;
var pTwoScore = 0;
var gameOver = false;
var winningScore = 5;

pOneButton.addEventListener("click", function() {
  if (!gameOver) {
    pOneScore++;
    if (pOneScore === winningScore) {
      console.log("game over");
      gameOver = true;
      pOneDisplay.classList.add("winner");
    }
    pOneDisplay.textContent = pOneScore;
  }
});
pTwoButton.addEventListener("click", function() {
  if (!gameOver) {
    pTwoScore++;
    if (pTwoScore === winningScore) {
      console.log("game over");
      gameOver = true;
      pTwoDisplay.classList.add("winner");
    }
    pTwoDisplay.textContent = pTwoScore;
  }
});

resetButton.addEventListener("click", function() {
  reset();
  numberField.value = undefined;
  p.textContent = "5";
  winningScore = 5;
});

numberField.addEventListener("input", function() {
  p.textContent = numberField.value;
  winningScore = Number(numberField.value);
  reset();
});

function reset() {
    pOneScore = 0;
    pTwoScore = 0;
    pOneDisplay.textContent = pOneScore;
    pTwoDisplay.textContent = pTwoScore;
    pOneDisplay.classList.remove("winner");
    pTwoDisplay.classList.remove("winner");
    gameOver = false;
}