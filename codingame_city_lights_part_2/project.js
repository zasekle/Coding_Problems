const l = parseInt(readline());
const w = parseInt(readline());
const d = parseInt(readline());
const n = parseInt(readline());

const grid = [];
const lights = [];
for (let i = 0; i < d; i++) {
    const twoDGrid = [];
    for (let j = 0; j < w; j++) {
        const line = readline();

        for (let k = 0; k < l; k++) {
            if(line[k] != '.') {
                lights.push([i, j, k]);
            }
        }

        twoDGrid.push(line);
    }
    // get rid of blank line
    readline();
    grid.push(twoDGrid);
}

const distance = (i1, j1, k1, i2, j2, k2) => Math.sqrt((i1 - i2)**2 + (j1 - j2)**2 + (k1 - k2)**2);

const clamp = (n) => Math.min(35, Math.max(10, n));

function charToLight(c) {
    if (c >= '0' && c <= '9') {
        return Number(c);
    } else {
        return clamp(10 + c.charCodeAt(0) - 'A'.charCodeAt(0));
    }
}

function lightToChar(l) {
    if (l >= 0 && l <= 9) {
        return l.toString();
    } else {
        return String.fromCharCode(clamp(l) - 10 + 'A'.charCodeAt(0));
    }
}

const brightGrid = Array.from({length: d}, () => Array.from({length: w}, () => Array(l).fill(0)));

for (const [lightI, lightJ, lightK] of lights) {
    const brightness = charToLight(grid[lightI][lightJ][lightK]);
    for (let i = 0; i < d; i++) {
        for (let j = 0; j < w; j++) {
            for (let k = 0; k < l; k++) {
                brightGrid[i][j][k] += Math.max(0, brightness - Math.round(distance(i, j, k, lightI, lightJ, lightK)));
            }
        }
    }
}

for (let i = 0; i < d; i++) {
    if (i !== 0) {
        console.log("");
    }
    brightGrid[i].forEach(x => console.log(x.map(y => lightToChar(y)).join("")));
}
