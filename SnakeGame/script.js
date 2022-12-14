const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHigth = gameBoard.height;
const boardBackground = "black";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake= [
    {x:unitSize * 4, y:0},
    {x: unitSize * 3, y:0},
    {x: unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();


function gameStart(){
    running = true;
    scoreText.textContent =  score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
         } , 75);
        
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0, gameWidth , gameHigth)
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.random((Math.random()* (max - min) + min) / unitSize)
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
    console.log(foodX)
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize ,unitSize);
};
function moveSnake(){
    const head = {
        x: snake[0].x + xVelocity,
        y: snake [0].y + yVelocity
    }
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();


    }
    else{
          snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){

    const keyPresed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGTH = 39;
    const DOWN = 40;

    const goingUp = (xVelocity == -unitSize);
    const goingDown = (xVelocity == unitSize);
    const goingRight = (yVelocity == unitSize);
    const goingLeft = (yVelocity == -unitSize);

    switch(true){
        case(keyPresed == LEFT && !goingRight):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;

        case(keyPresed == UP && !goingDown):
        xVelocity = 0;
        yVelocity = -unitSize;
        break;

        case(keyPresed == RIGTH && !goingLeft):
        xVelocity = 0;
        yVelocity = unitSize;
        break;

        case(keyPresed == DOWN && !goingUp):
        xVelocity = unitSize;
        yVelocity = 0;
        break;
    }
};
function checkGameOver(){
};
function displayGameOver(){};
function resetGame(){};

