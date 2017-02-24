var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var x = canvas.width/2;
var y = canvas.height - 30;
var ballRadius = 10;
var ballColor = "#C6FF00"
var dx = 2;
var dy = -2;

var paddleHeight = 10;
var paddleWidth = 85;
var paddleColor = "#4DD0E1"
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 7;
var brickColumnCount = 11;
var brickHeight = 18;
var brickWidth = 84;
var brickOffsetTop = 5;
var brickOffsetLeft = 1;
var brickPadding = 5;

var score = 0;
var scoreColor = "#C6FF00"

var bricks = [];
for(c=0; c < brickColumnCount; c++){
  bricks[c] = [];
  for (r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {x: 0, y: 0, status: 1}
  }
}

var colors = ["#006064","#00838F", "#0097A7", "#00ACC1", "#00BCD4", "#26C6DA", "#4DD0E1"];
var i = 0;

function drawBricks() {
  for(c=0; c < brickColumnCount; c++){
    for (r = 0; r < brickRowCount; r++) {
      if(bricks[c][r].status == 1){
        var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        // if (r==0){
        //   ctx.fillStyle = colors[0];
        // }
        // else {
        //   ctx.fillStyle = colors[1];
        // }
        ctx.fillStyle = colors[r];
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
  for(c=0; c < brickColumnCount; c++){
    for(r=0; r < brickRowCount; r++){
      var b = bricks[c][r];
      if(b.status == 1){
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount){
            alert("Congratulations, You have won the game!!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "18px Arial";
  ctx.fillStyle = scoreColor;
  ctx.fillText("Score: "+score, 8, 20);
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  }

  else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  }

  else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();

  if(y+dy < ballRadius){
    dy = -dy;
  }
  else if (y+dy > canvas.height-ballRadius) {         //canvas.height
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      //alert("You died!! Restart?")
      document.location.reload();
    }
  }

  if (x+dx < ballRadius || x+dx > canvas.width-ballRadius) {
    dx = -dx;
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth){
    paddleX += 7;
  }

  if (leftPressed && paddleX > 0) {
    paddleX -= 7;

  }
  x += dx;
  y += dy;
}

setInterval(draw, 10);
