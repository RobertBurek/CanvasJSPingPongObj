const cnv = document.getElementById('court');
const ctx = cnv.getContext('2d');

const cnvL = document.getElementById('pointsPlayer')
const ctxL = cnvL.getContext('2d');
const cnvR = document.getElementById('pointsComputer');
const ctxR = cnvR.getContext('2d');

var windowWidth = 1200;
var windowHeight = 600;
if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    windowWidth = document.body.clientWidth;
    windowHeight = document.body.clientHeight;
  }

// const cnvW = cnv.width = window.width*0.7;
// const cnvH = cnv.height = cnvW/2;
let cnvW; // cnv.width = Math.floor(windowWidth * 0.7);
let centerWidth;// = Math.floor(cnvW / 2);
let cnvH; // = cnv.height = Math.floor(windowHeight * 0.8);
let centerHeight; // = Math.floor(cnvH / 2);
// console.log(windowWidth);
// console.log(cnvW);
// console.log(windowHeight);
// console.log(cnvH);
// cnvL.width = cnvL.height = cnvR.width = cnvR.height = maxSize = windowWidth * 0.14;
// cnvL.height = cnvL.width;
// cnvR.width = windowWidth * 0.14;
// cnvR.height = cnvL.width;


const menuButton = document.querySelector(".menuButton");
menuButton.style.fontSize = "10px";

let radiusBall; // = 8;
// const widthRocket = 20;
let widthRocket; //= (Math.floor(cnvW / 60) + 5);
// const heightRocket = 150;
let heightRocket; //= Math.floor(cnvH / 4);

// const deltaRocket = 30;
let deltaRocket; // = widthRocket;
let interval = 15;
const divPointsPlayer = document.getElementById("pointsPlayer");
const divPointsComputer = document.getElementById("pointsComputer");
const easyLevel = document.getElementById("easy");
const mediumLevel = document.getElementById("medium");
const hardLevel = document.getElementById("hard");
const nextBall = document.getElementById("nextBall");
const listColorNextBall = ["Blue", "Yellow", "Lime", "Red", "Green", "Gray", "White", "Orange", "Deeppink", "Greenyellow", "Gold"];
// var losowa = Math.floor(Math.random() * listColorNextBall.length);
var colorNextBall = listColorNextBall[Math.floor(Math.random() * listColorNextBall.length)];
nextBall.style.background = colorNextBall;
const startButton = document.getElementById("start");
let pointsPlayer = 0;
let pointsComputer = 0;
let collisionElements = [];
let gameElements = [];
let newGameElements = [];
let reactionMoment; // = cnvW * 0.5;
let myInterval;
let pause = false;
let sizeChanged = false;

let fontSizeH;
let fontSizeW;
// console.log(fontSize);
let fontSizeText; // = "" + fontSize + "px";
// easyLevel.style.fontSize = fontSizeText;
// mediumLevel.style.fontSize = fontSizeText;
// hardLevel.style.fontSize = fontSizeText;
// nextBall.style.fontSize = fontSizeText;
// startButton.style.fontSize = fontSizeText;

function scackling(){
    cnvW = cnv.width = Math.floor(windowWidth * 0.7);
    centerWidth = Math.floor(cnvW / 2);
    cnvH = cnv.height = Math.floor(windowHeight * 0.8);
    centerHeight = Math.floor(cnvH / 2);
    cnvL.width = cnvL.height = cnvR.width = cnvR.height = maxSize = windowWidth * 0.14;
    radiusBall = 8;
    widthRocket = (Math.floor(cnvW / 60) + 5); //20
    heightRocket = Math.floor(cnvH / 4); //150
    deltaRocket = widthRocket;
    reactionMoment = cnvW * 0.5;
    fontSizeH = Math.floor(cnvH * 0.03);
    fontSizeW = Math.floor(cnvW * 0.03);
    if (fontSizeH > fontSizeW) fontSizeText = "" + fontSizeW + "px";
    else fontSizeText = "" + fontSizeH + "px";
    easyLevel.style.fontSize = fontSizeText;
    mediumLevel.style.fontSize = fontSizeText;
    hardLevel.style.fontSize = fontSizeText;
    nextBall.style.fontSize = fontSizeText;
    startButton.style.fontSize = fontSizeText;
    console.log("szerokość okna: " + windowWidth);
    console.log("szerokość boiska: " + cnvW);
    console.log("wysokość okna: " + windowHeight);
    console.log("wysokość boiska: " + cnvH);
    console.log("wielkość czcionki przycisków menu: " + fontSizeText);
}

