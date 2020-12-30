const cnv = document.querySelector('canvas');
const ctx = cnv.getContext('2d');

const cnvW = cnv.width = 1200;
const cnvH = cnv.height = 600;

const ballSize = 16;


function ball(){
    ctx.arc(cnvW/2 - ballSize/2,cnvH/2 - ballSize/2, ballSize/2, 0, 2*Math.PI);
    ctx.fillStyle = 'lime';
    ctx.fill();
}

function court() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,cnvW,cnvH);
}

court();
ball();
