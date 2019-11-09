var colors = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easyBtn");
var hardButton = document.querySelector("#hardBtn");


easyButton.addEventListener("click", function() {
    hardButton.classList.remove("selected");
    easyButton.classList.add("selected");
    colors = generateRandomColors(3);
    updateSquares();
});

hardButton.addEventListener("click", function() {
    easyButton.classList.remove("selected");
    hardButton.classList.add("selected");
    colors = generateRandomColors(6);
    updateSquares();
});

resetButton.addEventListener("click", function() {

    updateSquares();
});

//colorDisplay.textContent = colors[pickedColor];
updateSquares()

function updateSquares() {

    pickedColor = pickColor();
    colorDisplay.textContent = colors[pickedColor];
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";

    for(var i = 0; i < squares.length; i++){
        
        if (colors[i] !== undefined) {
            squares[i].style.display = "block";            
            squares[i].style.backgroundColor = colors[i];
            
            squares[i].addEventListener("click", function() {
                var clickedColor = this.style.backgroundColor;
                
                if (clickedColor === colors[pickedColor]) {
                    messageDisplay.textContent = "Correct!";
                    resetButton.textContent = "Play Again?";
                    changeColors(clickedColor);
                    h1.style.backgroundColor = clickedColor;
        
                } else {
                    this.style.backgroundColor = "#232323";
                    messageDisplay.textContent = "Try Again";
                }
            });

        } else {
            squares[i].style.display = "none";
        }
    }
    messageDisplay.textContent = undefined;
}

function changeColors(color) {
    for(var i = 0; i< squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var randomNumber = Math.floor(Math.random() * colors.length);
    return randomNumber;
}

function generateRandomColors(num) {
    var arr = [];

    for(var i = 0;i < num; i++){
        arr.push(randomColor());
    }

    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")"
}