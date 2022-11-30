import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 2600;
canvas.height = 1100;

var start;var startImg;
var gameState = 'start';

/*start = createSprite(canvas.width/2,canvas.height-100,50,50);
start.src = "images/start.png";
//start.addImage(startImg);
start.scale=0.3;
drawSprites();
start.position.x = canvas.width / 2;
    start.position.y = canvas.height - 200;
    start.width = 140;
    start.height = 180;

if(mousePressedOver(start)){
  gameState='play'
}*/

const background = new Image();
background.src = "images/space3.jpg";

// text("SPACE play 🚀🚀",20,100);
 
     
// player.URL = "song.mp3";
//this.background = new Audio("sounds/shoot.wav");
const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(
  canvas,
  enemyBulletController,
  playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);

//bg music section
const audio = new Audio("sounds/bg.aac");
audio.volume=0.3;
audio.play();


/*if(keyPressed="UPARROW"){
  audio.volume = audio.volume + 0.1;
}*/

let isGameOver = false;
let didWin = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  displayGameOver();
  if (!isGameOver) {
    enemyController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletController.draw(ctx);
  }
}

function displayGameOver() {
  if (isGameOver) {
    let text = didWin ? "You Win" : "Game Over";
    let textOffset = didWin ? 3.5 : 5;
    
    ctx.fillStyle = "white";
    ctx.font = "200px Arial";
    ctx.fillText(text, canvas.width / 3, canvas.height / 2);
  }
}

function checkGameOver() {
  if (isGameOver) {
    return;
  }

  if (enemyBulletController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.collideWith(player)) {
    isGameOver = true;
  }

  if (enemyController.enemyRows.length === 0) {
    didWin = true;
    isGameOver = true;
  }
}

/*if(mousePressedOver(start)){
  restart()
}
}
}
function restart(){
  gameState='play'
  score=0;
  damage=0;
}*/
setInterval(game, 1000 / 60);
