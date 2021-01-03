const cnv = document.querySelector('canvas');

const ctx = cnv.getContext('2d');

const cnvW = cnv.width = 1200;
const cnvH = cnv.height = 600;
const ballSize = 16;
const widthRocket = 20;
const heightRocket = 150;
const deltaRocket = 30;

class Ball {
    constructor (ballSize, colorBall, positionXBall, positionYBall){
        this.color = colorBall;
        this.positionX = positionXBall;
        this.positionY = positionYBall;
        this.radius = ballSize / 2;
        this.speedX = 4;
        this.speedY = 4;
        this.directionX = true;
        this.directionY = true;
        this.center = ballSize / 2;
        }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.positionX,this.positionY, this.radius, 0, 2*Math.PI);
        ctx.fill(); 
        ctx.closePath();
        this.positionX += 2;
        this.positionY += -2;
      }
}

class  Rocket {
    constructor (widthR, heightR, colorR, positionXR, positionYR){
        this.width = widthR;
        this.height = heightR;
        this.color = colorR;
        this.positionX = positionXR;
        this.positionY = positionYR;
        this.speed = 4;
        this.directionX = true;
        this.directionY = true;
        this.center = heightR / 2;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    }
}

function court() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,cnvW,cnvH);
}

const ball1 = new Ball(ballSize,'lime',250,450);
const playerRocket = new Rocket(widthRocket, heightRocket, 'blue', deltaRocket, 250);
const computerRocket = new Rocket(widthRocket, heightRocket, 'red', (cnvW - deltaRocket - widthRocket), 150);

const gameElements = [];

gameElements.push(ball1,playerRocket,computerRocket);

function start(gameElements){
    court();
    gameElements.forEach(element => {
        element.draw();
    });
}

function game(){
    start(gameElements);
}

// function start(){
//     court();
//     ball1.draw();
//     playerRocket.draw();
//     computerRocket.draw();
// }

setInterval(game, 20);