scackling();



class CollisionElement {
    constructor (Element1, Element2, directionEl1, directionEl2) {
        this.Element1 = Element1;
        this.Element2 = Element2;
        this.directionEl1 = directionEl1;
        this.directionEl2 = directionEl2;
    };
};

class Ball {
    constructor (radius, color, positionX, positionY, speedX, speedY) {
        this.color = color;
        this.positionX = positionX;
        this.positionY = positionY;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.vector = Math.sqrt(Math.pow(this.speedY, 2) + Math.pow(this.speedX, 2));
    };

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        ctx.fill(); 
        ctx.closePath();
        this.move();
    };

    move() {
        this.positionX += this.speedX;
        this.positionY += this.speedY;
    };

    isBorder() {
        if (this.positionY <= this.radius) {
            this.positionY = this.radius;
            this.collisionY();
        };
        if (this.positionY >= cnvH - this.radius) {
            this.positionY = cnvH - this.radius;
            this.collisionY();
        }
        if (this.positionX < 0) {
            pointsComputer += 1;
            baam(pointsComputer, cnvR, 5, 0, maxSize);
            // divPointsComputer.innerHTML = pointsComputer;
            // divPointsComputer.classList.toggle("boom");
            // divPointsComputer.classList.toggle("baam");
            for (let gameEl of gameElements) {
                if (gameEl !== this) newGameElements.push(gameEl);
            }
        };
        if (this.positionX > cnvW) {
            pointsPlayer += 1;
            boom(pointsPlayer, cnvL, 5, 0, maxSize);
            // divPointsPlayer.innerHTML = pointsPlayer;
            // divPointsPlayer.classList.toggle("boom");
            // divPointsPlayer.classList.toggle("baam");
            for (let gameEl of gameElements) {
                if (gameEl !== this) newGameElements.push(gameEl);
            }
        }
    }

    direction() {
        if (this.speedX >= 0 && this.speedY >= 0 ) return "leftTop";
        if (this.speedX <= 0 && this.speedY >= 0 ) return "rightTop";
        if (this.speedX >= 0 && this.speedY <= 0 ) return "leftBottom";
        if (this.speedX <= 0 && this.speedY <= 0 ) return "rightBottom";
    };

    isContact() {
        for (let i = 0; i <= gameElements.length - 1; i++) {
            let e = gameElements[i];
            if (this === e) continue;
            if (e.constructor.name != "Ball") continue;
            let deltaX = this.positionX - e.positionX;
            let deltaY = this.positionY - e.positionY;
            let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
            if (distance <= 2 * this.radius) {
                // console.log(this.constructor.name + " - " + e.constructor.name);
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
                // let alfa = Math.acos((this.speedX * e.speedX + this.speedY * e.speedY)/(this.vector * e.vector)) * 180 / Math.PI;
                // console.log(alfa);
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
                        };
                    };
                };
            };
        };
    };

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
            };
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
            };
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
            };
        };
    };

    collisionX() {
      this.speedX *= -1;
    };

    collisionY() {
      this.speedY *= -1;
    };

}

class  Rocket {
    constructor (width, height, color, positionX, positionY){
        this.width = width;
        this.height = height;
        this.color = color;
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = 4;
        this.directionX = true;
        this.directionY = true;
        this.direction = "sleep";
    };

