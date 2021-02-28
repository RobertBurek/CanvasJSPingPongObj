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
    ctx.fillRect(0, 0, cnvL.width, cnvL.height);
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

function boom(text, canvas, step, minSize, maxSize){
    contex = canvas.getContext('2d');
    let size = minSize;
    let to = setInterval( () => {
        offset(contex);
        size += step;
        let fontSize = "bold " + (10 + size) + "px Verdana";
        contex.font = fontSize;
        contex.fillStyle = "black";
        contex.textAlign = "center";
        contex.textBaseline = "middle";
        contex.fillText(text, canvas.width / 2, canvas.height / 2 );
        if (size >= maxSize) clearInterval(to);
    }, 1);
}