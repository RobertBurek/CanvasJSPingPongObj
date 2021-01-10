const cnv = document.querySelector('canvas');

const ctx = cnv.getContext('2d');

const cnvW = cnv.width = 1200;
const cnvH = cnv.height = 600;
const radiusBall = 8;
const widthRocket = 20;
const heightRocket = 150;
const deltaRocket = 30;
let interval = 50;
let collisionElements = [];

class CollisionElement{
    constructor (Element1, Element2, directionEl1, directionEl2, deltaX, deltaY, distance) {
        this.Element1 = Element1;
        this.Element2 = Element2;
        this.directionEl1 = directionEl1;
        this.directionEl2 = directionEl2;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.distance = distance;
    }
}

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
        this.positionX += this.speedX;
        this.positionY += this.speedY;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.positionX,this.positionY, this.radius, 0, 2*Math.PI);
        ctx.fill(); 
        ctx.closePath();
        // this.positionX += this.speedX;
        // this.positionY += this.speedY;
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
            if (this === e) continue;
            let deltaX = this.positionX - e.positionX;
            let deltaY = this.positionY - e.positionY;
            let distance = Math .sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
            if (distance <= 2 * this.radius) {
                // this.positionX -= this.speedX;
                // this.positionY -= this.speedY;
                // e.positionX -= e.speedX;
                // e.positionY -= e.speedY;
                let newDeltaX = Math.ceil(2 * this.radius * deltaX / distance);
                let newDeltaY = Math.ceil(2 * this.radius * deltaY / distance);
                if (newDeltaY < 0) newDeltaY -= 1;
                if (newDeltaX < 0) newDeltaX -= 1;
                // let newDeltaX = (2 * this.radius * deltaX / distance);
                // let newDeltaY = (2 * this.radius * deltaY / distance);

                console.log(deltaX);
                console.log(deltaY);
                console.log(Math .sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)));
                console.log(newDeltaX);
                console.log(newDeltaY);
                console.log(Math .sqrt(Math.pow(newDeltaX, 2) + Math.pow(newDeltaY, 2)));
                if (deltaX >=0) {
                    e.positionX = this.positionX - newDeltaX;
                    // if (deltaY >= 0) {
                        e.positionY = this.positionY - newDeltaY;//ok
                    // } else {
                        // e.positionY = this.positionY - newDeltaY; //ok
                    // }
                } else {
                    e.positionX = this.positionX - newDeltaX;
                    // if (deltaY >= 0) {
                        e.positionY = this.positionY - newDeltaY; //ok
                        // } else {
                        // e.positionY = this.positionY - newDeltaY;//ok
                        // }
                }
                if (collisionElements.length == 0) collisionElements.push(new CollisionElement(this, e, this.direction(), e.direction(), deltaX, deltaY, distance));
                else {
                    for(let i = 0; i <= collisionElements.length-1; i++){
                        if (((this!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==e))||((e!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==this))){
                            collisionElements.push(new CollisionElement(this, e, this.direction(), e.direction(), deltaX, deltaY, distance));
                            console.log(distance);
                            break;
                        } 
                    }
                };
            }
        }
    }

    reaction(collisionElement){
        // let x = 2 * this.radius * collisionElement.deltaX / Math.sqrt(Math.pow(collisionElement.deltaX, 2) + Math.pow(collisionElement.deltaY, 2));
        // let y = 2 * this.radius * collisionElement.deltaY / Math.sqrt(Math.pow(collisionElement.deltaX, 2) + Math.pow(collisionElement.deltaY, 2));
        // let x = 2 * this.radius * collisionElement.deltaX / collisionElement.distance;
        // let y = 2 * this.radius * collisionElement.deltaY / collisionElement.distance;
        // let newDeltaX = Math.ceil(2 * this.radius * collisionElement.deltaX / collisionElement.distance);
        // let newDeltaY = Math.ceil(2 * this.radius * collisionElement.deltaY / collisionElement.distance);
        // console.log(Math.round(x));
        // console.log(Math.round(y));
        // console.log(newDeltaX);
        // console.log(newDeltaY);
        // this.positionX +=this.speedX;
        // this.positionY +=this.speedY;
        // collisionElement.Element2.positionX += collisionElement.Element2.speedX;
        // collisionElement.Element2.positionY += collisionElement.Element2.speedY;
 //       console.log("Przed: ");
 //       console.log(this);
 //       console.log(collisionElement.Element2);
        // this.positionX = newDeltaX + collisionElement.Element2.positionX;
        // this.positionY = newDeltaY + collisionElement.Element2.positionY;
        switch (this.direction()){
            case "leftTop":
                switch (collisionElement.Element2.direction()){
                    case "leftBottom":
                        this.collisionY();
                        collisionElement.Element2.collisionY();
                        break;
                    case "rightTop":
                        this.collisionX();
                        collisionElement.Element2.collisionX();
                        break;
                    case "leftTop":
                        let tempX = this.speedX;
                        let tempY = this.speedY;
                        this.speedX = collisionElement.Element2.speedX;
                        this.speedY = collisionElement.Element2.speedY;
                        collisionElement.Element2.speedX = tempX;
                        collisionElement.Element2.speedY = tempY;
                        // console.log(this);
                        // console.log(collisionElement.Element2);
                        break;
                } // koniec 2 switcha
            case "rightTop":
                switch (collisionElement.Element2.direction()){
                    case "leftBottom":
                        this.collisionY();
                        collisionElement.Element2.collisionY();
                        break;
                    case "rightBottom":
                        this.collisionY();
                        collisionElement.Element2.collisionY();
                        break;
                    case "leftTop":
                        break;
                }
        } // koniec 1 switcha
//        console.log("Po odbiciu: ");
//        console.log(this);
//        console.log(collisionElement.Element2);
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

const ball1 = new Ball(radiusBall, 'white', 145, 250, 6, 6);
const ball2 = new Ball(radiusBall, 'yellow', 150, 300, 6, -6);
const ball3 = new Ball(radiusBall, 'red', 100, 250, -6, 6);
const ball4P = new Ball(radiusBall, 'blue', 150, 280, 6, 3);
const ball4L = new Ball(radiusBall, 'blue', 143, 280, 6, 3);
const ball5 = new Ball(radiusBall, 'green', 233, 250, -5, 5);
const ball6 = new Ball(radiusBall, 'lime', 90, 330, -5, -6);
const ball7 = new Ball(radiusBall, 'blue', 110, 330, -6, -6);
const ball8L = new Ball(radiusBall, 'green', 140, 220, 6, 8);
const ball8P = new Ball(radiusBall, 'green', 148, 220, 6, 8);
const ball9 = new Ball(radiusBall, 'lime', 780, 254, 4, 4);
const ball10 = new Ball(radiusBall, 'yellow', 220, 387, 3, -5);
const ball11 = new Ball(radiusBall, 'red', 790, 25, 5, 5);
const ball12 = new Ball(radiusBall, 'blue', 458, 360, -6, -3);
const ball13 = new Ball(radiusBall, 'lime', 620, 333, 4, 5);
const ball14 = new Ball(radiusBall, 'yellow', 680, 222, -4, 3);
const ball15 = new Ball(radiusBall, 'lime', 355, 111, 5, 4);
const ball16 = new Ball(radiusBall, 'green', 156, 68, -5, 5);
const playerRocket = new Rocket(widthRocket, heightRocket, 'blue', deltaRocket, 250);
const computerRocket = new Rocket(widthRocket, heightRocket, 'red', (cnvW - deltaRocket - widthRocket), 150);

const gameElements = [];

// gameElements.push(ball1, playerRocket, computerRocket, ball2, ball3, ball4, ball5);
// gameElements.push(playerRocket, computerRocket, ball1, ball2, ball3, ball4, ball5, ball6, ball7,  ball8, ball9, ball10, ball11, ball12, ball13, ball14, ball15, ball16);
// gameElements.push(ball1, ball2, ball3, ball4, ball5, ball6, ball7,  ball8, ball9, ball10, ball11, ball12, ball13, ball14, ball15, ball16);
gameElements.push(ball4L, ball2, ball3, ball1, ball5, ball6, ball7,  ball8P, ball9, ball10, ball11, ball12, ball13, ball14, ball15, ball16);
// gameElements.push(ball1, ball4, ball8, ball10, ball13);
// gameElements.push(ball4, ball1, ball8, ball10, ball13);
// gameElements.push(ball1, ball3);//ok
// gameElements.push(ball4, ball1);//ok



// gameElements.push(ball1, ball4P);//ok -x -y
// gameElements.push(ball1, ball4L);//ok +x -y
// gameElements.push(ball1, ball8L);//ok +x +y
// gameElements.push(ball1, ball8P);//ok -x +y

// gameElements.push(ball1, ball2);//ok
// gameElements.push(ball1, ball5);//ok
// gameElements.push(ball3, ball6);//ok
// gameElements.push(ball3, ball7);//----

let k = 0;

function start(gameElements){
    // console.log(++k);
    court();
    gameElements.forEach(element =>{
        element.draw();
    });
    gameElements.forEach(element =>{
        // if (element.positionY <= radiusBall || element.positionY >= cnv.height - radiusBall) element.collisionY();
        // if (element.positionX <= radiusBall || element.positionX >= cnv.width - radiusBall) element.collisionX();
        element.isContact();
    });
    if (collisionElements.length>0) console.log(collisionElements);
    // collisionList = [];
    // collisionElements.forEach(element =>{
    //     for(let i = 0; i <= collisionElements.length-1; i++){
    //         // console.log(element.Element1.color + " - " + collisionElements[i].Element2.color)
    //         // console.log(element.Element1===collisionElements[i].Element2);
    //         //  + ' - ' + collisionElements[i].Element1!==element.Element2);
    //         console.log(((element.Element1===collisionElements[i].Element2)&&(collisionElements[i].Element1===element.Element2)));
    //         if ((element.Element1===collisionElements[i].Element2)&&(collisionElements[i].Element1===element.Element2)){
    //             delete collisionElements[i];
    //         } else collisionList.push(element);
    //     }
    //     // console.log(collisionList);
    // });
    collisionElements.forEach(element =>{
        element.Element1.reaction(element);
    });
    collisionElements = [];
    gameElements.forEach(element =>{
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

setInterval(game, interval);