    sleep() {
        setTimeout(()=>{
            this.direction = "sleep";
        }, 1000);
    };

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    };

    moveUp() {
        this.positionY -= this.speed;
        this.direction = "bottom";
    };

    moveDown() {
        this.positionY += this.speed;
        this.direction = "top";
    };

    isBorder() {
        if (this.positionY <= 0) this.positionY = 0;
        if (this.positionY >= cnvH - this.height) this.positionY = cnvH - this.height;
    }

    isContact() {
        for (let i = 0; i <= gameElements.length - 1; i++) {
            let e = gameElements[i];
            if (e.constructor.name != "Ball") continue;
            let deltaX = this.positionX - e.positionX;
            let deltaY = this.positionY - e.positionY;
            if ((deltaY <= e.radius) && (deltaY >= -(this.height + e.radius))) {
                if (deltaX <= 0) {
                    if (deltaX > -(e.radius + this.width - e.speedX)) {
                        // console.log(this.constructor.name + " - " + e.constructor.name);
                        e.positionX = this.positionX + this.width + e.radius;
                        if (collisionElements.length == 0) collisionElements.push(new CollisionElement(this, e, this.direction, e.direction()));
                        else {
                            for(let i = 0; i <= collisionElements.length - 1; i++){
                                if (((this!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==e))||((e!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==this))){
                                    collisionElements.push(new CollisionElement(this, e, this.direction, e.direction()));
                                    break;
                                } 
                            }
                        };
                    };
                } else {
                    if (deltaX <= e.radius + e.speedX) {
                        // console.log(this.constructor.name + " - " + e.constructor.name);
                        e.positionX = this.positionX - e.radius;
                        if (collisionElements.length == 0) collisionElements.push(new CollisionElement(this, e, this.direction, e.direction()));
                        else {
                            for(let i = 0; i <= collisionElements.length - 1; i++){
                                if (((this!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==e))||((e!==collisionElements[i].Element2)&&(collisionElements[i].Element1!==this))){
                                    collisionElements.push(new CollisionElement(this, e, this.direction, e.direction()));
                                    break;
                                }; 
                            };
                        };
                    };
                };
            };
        };
    };

    reaction(collisionElement) {
        let increaseSpeed = 1.05;
        if (Math.abs(collisionElement.Element2.speedX) <= Math.floor((cnvW - 100) / increaseSpeed)) collisionElement.Element2.speedX *= increaseSpeed;
        if (Math.abs(collisionElement.Element2.speedY) <= Math.floor((cnvH - 100) / increaseSpeed)) collisionElement.Element2.speedY *= increaseSpeed;
        if (collisionElement.directionEl1 == "bottom" && (collisionElement.directionEl2 == "leftTop" || collisionElement.directionEl2 == "rightTop")) collisionElement.Element2.collisionY();
        if (collisionElement.directionEl1 == "top" && (collisionElement.directionEl2 == "leftBottom" || collisionElement.directionEl2 == "rightBottom")) collisionElement.Element2.collisionY();
        collisionElement.Element2.collisionX();
    };
};

function court() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cnvW, cnvH);
};

function returnXY(){
    var x = Math.floor(Math.random() * 8) + 3;
    if (Math.random() < 0.49) x = -1 * x;
    return x;
}

function returnColor(){
    return listColorNextBall[Math.floor(Math.random() * listColorNextBall.length)];
}


// ElemtsGameStart:
    var ball1 = new Ball(radiusBall, returnColor(), centerWidth, centerHeight - 10, returnXY(), returnXY());
    var ball2 = new Ball(radiusBall, returnColor(), centerWidth, centerHeight + 10, returnXY(), returnXY());
    var ball3 = new Ball(radiusBall, returnColor(), centerWidth, centerHeight, returnXY(), returnXY());
    // var ball1 = new Ball(radiusBall, 'white', centerWidth, centerHeight - 10, returnXY(), returnXY());
    // var ball2 = new Ball(radiusBall, 'red', centerWidth, centerHeight + 10, returnXY(), returnXY());
    // var ball3 = new Ball(radiusBall, 'lime', centerWidth, centerHeight, returnXY(), returnXY());
    const playerRocket = new Rocket(widthRocket, heightRocket, 'blue', deltaRocket, (cnvH / 2 - heightRocket / 2));
    const computerRocket = new Rocket(widthRocket, heightRocket, 'red', (cnvW - deltaRocket - widthRocket), (cnvH / 2 - heightRocket / 2));
    gameElements.push(playerRocket, computerRocket, ball1, ball2, ball3);

function recountGameElements(){
    playerRocket.width = widthRocket;
    playerRocket.height = heightRocket;
    playerRocket.positionX = deltaRocket;
    playerRocket.positionY = (cnvH / 2 - heightRocket / 2);
    computerRocket.width = widthRocket;
    computerRocket.height = heightRocket;
    computerRocket.positionX = (cnvW - deltaRocket - widthRocket);
    computerRocket.positionY = (cnvH / 2 - heightRocket / 2);
    boom(pointsPlayer, cnvL, 5, 0, maxSize);
    baam(pointsComputer, cnvR, 5, 0, maxSize);
}


