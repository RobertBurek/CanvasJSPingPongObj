const cnv = document.querySelector('canvas');

const ctx = cnv.getContext('2d');

cnv.width = 1200;
cnv.height = 600;

function draw() {
    ctx.font = "120px Verdana";
    ctx.fillStyle = "black";
    
    

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
     
    render3dText(ctx, "Ping   Pong", cnv.width / 2, cnv.height / 2, 6);
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