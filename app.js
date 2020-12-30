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


