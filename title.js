function offset(canvas) {
    context = canvas.getContext('2d');
    // context.fillStyle =  "white";
    context.fillStyle =  "DarkGray";

    // context.fillStyle =  rgb(177, 177, 177);
    context.fillRect(0, 0, canvas.width, canvas.height);
};

function drawBoom(text, color, contex, font, width, height){
    contex.font = font;
    contex.fillStyle = color;
    contex.textAlign = "center";
    contex.textBaseline = "middle";
    contex.fillText(text, width, height);
};

function boom(text, color, canvas, steep, minSize, maxSize){
    contexL = canvas.getContext('2d');
    let size = minSize;
    let to = setInterval( () => {
        offset(canvas);
        size += steep;
        let fontSize = "bold " + (10 + size) + "px Verdana";
        // if (text > 9) {fontSize = "bold " + Math.floor((10 + size) * 0.7) + "px Verdana";}
        drawBoom(text, color, contexL, fontSize, canvas.width / 2, canvas.height / 2 + 10);
        if (size >= maxSize * 0.6) clearInterval(to);
    }, 1);
}

function baam(text, color, canvas, steep, minSize, maxSize){
    contexP = canvas.getContext('2d');
    let size = minSize;
    let to = setInterval( () => {
        offset(canvas);
        size += steep;
        let fontSize = "bold " + (10 + size) + "px Verdana";
        // if (text > 9) {fontSize = "bold " + Math.floor((10 + size) * 0.7) + "px Verdana";}
        drawBoom(text, color, contexP, fontSize, canvas.width / 2, canvas.height / 2 + 10);
        if (size >= maxSize * 0.6) clearInterval(to);
    }, 1);
}