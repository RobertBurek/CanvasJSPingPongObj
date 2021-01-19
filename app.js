const cnv = document.querySelector('canvas');

const ctx = cnv.getContext('2d');

const cnvW = cnv.width = 1200;
const cnvH = cnv.height = 600;
const radiusBall = 8;
const widthRocket = 20;
const heightRocket = 150;
const deltaRocket = 30;
let interval = 15;
let collisionElements = [];

class CollisionElement {
    constructor (Element1, Element2, directionEl1, directionEl2) {
        this.Element1 = Element1;
        this.Element2 = Element2;
        this.directionEl1 = directionEl1;
        this.directionEl2 = directionEl2;
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
        this.vector = Math.sqrt(Math.pow(this.speedY,2) + Math.pow(this.speedX,2));
        }

    draw() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.positionX,this.positionY, this.radius, 0, 2*Math.PI);
        ctx.fill(); 
        ctx.closePath();
      }

    direction() {
        if (this.speedX >= 0 && this.speedY >= 0 ) return "leftTop";
        if (this.speedX < 0 && this.speedY >= 0 ) return "rightTop";
        if (this.speedX >= 0 && this.speedY < 0 ) return "leftBottom";
        if (this.speedX < 0 && this.speedY < 0 ) return "rightBottom";
    }

    isContact() {
        for (let i = 0; i <= gameElements.length - 1; i++) {
            let e = gameElements[i];
            if (this === e) continue;
            if (e.constructor.name != "Ball") continue;
            let deltaX = this.positionX - e.positionX;
            let deltaY = this.positionY - e.positionY;
            let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
            if (distance <= 2 * this.radius) {
                console.log(this.constructor.name + " - " + e.constructor.name);
                let newDeltaX = Math.round(2 * this.radius * deltaX / distance);
                let newDeltaY = Math.round(2 * this.radius * deltaY / distance);
                if (Math.sqrt(Math.pow(newDeltaX, 2) + Math.pow(newDeltaY, 2)) <= 2 * this.radius) {
                    newDeltaX = Math.ceil(2 * this.radius * deltaX / distance);
                    newDeltaY = Math.ceil(2 * this.radius * deltaY / distance);
                    }
                if (Math.sqrt(Math.pow(newDeltaX, 2) + Math.pow(newDeltaY, 2)) <= 2 * this.radius) {
                    if (newDeltaY < 0) newDeltaY -= 1;
                    if (newDeltaX < 0) newDeltaX -= 1;
                }
                let thisDeltaX = Math.floor((newDeltaX - deltaX) / 2);
                let thisDeltaY = Math.floor((newDeltaY - deltaY) / 2);
                let alfa = Math.acos((this.speedX * e.speedX + this.speedY * e.speedY)/(this.vector * e.vector)) * 180 / Math.PI;
                console.log(alfa);
                this.positionX += thisDeltaX;
                this.positionY += thisDeltaY;
                e.positionX = this.positionX - newDeltaX;
                e.positionY = this.positionY - newDeltaY;
                if (collisionElements.length == 0) collisionElements.push(new CollisionElement(this, e, this.direction(), e.direction()));
                else {
                    for(let i = 0; i <= collisionElements.length - 1; i++){
                        if (((this!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==e))||((e!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==this))){
                            collisionElements.push(new CollisionElement(this, e, this.direction(), e.direction()));
                            break;
                        } 
                    }
                };
            }
        }
    }

    reaction(collisionElement) {
        if (this.direction() == "leftTop") {
            switch (collisionElement.Element2.direction()){
                case "leftBottom":
                    this.collisionY();
                    collisionElement.Element2.collisionY();
                    break;
                case "rightTop":
                    this.collisionX();
                    collisionElement.Element2.collisionX();
                    break;
                case "rightBottom":
                    this.collisionX();
                    this.collisionY();
                    collisionElement.Element2.collisionX();
                    collisionElement.Element2.collisionY();
                    break;
                case "leftTop":
                    let tempX = this.speedX;
                    let tempY = this.speedY;
                    this.speedX = collisionElement.Element2.speedX;
                    this.speedY = collisionElement.Element2.speedY;
                    collisionElement.Element2.speedX = tempX;
                    collisionElement.Element2.speedY = tempY;
                    break;
            }
        } else if (this.direction() == "rightTop") {
            switch (collisionElement.Element2.direction()){
                case "leftBottom":
                    this.collisionX();
                    this.collisionY();
                    collisionElement.Element2.collisionX();
                    collisionElement.Element2.collisionY();
                    break;
                case "leftTop":
                    this.collisionX();
                    collisionElement.Element2.collisionX();
                    break;
                case "rightBottom":
                    this.collisionY();
                    collisionElement.Element2.collisionY();
                    break;
                case "rightTop":
                    let tempX = this.speedX;
                    let tempY = this.speedY;
                    this.speedX = collisionElement.Element2.speedX;
                    this.speedY = collisionElement.Element2.speedY;
                    collisionElement.Element2.speedX = tempX;
                    collisionElement.Element2.speedY = tempY;
                    break;
            } 
        } else if (this.direction() == "rightBottom") {
            switch (collisionElement.Element2.direction()){
                case "leftTop":
                    this.collisionX();
                    this.collisionY();
                    collisionElement.Element2.collisionX();
                    collisionElement.Element2.collisionY();
                    break;
                case "leftBottom":
                    this.collisionX();
                    collisionElement.Element2.collisionX();
                    break;
                case "rightTop":
                    this.collisionY();
                    collisionElement.Element2.collisionY();
                    break;
                case "rightBottom":
                    let tempX = this.speedX;
                    let tempY = this.speedY;
                    this.speedX = collisionElement.Element2.speedX;
                    this.speedY = collisionElement.Element2.speedY;
                    collisionElement.Element2.speedX = tempX;
                    collisionElement.Element2.speedY = tempY;
                    break;
            }
        } else if (this.direction() == "leftBottom") {
            switch (collisionElement.Element2.direction()){
                case "rightTop":
                    this.collisionX();
                    this.collisionY();
                    collisionElement.Element2.collisionX();
                    collisionElement.Element2.collisionY();
                    break;
                case "rightBottom":
                    this.collisionX();
                    collisionElement.Element2.collisionX();
                    break;
                case "leftTop":
                    this.collisionY();
                    collisionElement.Element2.collisionY();
                    break;
                case "leftBottom":
                    let tempX = this.speedX;
                    let tempY = this.speedY;
                    this.speedX = collisionElement.Element2.speedX;
                    this.speedY = collisionElement.Element2.speedY;
                    collisionElement.Element2.speedX = tempX;
                    collisionElement.Element2.speedY = tempY;
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

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    }

    isContact() {        
        for (let i = 0; i <= gameElements.length - 1; i++) {
            let e = gameElements[i];
            if (e.constructor.name != "Ball") continue;
            let deltaX = this.positionX - e.positionX;
            let deltaY = this.positionY - e.positionY;
            if ((deltaY <= e.radius) && (deltaY >= -(this.height + e.radius))) {
                if (deltaX <= 0) {
                    if (deltaX > -(e.radius + this.width)) {
                        console.log(this.constructor.name + " - " + e.constructor.name);
                        e.positionX = this.positionX + this.width + e.radius;
                        if (collisionElements.length == 0) collisionElements.push(new CollisionElement(this, e, undefined, e.direction()));
                        else {
                            for(let i = 0; i <= collisionElements.length - 1; i++){
                                if (((this!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==e))||((e!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==this))){
                                    collisionElements.push(new CollisionElement(this, e, undefined, e.direction()));
                                    break;
                                } 
                            }
                        };
                    }
                } else {
                    if (deltaX <= e.radius) {
                        console.log(this.constructor.name + " - " + e.constructor.name);
                        e.positionX = this.positionX - e.radius;
                        if (collisionElements.length == 0) collisionElements.push(new CollisionElement(this, e, undefined, e.direction()));
                        else {
                            for(let i = 0; i <= collisionElements.length - 1; i++){
                                if (((this!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==e))||((e!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==this))){
                                    collisionElements.push(new CollisionElement(this, e, undefined, e.direction()));
                                    break;
                                } 
                            }
                        };
                    }
                }
            }
        }
    }

    reaction(collisionElement) {
        collisionElement.Element2.collisionX();
    }
}

function court() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cnvW, cnvH);
}


