let frameCount = 0;

const startTime = new Date().getTime();

export const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d');

function init() {
    window.requestAnimationFrame(onframe);
}

import draw from "./draw";

function onframe() {
    const t = new Date().getTime() - startTime;

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 1000, 1000);

    draw(t);

    ++frameCount;

    window.requestAnimationFrame(onframe);
}

init();
