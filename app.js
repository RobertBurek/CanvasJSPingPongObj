const cnv = document.querySelector('canvas');

const ctx = cnv.getContext('2d');

const cnvW = cnv.width = 1200;
const cnvH = cnv.height = 600;


const ballSize = 16;

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
      }
}

class  Rocket {
    constructor (widthRocket, heightRocket, colorRocket, positionXRocket, positionYRocket){
        this.width = widthRocket;
        this.height = heightRocket;
        this.color = colorRocket;
        this.positionX = positionXRocket;
        this.positionY = positionYRocket;
        this.speed = 4;
        this.directionX = true;
        this.directionY = true;
        this.center = heightRocket / 2;
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
const playerRocket = new Rocket(20, 150, 'blue', 40, 250);
const computerRocket = new Rocket(20, 150, 'red', 1140, 150);

court();
ball1.draw();
playerRocket.draw();
computerRocket.draw();