// Inne rózne ball:
// const hBall = new Ball(radiusBall, 'white', 122, 330, -8, 0);
// const ball8 = new Ball(radiusBall, 'green', 140, 220, 6, 8);
// const ball9 = new Ball(radiusBall, 'lime', 780, 254, 4, 4);
// const ball10 = new Ball(radiusBall, 'yellow', 220, 387, 3, -5);
// const ball11 = new Ball(radiusBall, 'red', 790, 25, 5, 5);
// const ball12 = new Ball(radiusBall, 'blue', 458, 360, -6, -3);
// const ball13 = new Ball(radiusBall, 'lime', 620, 333, 4, 5);
// const ball14 = new Ball(radiusBall, 'yellow', 680, 222, -4, 3);
// const ball15 = new Ball(radiusBall, 'lime', 355, 111, 5, 4);
// const ball16 = new Ball(radiusBall, 'green', 156, 68, -5, 5);


//Różne testy
// gameElements.push(ball1, ball3, ball6, ball7, ball8, playerRocket, computerRocket);
// gameElements.push(playerRocket, computerRocket, ball1, ball3, ball6, ball7, ball8);
// gameElements.push(playerRocket, computerRocket, ball1);
// gameElements.push(playerRocket, computerRocket);
// gameElements.push(computerRocket, playerRocket, hBall);
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
const ball1LT = new Ball(radiusBall, 'white', 445, 250, 6, 6);
const ball1LT2 = new Ball(radiusBall, 'blue', 450, 280, 6, 3);
const ball1RB = new Ball(radiusBall, 'lime', 492, 280, -6, -4);
const ball1LB = new Ball(radiusBall, 'red', 450, 320, 5, -4);
const ball1RT = new Ball(radiusBall, 'yellow', 512, 250, -6, 5);
// gameElements.push(ball1LT, ball1LT2);//ok -x -y
// gameElements.push(ball1LT, ball1RB);//ok -x +y
// gameElements.push(ball1LT, ball1LB);//ok +x -y
// gameElements.push(ball1LT, ball1RT);//ok -x +y
// gameElements.push(ball1LT, ball1LT2, ball1RB, ball1LB, ball1RT);//wszystkie leftTop

// Test rightTop
const ball2RT = new Ball(radiusBall, 'white', 650, 300, -6, 3);
const ball2RT2 = new Ball(radiusBall, 'red', 648, 270, -6, 6);
const ball2LT = new Ball(radiusBall, 'lime', 570, 300, 5, 5);
const ball2RB = new Ball(radiusBall, 'blue', 648, 380, -6, -6);
const ball2LB = new Ball(radiusBall, 'yellow', 570, 350, 6, -6);
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
const ball3RT = new Ball(radiusBall, 'yellow', 850, 50, -6, 5);
// gameElements.push(ball3LB, ball3LB2);//ok +x -y
// gameElements.push(ball3LB, ball3LT);//ok +x +y
// gameElements.push(ball3LB, ball3RB);//ok -x -y
// gameElements.push(ball3LB, ball3RT);//ok -x +y
// gameElements.push(ball3LB, ball3LB2, ball3LT, ball3RB, ball3RT);//wszystkie leftBottom


// Test rightBottom
const ball4RB = new Ball(radiusBall, 'white', 750, 370, -6, -6);
const ball4RB2 = new Ball(radiusBall, 'red', 740, 320, -6, -4);
const ball4LT = new Ball(radiusBall, 'lime', 551, 170, 6, 6);
const ball4LB = new Ball(radiusBall, 'blue', 680, 371, 5, -4);
const ball4RT = new Ball(radiusBall, 'yellow', 751, 150, -6, 5);
// gameElements.push(ball4RB, ball4RB2);//ok +x +y
// gameElements.push(ball4RB, ball4LT);//ok +x +y
// gameElements.push(ball4RB, ball4LB);//ok +x -y
// gameElements.push(ball4RB, ball4RT);//ok -x +y
// gameElements.push(ball4RB, ball4RB2, ball4LT, ball4LB, ball4RT);//wszystkie rightBottom

function AIcomputer (elements) {
    elements.forEach(element => {
        if (element.constructor.name == "Ball") {
            if (((element.direction() == "leftTop") || (element.direction() == "leftBottom")) && (element.positionX > reactionMoment)) {
                let deltaY = computerRocket.positionY - element.positionY + computerRocket.height / 2;
                if (deltaY > 0) computerRocket.positionY -= computerRocket.speed;
                else computerRocket.positionY += computerRocket.speed;
            }
        }
    })
};


