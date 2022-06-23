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
    ctx.drawImage(groundImg, 0, 0);

    ctx.drawImage(fruitImg, fruit.x, fruit.y);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = i == 0 ? "green" : "#58c509";
        ctx.fillRect(snake[i].x, snake[i].y, tile, tile)
    }

    ctx.fillStyle = "white";
    ctx.font = "50px sans-serif";
    ctx.fillText(score, tile * 2.5 , tile * 1.75);


    

    if (score > 5) {
        clearInterval(snakeGame);
        snakeGame = setInterval(drawGame, 100);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (snakeX == fruit.x && snakeY == fruit.y){
        score++;
        fruit = {
            x: Math.floor((Math.random() * 17 + 1)) * tile,
            y: Math.floor((Math.random() * 15 + 3)) * tile
        }
    }else{
        snake.pop();
    }

    if (snakeX < tile || snakeX > tile * 17 
        || snakeY < 3 * tile || snakeY > 17 * tile) {
        clearInterval(snakeGame);
        lose = true;
    }

    if (temp == "left") snakeX -= tile;
    if (temp == "right") snakeX += tile;
    if (temp == "top") snakeY -= tile;
    if (temp == "buttom") snakeY += tile;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatSnake(newHead, snake);

    snake.unshift(newHead);

    if (score > bscore && lose) bscore = score;
    ctx.fillStyle = "white";
    ctx.font = "40px sans-serif";
    ctx.fillText("BEST:", tile * 7 , tile * 1.5);
    ctx.fillText(bscore, tile * 10.5 , tile * 1.5);
    
}

let temp;

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
            clearInterval(snakeGame);
            lose = true;
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

let snakeGame = setInterval(drawGame, 200);