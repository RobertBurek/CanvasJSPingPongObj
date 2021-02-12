const cnv = document.getElementById('court');
const ctx = cnv.getContext('2d');
const cnvL = document.getElementById('pointsPlayer')
const ctxL = cnvL.getContext('2d');
const cnvR = document.getElementById('pointsComputer');
const ctxR = cnvR.getContext('2d');

cnv.width = 1200;
cnv.height = 600;
cnvL.width = 200;
cnvL.height = 200;
cnvR.width = 200;
cnvR.height = 200;

const title = "Ping   Pong";

function offset(ctx) {
    ctx.fillStyle =  "white";
    ctx.fillRect(0, 0, cnvL.width, cnvL.height); // zmien na wspólne wartości H i V
};



function drawTitle() {
    ctx.font = "bold 120px Verdana";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    render3dText(ctx, title, cnv.width / 2, cnv.height / 2, 6);
}
 
function render3dText(ctx, text, x, y, textDepth) {
    let i;
    for (i = 0; i < textDepth; i++) {
        ctx.fillText(text, x - i, y - i);
    }
     
    ctx.fillStyle = "#0094ed";
    ctx.fillStyle = "#aa94ed";
    ctx.shadowColor = "#000000";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = textDepth + 2;
    ctx.shadowOffsetY = textDepth + 2;
    ctx.fillText(text, x - i, y - i);
}

let step = 0;

let boomTextRun = function boomText(){
    offset(ctxL);
    offset(ctxR);
    step +=5;
    let fontSize = "bold " + (10 + step) + "px Verdana";
    ctxL.font = fontSize;
    ctxL.fillStyle = "black";
    ctxL.textAlign = "center";
    ctxL.textBaseline = "middle";
    ctxL.fillText("0", cnvL.width / 2, cnvL.height / 2 );
    ctxR.font = fontSize;
    ctxR.fillStyle = "black";
    ctxR.textAlign = "center";
    ctxR.textBaseline = "middle";
    ctxR.fillText("0", cnvR.width / 2, cnvR.height / 2 );
    if (step >= 150) clearInterval(titleRun);
}

let titleRun = setInterval(boomTextRun, 1);

drawTitle();