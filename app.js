const cnv = document.querySelector('canvas');

const ctx = cnv.getContext('2d');

const cnvW = cnv.width = 1200;
const cnvH = cnv.height = 600;
const radiusBall = 8;
const widthRocket = 20;
const heightRocket = 150;
const deltaRocket = 30;
const interval = 400;

class Ball {
    constructor (radiusB, colorB, positionXB, positionYB, speedXB, speedYB){
        this.color = colorB;
        this.positionX = positionXB;
        this.positionY = positionYB;
        this.radius = radiusB;
        this.speedX = speedXB;
        this.speedY = speedYB;
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

      direction(){
        if (this.speedX > 0 && this.speedY > 0 ) return "leftTop";
        if (this.speedX < 0 && this.speedY > 0 ) return "rightTop";
        if (this.speedX > 0 && this.speedY < 0 ) return "leftBottom";
        if (this.speedX < 0 && this.speedY < 0 ) return "rightBottom";
        if (this.speedX > 0 && this.speedY == 0 ) return "left";
        if (this.speedX < 0 && this.speedY == 0 ) return "right";
        if (this.speedX == 0 && this.speedY > 0 ) return "top";
        if (this.speedX == 0 && this.speedY < 0 ) return "bottom";
      }

      isContact(){
        for (let i = 0; i <= gameElements.length - 1; i++) {
            let e = gameElements[i];
            // console.log(e);
        let dystans = Math.pow(this.positionX - e.positionX, 2) + Math.pow(this.positionY - e.positionY, 2);
        // console.log(dystans);
        if (dystans != 0 && dystans <= Math.pow(2 * this.radius, 2)) {
            console.log(dystans);
            switch (this.direction()){
            case "leftTop":
                switch (e.direction()){
                    case "leftBottom":
                        this.positionX += this.speedX;
                        this.collisionY();
                        // e.positionX += e.speedX;
                        // e.collisionY;
                        break;
                    // case "rightTop":
                    //     this.positionY -= this.speedY;
                    //     this.collisionY();
                    //     e.positionY += e.speedY;
                    //     e.collisionY;
                    //     break;

                } // koniec 2 switcha
        } // koniec 1 switcha
    break;
    }
      }
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

const ball1 = new Ball(radiusBall, 'white', 50, 250, 4, 4);
const ball2 = new Ball(radiusBall, 'yellow', 50, 350, 4, -4);
const ball3 = new Ball(radiusBall, 'red', 100, 250, -4, 4);
const ball4 = new Ball(radiusBall, 'blue', 50, 300, 0, 4);
const ball5 = new Ball(radiusBall, 'green', 470, 257, 5, -5);
const ball6 = new Ball(radiusBall, 'red', 550, 350, 4, -6);
const ball7 = new Ball(radiusBall, 'blue', 655, 450, 5, 6);
const ball8 = new Ball(radiusBall, 'green', 756, 250, 4, -3);
const ball9 = new Ball(radiusBall, 'lime', 780, 254, 4, 4);
const ball10 = new Ball(radiusBall, 'yellow', 880, 387, 3, -5);
const ball11 = new Ball(radiusBall, 'red', 990, 25, 5, 5);
const ball12 = new Ball(radiusBall, 'blue', 1008, 560, -6, -3);
const ball13 = new Ball(radiusBall, 'lime', 820, 333, 4, );
const ball14 = new Ball(radiusBall, 'yellow', 680, 222, -4, 3);
const ball15 = new Ball(radiusBall, 'lime', 355, 111, 5, 4);
const ball16 = new Ball(radiusBall, 'green', 156, 68, -5, 5);
const playerRocket = new Rocket(widthRocket, heightRocket, 'blue', deltaRocket, 250);
const computerRocket = new Rocket(widthRocket, heightRocket, 'red', (cnvW - deltaRocket - widthRocket), 150);

const gameElements = [];

// gameElements.push(ball1, playerRocket, computerRocket, ball2, ball3, ball4, ball5);
// gameElements.push(ball1, ball2, ball3, ball4, ball5, ball6, ball7,  ball8, ball9, ball10, ball11, ball12, ball13, ball14, ball15, ball16);
// gameElements.push(ball1, ball4, ball8,ball10, ball13);
gameElements.push(ball1, ball2);
// gameElements.push(ball1, ball3);


function start(gameElements){
    court();
    gameElements.forEach(element =>{
        element.draw();
        if (element.positionY <= radiusBall || element.positionY >= cnv.height - radiusBall) element.collisionY();
        if (element.positionX <= radiusBall || element.positionX >= cnv.width - radiusBall) element.collisionX();
        element.isContact();
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

setInterval(game, interval);