const cnv = document.querySelector('canvas');

const ctx = cnv.getContext('2d');

const cnvW = cnv.width = 1200;
const cnvH = cnv.height = 600;

function court() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,cnvW,cnvH);
}

court();
