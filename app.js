const cnv = document.querySelector('canvas');

const ctx = cnv.getContext('2d');

const cnvW = cnv.width = 1200;
const cnvH = cnv.height = 600;
const radiusBall = 8;
const widthRocket = 20;
const heightRocket = 150;
const deltaRocket = 30;

class Ball {
    constructor (radiusB, colorB, positionXB, positionYB, directionXB, directionYB){
        this.color = colorB;
        this.positionX = positionXB;
        this.positionY = positionYB;
        this.radius = radiusB;
        this.speedX = 4;
        this.speedY = 4;
        this.directionX = directionXB;
        this.directionY = directionYB;
        this.center = radiusB;
        }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.positionX,this.positionY, this.radius, 0, 2*Math.PI);
        ctx.fill(); 
        ctx.closePath();
        this.positionX += this.speedX;
        this.positionY += this.speedY;
      }

      collisionX() {
        this.speedX *= -1;

      }
      collisionY() {
        this.speedY *= -1;
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

const ball1 = new Ball(radiusBall, 'lime', 250, 450, true, false);
const ball2 = new Ball(radiusBall, 'yellow', 50, 150, false, true);
const playerRocket = new Rocket(widthRocket, heightRocket, 'blue', deltaRocket, 250);
const computerRocket = new Rocket(widthRocket, heightRocket, 'red', (cnvW - deltaRocket - widthRocket), 150);

const gameElements = [];

gameElements.push(ball1, playerRocket, computerRocket, ball2);

function start(gameElements){
    court();
    gameElements.forEach(element => {
        element.draw();
        if (element.positionY <= radiusBall || element.positionY >= cnv.height - radiusBall) element.collisionY();
        if (element.positionX <= radiusBall || element.positionX >= cnv.width - radiusBall) element.collisionX();

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