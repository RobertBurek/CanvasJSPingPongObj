const cnv = document.querySelector('canvas');

const ctx = cnv.getContext('2d');

const cnvW = cnv.width = 1200;
const cnvH = cnv.height = 600;
const radiusBall = 8;
const widthRocket = 20;
const heightRocket = 150;
const deltaRocket = 30;

class Ball {
    constructor (radiusB, colorB, positionXB, positionYB, speedXB, speedYB, directionXB, directionYB){
        this.color = colorB;
        this.positionX = positionXB;
        this.positionY = positionYB;
        this.radius = radiusB;
        this.speedX = speedXB;
        this.speedY = speedYB;
        this.directionX = directionXB;
        if (!directionXB) this.speedX *= -1;
        if (!directionYB) this.speedY *= -1;
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

const ball1 = new Ball(radiusBall, 'white', 50, 250, 0, -4, true, false);
const ball2 = new Ball(radiusBall, 'yellow', 150, 350, -4, -5, false, true);
const ball3 = new Ball(radiusBall, 'red', 250, 450, 5, 4, false, true);
const ball4 = new Ball(radiusBall, 'blue', 50, 300, 0, 4, true, false);
const ball5 = new Ball(radiusBall, 'green', 470, 257, -5, 5, true, true);
const ball6 = new Ball(radiusBall, 'red', 550, 350, -4, 6, false, false);
const ball7 = new Ball(radiusBall, 'blue', 655, 450, 5, 6, true, false);
const ball8 = new Ball(radiusBall, 'green', 756, 250, -4, 3, false, true);
const ball9 = new Ball(radiusBall, 'lime', 780, 254, 4, -4, true, false);
const ball10 = new Ball(radiusBall, 'yellow', 880, 387, 3, 5, false, true);
const ball11 = new Ball(radiusBall, 'red', 990, 25, -5, -5, false, true);
const ball12 = new Ball(radiusBall, 'blue', 1008, 560, 6, 3, false, true);
const ball13 = new Ball(radiusBall, 'lime', 820, 333, 4, 3, true, true);
const ball14 = new Ball(radiusBall, 'yellow', 680, 222, 4, -3, false, false);
const ball15 = new Ball(radiusBall, 'lime', 355, 111, -5, 4, true, false);
const ball16 = new Ball(radiusBall, 'green', 156, 68, 5, 5, false, true);
const playerRocket = new Rocket(widthRocket, heightRocket, 'blue', deltaRocket, 250);
const computerRocket = new Rocket(widthRocket, heightRocket, 'red', (cnvW - deltaRocket - widthRocket), 150);

const gameElements = [];

// gameElements.push(ball1, playerRocket, computerRocket, ball2, ball3, ball4, ball5);
gameElements.push(ball1, ball2, ball3, ball4, ball5, ball6, ball7,  ball8, ball9, ball10, ball11, ball12, ball13, ball14, ball15, ball16);
// gameElements.push(ball1, ball4, ball8,ball10, ball13);


function start(gameElements){
    court();
    gameElements.forEach(element =>{
        element.draw();
        if (element.positionY <= radiusBall || element.positionY >= cnv.height - radiusBall) element.collisionY();
        if (element.positionX <= radiusBall || element.positionX >= cnv.width - radiusBall) element.collisionX();
        let e;
        for (let i = 0; i <= gameElements.length - 1; i++) {
            e = gameElements[i];
        let dystans = Math.pow(element.positionX - e.positionX, 2) + Math.pow(element.positionY - e.positionY, 2);
        if (dystans != 0 && dystans <= Math.pow(2 * radiusBall, 2)) {
                element.positionY -= element.speedY;
                element.collisionY();
                e.positionY += e.speedY;
                e.collisionY;
              break;
            }
        }
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

setInterval(game, 15);