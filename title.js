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

function offset(canvas) {
    context = canvas.getContext('2d');
    context.fillStyle =  "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
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

function drawBoom(text, contex, font, width, height){
    contex.font = font;
    contex.fillStyle = "black";
    contex.textAlign = "center";
    contex.textBaseline = "middle";
    contex.fillText(text, width, height);
};

function boom(text, canvas, step, minSize, maxSize){
    contexL = canvas.getContext('2d');
    let size = minSize;
    let to = setInterval( () => {
        offset(canvas);
        size += step;
        let fontSize = "bold " + (10 + size) + "px Verdana";
        drawBoom(text, contexL, fontSize, canvas.width / 2, canvas.height / 2 + 10);
        if (size >= maxSize) clearInterval(to);
        }, 1);
}

function baam(text, canvas, step, minSize, maxSize){
    contexP = canvas.getContext('2d');
    let size = minSize;
    let to = setInterval( () => {
        offset(canvas);
        size += step;
        let fontSize = "bold " + (10 + size) + "px Verdana";
        drawBoom(text, contexP, fontSize, canvas.width / 2, canvas.height / 2 + 10);
        if (size >= maxSize) clearInterval(to);
        }, 1);
}