const ball1 = new Ball(radiusBall, 'white', 143, 250, -5, 5);
const ball3 = new Ball(radiusBall, 'green', 150, 280, 6, 3);
const ball6 = new Ball(radiusBall, 'lime', 90, 330, -5, -6);
const ball7 = new Ball(radiusBall, 'blue', 110, 330, -6, -6);
const ball8 = new Ball(radiusBall, 'green', 140, 220, 6, 8);
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


// gameElements.push(ball1, ball3, ball6, ball7, ball8, playerRocket, computerRocket);
gameElements.push(playerRocket, computerRocket, ball1, ball3, ball6, ball7, ball8);
// gameElements.push(playerRocket, computerRocket, ball1);
// gameElements.push(computerRocket, playerRocket, ball1);

// gameElements.push(ball1, playerRocket, computerRocket, ball2, ball3, ball4, ball5);
// gameElements.push(playerRocket, computerRocket);
// gameElements.push(playerRocket, computerRocket, ball1, ball2, ball3, ball4, ball5, ball6, ball7,  ball8, ball9, ball10, ball11, ball12, ball13, ball14, ball15, ball16);
// gameElements.push(ball1LT, ball1LT2, ball1RB, ball1LB, ball1RT, playerRocket, computerRocket);
// gameElements.push(ball1, ball2, ball3, ball4, ball5, ball6, ball7,  ball8, ball9, ball10, ball11, ball12, ball13, ball14, ball15, ball16);
// gameElements.push(ball4L, ball2, ball3, ball1, ball5, ball6, ball7,  ball8P, ball9, ball10, ball11, ball12, ball13, ball14, ball15, ball16);
// gameElements.push(ball1, ball4, ball8, ball10, ball13);
// gameElements.push(ball4, ball1, ball8, ball10, ball13);
// gameElements.push(ball1, ball3);//ok
// gameElements.push(ball4, ball1);//ok


