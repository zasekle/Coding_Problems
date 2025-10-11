const h = parseInt(readline());
const w = parseInt(readline());

const grid = [];
const lights = [];

for (let i = 0; i < h; i++) {
    const line = readline();
    for (let j = 0; j < w; j++) {
        if (line[j] != '.') lights.push([i, j]);
    }

    grid.push(line);
}

const A_CODE = "A".charCodeAt(0);

const clamp = (x, min, max) => (x < min ? min : x > max ? max : x);

function lightToNum(ch) {
    if (ch >= "0" && ch <= "9" ) return ch.charCodeAt(0) - "0".charCodeAt(0);
    const val = ch.charCodeAt(0) - A_CODE + 10;
    return clamp(val, 0, 35);
}

function numToLight(n) {
    if (n <= 9) return String(n);
    const capped = clamp(n - 10, 0, 25);
    return String.fromCharCode(A_CODE + capped);
}

const distance = (i1, j1, i2, j2) => Math.floor(Math.hypot(i1 - i2, j1 - j2) + 0.5);

const lightGrid = Array.from({length: h}, () => Array(w).fill(0));

for (let [lightI, lightJ] of lights) {
    const brightness = lightToNum(grid[lightI][lightJ]);
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            lightGrid[i][j] += Math.max(0, brightness - Math.round(distance(lightI, lightJ, i, j)));
        }
    }
}

for (const row of lightGrid) {
    console.log(row.map(y => numToLight(y)).join(""))
}
