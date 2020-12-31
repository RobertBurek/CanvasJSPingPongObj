const cnv = document.querySelector('canvas');

const ctx = cnv.getContext('2d');

const cnvW = cnv.width = 1200;
const cnvH = cnv.height = 600;


const ballSize = 16;


function Ball(ballSize, colorBall, positionXBall, positionYBall){
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

function PPRocket(widthRocket, heightRocket, colorRocket, positionXRocket, positionYRocket){
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

const ball1 = new Ball(ballSize,'lime',250,450);


ctx.fillStyle = ball1.color;
ctx.arc(ball1.positionX,ball1.positionY, ball1.radius, 0, 2*Math.PI);
ctx.fill();