document.addEventListener('keydown', (event) => {
    // console.log(event.code);
    if (event.code === "KeyW") {
        playerRocket.moveUp();
        playerRocket.sleep();
    } else if (event.code === "KeyS") {
        playerRocket.moveDown();
        playerRocket.sleep();
    };
    if (event.code === "ArrowUp") {
        computerRocket.moveUp();
        computerRocket.sleep();
    } else if (event.code === "ArrowDown") {
        computerRocket.moveDown();
        computerRocket.sleep();
    };
    if (event.code === "Space") {
        console.log(pause);
        if (!pause) {
            clearInterval(myInterval);
            pause = true;
        } else {
            myInterval = setInterval(game, interval);
            pause = false;
        }
    };
    if (event.code === "KeyA") {
        myInterval = setInterval(game, interval);
    };
    if (event.code === "NumpadAdd") {
        clearInterval(myInterval);
        if (interval > 5) interval -= 5;
        myInterval = setInterval(game, interval);
    };
    if (event.code === "NumpadSubtract") {
        clearInterval(myInterval);
        interval += 5;
        myInterval = setInterval(game, interval);
    };
    if (event.code === "F2") {
        addNewBall();
    };
    console.log(event.code);
});

cnv.addEventListener("mousemove", (event) => {
    playerRocket.positionY =  event.clientY - cnv.offsetTop - playerRocket.height / 2;
});

function focusLevelClass(element){
    easyLevel.classList.remove("focusLevel");
    mediumLevel.classList.remove("focusLevel");
    hardLevel.classList.remove("focusLevel");
    element.classList.add("focusLevel");
};

easyLevel.addEventListener("click", () => {
  playerRocket.height = heightRocket * 1.2;
  computerRocket.height = heightRocket * 0.8;
  reactionMoment = cnvW * 0.75;
  computerRocket.speed = 3;
  currentlyLevel = easyLevel;
  focusLevelClass(easyLevel);
});

mediumLevel.addEventListener("click", () => {
  playerRocket.height = heightRocket
  computerRocket.height = heightRocket;
  reactionMoment = cnvW * 0.5;
  computerRocket.speed = 4;
  focusLevelClass(mediumLevel);
});

hardLevel.addEventListener("click", () => {
  playerRocket.height = heightRocket * 0.8;
  computerRocket.height = heightRocket * 1.2;
  reactionMoment = cnvW * 0.25;
  computerRocket.speed = 5;
  focusLevelClass(hardLevel);
});



function addNewBall(){
    // var x = Math.floor(Math.random() * 8) + 3;
    // if (Math.random() < 0.49) x = -1 * x; 
    // console.log(x);
    // var y = Math.floor(Math.random() * 8) + 3;
    // if (Math.random() < 0.49) y = -1 * y;
    // console.log(y);
    const newBall = new Ball(radiusBall, colorNextBall, centerWidth, centerHeight, returnXY(), returnXY());
    gameElements.push(newBall);
    // losowa = Math.floor(Math.random() * listColorNextBall.length);
    colorNextBall = returnColor();
    nextBall.style.background = colorNextBall;
};


nextBall.addEventListener("click", () => {
    addNewBall();
  }
);

let windowWidthChanged;
let windowHeightChanged;
function checkingSize(){
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        windowWidthChanged = window.innerWidth;
        windowHeightChanged = window.innerHeight;
      } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        windowWidthChanged = document.documentElement.clientWidth;
        windowHeightChanged = document.documentElement.clientHeight;
      } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        windowWidthChanged = document.body.clientWidth;
        windowHeightChanged = document.body.clientHeight;
      }
    if ((windowWidthChanged !== windowWidth) || (windowHeightChanged !== windowHeight)) {
        windowWidth = windowWidthChanged;
        windowHeight = windowHeightChanged;
        scackling();
        recountGameElements();
        return true;
    } else 
        return false;
}


function start(elements) {
    if (checkingSize()) {
        console.log("Zmieniono wielkość okna!");
    }
    court();
    elements.forEach(element => {
        element.isBorder();
        element.draw();
    });
    elements.forEach(element => {
        element.isContact();
    });
    collisionElements.forEach(element => {
        element.Element1.reaction(element);
    });
    collisionElements = [];
    if (newGameElements.length > 0 ) {
        gameElements = newGameElements;
        newGameElements = [];
    }
    AIcomputer(elements);
};

function game() {
    start(gameElements);
};


court();
gameElements.forEach(element => {
    element.isBorder();
    element.draw();
});

boom(pointsPlayer, cnvL, 5, 0, maxSize);
baam(pointsComputer, cnvR, 5, 0, maxSize);

startButton.addEventListener("click", () => {
   startButton.classList.add("stop");
   console.log("kliknąłem start");
   boom('GO', cnv, 30, 100, 500);
   myInterval = setInterval(game, interval);
});
