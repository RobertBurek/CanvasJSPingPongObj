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

//Test pion i poziom
// const ballH = new Ball(radiusBall, 'green', 400, 20, 0, 1);
// const ballV = new Ball(radiusBall, 'blue', 20, 400, 1, 0);
// gameElements.push(ballH, ballV);


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