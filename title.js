const cnvL = document.getElementById('pointsPlayer')
const ctxL = cnvL.getContext('2d');
const cnvR = document.getElementById('pointsComputer');
const ctxR = cnvR.getContext('2d');

cnvL.width = 200;
cnvL.height = 200;
cnvR.width = 200;
cnvR.height = 200;

function offset(canvas) {
    context = canvas.getContext('2d');
    context.fillStyle =  "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
};

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