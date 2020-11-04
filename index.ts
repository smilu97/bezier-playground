let frameCount = 0;

const startTime = new Date().getTime();

export const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d');

function init() {
    window.requestAnimationFrame(onframe);
    canvas.width = window.screen.width;
    canvas.height = window.screen.height;
    console.log('window.screen:', window.screen);
}

import draw from "./draw";

function onframe() {
    const t = new Date().getTime() - startTime;

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw(t);

    ++frameCount;

    window.requestAnimationFrame(onframe);
}

init();
