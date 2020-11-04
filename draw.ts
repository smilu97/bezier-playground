import { canvas, ctx } from ".";

export type Vector2D = [number, number];
export type Vector3D = [number, number, number];

const pointSize = 5;
const clickedPoints: Vector2D[] = [];

canvas.addEventListener('click', (ev: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = (ev.clientX - rect.left) * canvas.width / canvas.clientWidth;
    const y = (ev.clientY - rect.top ) * canvas.height / canvas.clientHeight;
    clickedPoints.push([x, y]);
});

function weightedAverage(a: number, b: number, t: number) {
    return a * (1.0 - t) + b * t;
}

function weightedAverageVector2D(a: Vector2D, b: Vector2D, t: number): Vector2D {
    return [[a[0],b[0]],[a[1],b[1]]].map(v => weightedAverage(v[0], v[1], t)) as Vector2D;
}

function weightedAverageVector3D(a: Vector3D, b: Vector3D, t: number): Vector3D {
    return [[a[0],b[0]],[a[1],b[1]],[a[2],b[2]]].map(v => weightedAverage(v[0], v[1], t)) as Vector3D;
}

function vector3DToColor(v: Vector3D): string {
    return `rgb(${v[0]}, ${v[1]}, ${v[2]})`;
}

function bezierPoints(points: Vector2D[], t: number) {
    const res: Vector2D[] = [];
    for (let i = 0; i < points.length - 1; i++) {
        res.push(weightedAverageVector2D(points[i], points[i+1], t));
    }
    return res;
}

function drawPoints(points: Vector2D[], color: string) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        ctx.beginPath();
        ctx.arc(point[0], point[1], pointSize, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function draw(t: number) {
    let points = [...clickedPoints];
    
    const startColorVec: Vector3D = [255, 0, 0];
    const endColorVec: Vector3D = [0, 0, 255];

    while (points.length > 0) {
        const colorT = points.length / (clickedPoints.length - 1);
        const colorVec = weightedAverageVector3D(startColorVec, endColorVec, colorT);
        drawPoints(points, vector3DToColor(colorVec));
        points = bezierPoints(points, (t % 1000) / 1000);
    }
}

export default draw;