//Test leftTop
const ball1LT = new Ball(radiusBall, 'white', 145, 250, 6, 6);
const ball1LT2 = new Ball(radiusBall, 'blue', 150, 280, 6, 3);
const ball1RB = new Ball(radiusBall, 'lime', 192, 280, -6, -4);
const ball1LB = new Ball(radiusBall, 'red', 150, 320, 5, -4);
const ball1RT = new Ball(radiusBall, 'yellow', 212, 250, -6, 5);
// gameElements.push(ball1LT, ball1LT2);//ok -x -y
// gameElements.push(ball1LT, ball1RB);//ok -x +y
// gameElements.push(ball1LT, ball1LB);//ok +x -y
// gameElements.push(ball1LT, ball1RT);//ok -x +y
// gameElements.push(ball1LT, ball1LT2, ball1RB, ball1LB, ball1RT);//wszystkie leftTop

// Test rightTop
const ball2RT = new Ball(radiusBall, 'white', 150, 300, -6, 3);
const ball2RT2 = new Ball(radiusBall, 'red', 148, 270, -6, 6);
const ball2LT = new Ball(radiusBall, 'lime', 70, 300, 5, 5);
const ball2RB = new Ball(radiusBall, 'blue', 148, 380, -6, -6);
const ball2LB = new Ball(radiusBall, 'yellow', 70, 350, 6, -6);
// gameElements.push(ball2RT, ball2RT2);//ok +x +y
// gameElements.push(ball2RT, ball2LT);//ok +x -y   // inna reakcja !!!
// gameElements.push(ball2RT, ball2RB);//ok +x -y
// gameElements.push(ball2RT, ball2LB);//ok +x =y    // inna reakcja!!!
// gameElements.push(ball2RT, ball2RT2, ball2LT, ball2RB, ball2LB);//wszystkie rightTop


// Test leftBottom
const ball3LB = new Ball(radiusBall, 'white', 550, 270, 6, -4);
const ball3LB2 = new Ball(radiusBall, 'red', 548, 350, 6, -6);
const ball3LT = new Ball(radiusBall, 'lime', 551, 170, 5, 5);
const ball3RB = new Ball(radiusBall, 'blue', 750, 271, -4, -4);
const ball3RT = new Ball(radiusBall, 'yellow', 680, 150, -6, 5);
// gameElements.push(ball3LB, ball3LB2);//ok +x -y
// gameElements.push(ball3LB, ball3LT);//ok +x +y
// gameElements.push(ball3LB, ball3RB);//ok -x -y
// gameElements.push(ball3LB, ball3RT);//ok -x +y
// gameElements.push(ball3LB, ball3LB2, ball3LT, ball3RB, ball3RT);//wszystkie leftBottom


// Test rightBottom
const ball4RB = new Ball(radiusBall, 'white', 750, 370, -6, -6);
const ball4RB2 = new Ball(radiusBall, 'red', 740, 320, -6, -4);
const ball4LT = new Ball(radiusBall, 'lime', 551, 170, 5, 5);
const ball4LB = new Ball(radiusBall, 'blue', 680, 371, 5, -4);
const ball4RT = new Ball(radiusBall, 'yellow', 751, 150, -6, 5);
// gameElements.push(ball4RB, ball4RB2);//ok +x +y
// gameElements.push(ball4RB, ball4LT);//ok +x +y
// gameElements.push(ball4RB, ball4LB);//ok +x -y
// gameElements.push(ball4RB, ball4RT);//ok -x +y
// gameElements.push(ball4RB, ball4RB2, ball4LT, ball4LB, ball4RT);//wszystkie rightBottom


function start(gameElements) {
    court();
    gameElements.forEach(element => {
        element.draw();
    });
    gameElements.forEach(element => {
        element.isContact();
    });
    if (collisionElements.length > 0) console.log(collisionElements);
    collisionElements.forEach(element => {
        element.Element1.reaction(element);
    });
    collisionElements = [];
    gameElements.forEach(element => {
        if (element.positionY <= element.radius) {
            element.positionY = element.radius;
            element.collisionY();
        };
        if (element.positionY >= cnv.height - element.radius) {
            element.positionY = cnv.height - element.radius;
            element.collisionY();
        }
        if (element.positionX <= element.radius) {
            element.positionX = element.radius;
            element.collisionX();
        };
        if (element.positionX >= cnv.width - element.radius) {
            element.positionX = cnv.width - element.radius;
            element.collisionX();
        }
    });
}

function game() {
    start(gameElements);
}

setInterval(game, interval);

window.addEventListener('keydown', (event) => {
    console.log(event.code);
    if (event.code === "KeyW") playerRocket.positionY -= playerRocket.speed;
    else if (event.code === "KeyS") playerRocket.positionY += playerRocket.speed;

    if (event.code === "ArrowUp") computerRocket.positionY -= computerRocket.speed;
    else if (event.code === "ArrowDown") computerRocket.positionY += computerRocket.speed;
  });
