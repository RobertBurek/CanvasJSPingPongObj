// const cnv = document.getElementById('court');
// const ctx = cnv.getContext('2d');
const cnvL = document.getElementById('pointsPlayer')
const ctxL = cnvL.getContext('2d');
const cnvR = document.getElementById('pointsComputer');
const ctxR = cnvR.getContext('2d');

// cnv.width = 1200;
// cnv.height = 600;
cnvL.width = 200;
cnvL.height = 200;
cnvR.width = 200;
cnvR.height = 200;

const title = "Ping   Pong";

function offset(ctx) {
    ctx.fillStyle =  "white";
    ctx.fillRect(0, 0, cnvL.width, cnvL.height); // zmien na wspólne wartości H i V
};



// function drawTitle() {
//     ctx.font = "bold 120px Verdana";
//     ctx.fillStyle = "black";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     render3dText(ctx, title, cnv.width / 2, cnv.height / 2, 6);
// }
 
// function render3dText(ctx, text, x, y, textDepth) {
//     let i;
//     for (i = 0; i < textDepth; i++) {
//         ctx.fillText(text, x - i, y - i);
//     }
     
//     ctx.fillStyle = "#0094ed";
//     ctx.fillStyle = "#aa94ed";
//     ctx.shadowColor = "#000000";
//     ctx.shadowBlur = 12;
//     ctx.shadowOffsetX = textDepth + 2;
//     ctx.shadowOffsetY = textDepth + 2;
//     ctx.fillText(text, x - i, y - i);
// }

let step = 0;
// let countDown = "GO";

let boomTextRun = function boom(){
    offset(ctxL);
    offset(ctxR);
    if (pointsPlayer == "GO") step += 30;
        else step += 5;
    let fontSize = "bold " + (10 + step) + "px Verdana";
    ctxL.font = fontSize;
    ctxL.fillStyle = "black";
    ctxL.textAlign = "center";
    ctxL.textBaseline = "middle";
    ctxL.fillText(pointsPlayer, cnvL.width / 2, cnvL.height / 2 );
    ctxR.font = fontSize;
    ctxR.fillStyle = "black";
    ctxR.textAlign = "center";
    ctxR.textBaseline = "middle";
    ctxR.fillText(pointsComputer, cnvR.width / 2, cnvR.height / 2 );
    // if (step == 50) offset(ctxL);
    // if (step == 100) offset(ctxL);
    // if (step == 150) offset(ctxL);
    // if (step == 195) offset(ctxL);
    // if (step >= 200) clearInterval(titleRun);
    // if (step >= 200 && countDown != "GO") clearInterval(titleRun);
    if (step >= 200 && poinsPlayer == "GO") {
        if (step >= 1000) {
            clearInterval(titleRun);
            step = 100;
            poinsPlayer = 0;
            poinsComputer = 0;
            boom();
        }
    }
    
}

let boomPointsPlayer = function boom(){
    offset(ctxL);
    offset(ctxR);
    if (pointsPlayer == "GO") step += 30;
        else step += 5;
    let fontSize = "bold " + (10 + step) + "px Verdana";
    ctxL.font = fontSize;
    ctxL.fillStyle = "black";
    ctxL.textAlign = "center";
    ctxL.textBaseline = "middle";
    ctxL.fillText(pointsPlayer, cnvL.width / 2, cnvL.height / 2 );
    ctxR.font = fontSize;
    ctxR.fillStyle = "black";
    ctxR.textAlign = "center";
    ctxR.textBaseline = "middle";
    ctxR.fillText(pointsComputer, cnvR.width / 2, cnvR.height / 2 );
    // if (step == 50) offset(ctxL);
    // if (step == 100) offset(ctxL);
    // if (step == 150) offset(ctxL);
    // if (step == 195) offset(ctxL);
    // if (step >= 200) clearInterval(titleRun);
    // if (step >= 200 && countDown != "GO") clearInterval(titleRun);
    if (step >= 200 && poinsPlayer == "GO") {
        if (step >= 1000) {
            clearInterval(titleRun);
            step = 100;
            poinsPlayer = 0;
            poinsComputer = 0;
            boom();
        }
    }
    
}

// let titleRun = setInterval(boomTextRun, 1);
let boomPoints = setInterval(boomPointsPlayer, 1);

// function run() {
//     // if (countDown > 1) countDown -= 1;
//     // else countDown = "GO";
//     step = 0;
//     titleRun = setInterval(boomTextRun, 1);
//     if (countDown == "GO") countDown = 0;
//     // clearInterval(startGame);
// }

// let startGame = setInterval(run,1000);

// drawTitle();