const cnv = document.getElementById('court');
const ctx = cnv.getContext('2d');
const cnvL = document.getElementById('pointsPlayer')
const ctxL = cnvL.getContext('2d');
const cnvR = document.getElementById('pointsComputer');
const ctxR = cnvR.getContext('2d');

cnv.width = 1200;
cnv.height = 600;
cnvL.width = 100;
cnvL.height = 100;
cnvR.width = 100;
cnvR.height = 100;

const title = "Ping   Pong";



function draw() {
    ctx.font = "120px Verdana";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctxL.font = "50px Verdana";
    ctxL.fillStyle = "black";
    ctxL.textAlign = "center";
    ctxL.textBaseline = "middle";
    ctxR.font = "50px Verdana";
    ctxR.fillStyle = "black";
    ctxR.textAlign = "center";
    ctxR.textBaseline = "middle";
     
    render3dText(ctx, title, cnv.width / 2, cnv.height / 2, 6);
    ctxL.fillText("0", cnvL.width / 2, cnvL.height / 2);
    ctxR.fillText("0", cnvR.width / 2, cnvR.height / 2);
}
 
function render3dText(ctx, text, x, y, textDepth) {
    var i;
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

draw();