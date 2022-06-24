const canvas = document.getElementById("snake-game");
const ctx = canvas.getContext("2d");

const groundImg = createImg("/assets/img/ground.png");
const fruitImg = createImg("/assets/img/fruit.png");
let tile = 32;
let score = 0;
let lose = false;
let bscore = 0;
let temp;
let snakeX;
let snakeY;
let newHead;
let fruit = newFruit();
let snake = createSnake();
let snakeGame = setInterval(drawGame, 100);

function drawGame() {
    // Рисуем поле
    ctx.drawImage(groundImg, 0, 0);
    // Рисуем фрукт
    ctx.drawImage(fruitImg, fruit.x, fruit.y);
    // Рисуем счет
    drawScore();
    // Рисуем змею
    drawSnake(snake);
    // Змея съела фрукт
    checkSnakeEatFruit(snake);
    // Змея вышла за поле
    outOfBounds();
    // Новое положение головы
    nextPositionHead();
    // Змея съела себя
    checkSnakeBiteSelf(newHead, snake);
    // Добавляем голову змеи
    snake.unshift(newHead);
    // Выводим лучший счет
    drawBestScore();
}

function createImg(src){
    let img = new Image();
    img.src = src;
    return img;
}

function createSnakeBlock(){
    return {
        x: 9* tile,
        y: 10 * tile
    };
}

function createSnake(){
    return [createSnakeBlock()];
}

function newFruit(){
    return {
        x : Math.floor((Math.random() * 17 + 1)) * tile,
        y : Math.floor((Math.random() * 15 + 3)) * tile,
    }
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

function checkSnakeBiteSelf(head, other){
    for(let i = 0; i < other.length; i++){
        if(head.x == other[i].x && head.y == other[i].y){
            loseGame();
        }
    }
}

function restart(event){
    if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey) && lose) {
        lose = false;
        score = 0;
        temp = 0;
        snake = createSnake();   
        snakeGame = setInterval(drawGame, 100);
    }
}

function loseGame(){
    clearInterval(snakeGame);
    lose = true;
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "50px sans-serif";
    ctx.fillText(score, tile * 2.5 , tile * 1.75);
}

function outOfBounds(){
    if (snakeX < tile || snakeX > tile * 17 
        || snakeY < 3 * tile || snakeY > 17 * tile) {
            loseGame();
    }
}

function drawBestScore(){
    if (score > bscore && lose) bscore = score;
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
    newHead = {
        x: snakeX,
        y: snakeY
    }
}

function drawSnake(snake){
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? "green" : "#58c509";
        ctx.fillRect(snake[i].x, snake[i].y, tile, tile);
    }
}

function checkSnakeEatFruit(snake){
    snakeX = snake[0].x;
    snakeY = snake[0].y;
    if (snakeX == fruit.x && snakeY == fruit.y){
        score++;
        fruit = newFruit();
    } else{
        snake.pop();
    }
}

document.addEventListener("keydown", moving);
document.addEventListener("keydown", restart);
