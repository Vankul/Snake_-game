const canvas = document.getElementById("snake-game");
const ctx = canvas.getContext("2d");

const groundImg = new Image();
groundImg.src = "/assets/img/ground.png";
const fruitImg = new Image();
fruitImg.src = "/assets/img/fruit.png";
let tile = 32;
let score = 0;
let lose = false;
let bscore = 0;
let temp;
let snakeX;
let snakeY;
let poits = document.getElementById("score"); 
document.addEventListener("keydown", moving);
document.addEventListener("keydown", restart);

let fruit = {
    x: Math.floor((Math.random() * 17 + 1)) * tile,
    y: Math.floor((Math.random() * 15 + 3)) * tile
}

let snake = [];
snake[0] = {
    x: 9* tile,
    y: 10 * tile
}

function drawGame() {
    // Рисуем поле
    ctx.drawImage(groundImg, 0, 0);
    // Рисуем фрукт
    ctx.drawImage(fruitImg, fruit.x, fruit.y);
    // Рисуем счет
    drawScore();
    // Рисуем змею
    for(let i = 0; i < snake.length; i++){
        drawSnake(snake[i].x, snake[i].y, i);
    }
    // Увеличиваем темп
    if (score > 5) {
        speedUp();
    }
    // Змея съела фрукт
    fruit = eatFruit(snake, fruit);
    // Змея вышла за поле
    if (snakeX < tile || snakeX > tile * 17 
        || snakeY < 3 * tile || snakeY > 17 * tile) {
            loseGame();
    }
    // Новое положение головы
    nextPositionHead();
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    // Змея съела себя
    eatSnake(newHead, snake);
    // Добавляем голову змеи
    snake.unshift(newHead);
    // Выводим лучший счет
    if (score > bscore && lose) bscore = score;
    drawBestScore();
}



function moving(event){
    if(event.keyCode == 37 && temp != "right"){
        temp = "left"
    }
    else if(event.keyCode == 38 && temp != "buttom"){
        temp = "top"
    }
    else if(event.keyCode == 39 && temp != "left"){
        temp = "right"
    }
    else if(event.keyCode == 40 && temp != "top"){
        temp = "buttom"
    }
}

function eatSnake(head, other){
    for(let i = 0; i < other.length; i++){
        if(head.x == other[i].x && head.y == other[i].y){
            loseGame();
        }
    }
}

function restart(event){
    if (event.code == 'KeyC' && (event.ctrlKey || event.metaKey) && lose) {
        clearInterval(snakeGame);
        lose = false;
        score = 0;
        snake = [];
        temp = 0;
        snake[0] = {
            x: 9* tile,
            y: 10 * tile
        }   
        snakeGame = setInterval(drawGame, 200);
    }
}

function loseGame(){
    clearInterval(snakeGame);
    lose = true;
}

function speedUp(){
    clearInterval(snakeGame);
    snakeGame = setInterval(drawGame, 100);
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "50px sans-serif";
    ctx.fillText(score, tile * 2.5 , tile * 1.75);
}

function drawBestScore(){
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.fillText("BEST:", tile * 7 , tile * 1.5);
    ctx.fillText(bscore, tile * 10.5 , tile * 1.5);
}

function nextPositionHead(){
    if (temp == "left") snakeX -= tile;
    if (temp == "right") snakeX += tile;
    if (temp == "top") snakeY -= tile;
    if (temp == "buttom") snakeY += tile;
}

function drawSnake(x, y, i){
    ctx.fillStyle = i == 0 ? "green" : "#58c509";
    ctx.fillRect(x, y, tile, tile);
}


function eatFruit(snake, fruit){
    snakeX = snake[0].x;
    snakeY = snake[0].y;
    if (snakeX == fruit.x && snakeY == fruit.y){
        score++;
        fruit = {
            x: Math.floor((Math.random() * 17 + 1)) * tile,
            y: Math.floor((Math.random() * 15 + 3)) * tile
        }
    } else{
        snake.pop();
    }
    return fruit;
}

let snakeGame = setInterval(drawGame, 200);
