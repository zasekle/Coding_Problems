const h = parseInt(readline());
const w = parseInt(readline());
const grid = [];
const lights = [];
for (let i = 0; i < h; i++) {
    const line = readline();
    console.error(line);
    for (let j = 0; j < w; j++) {
        if (line[j] != '.') {
            lights.push([i, j]);
        }
    }

    grid.push(line);
}

function lightToNum(c) {
    if (!isNaN(c)) {
        return Number(c);
    } else {
        return Math.min(35, c.charCodeAt(0) - 'A'.charCodeAt(0) + 10);
    }
}

function numToLight(i) {
    if (i < 10) {
        return i.toString();
    } else {
        return String.fromCharCode(Math.min(25, i-10) + 'A'.charCodeAt(0));
    }
}

function distance(i1, j1, i2, j2) {
    return Math.sqrt((i1 - i2)**2 + (j1 - j2)**2);
}

const lightGrid = Array.from({length: h}, () => Array(w).fill(0));
const b = 3;

for (let [lightI, lightJ] of lights) {
    const brightness = lightToNum(grid[lightI][lightJ]);
    console.error(brightness);
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            lightGrid[i][j] += Math.max(0, brightness - Math.round(distance(lightI, lightJ, i, j)));
        }
    }
}

lightGrid.forEach(x => console.log(x.map(y => numToLight(y)).join("")));
