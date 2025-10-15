const l = parseInt(readline());
const w = parseInt(readline());
const d = parseInt(readline());
const n = parseInt(readline());

const MAX_LIGHT = 35;
const MIN_LIGHT = 10;

const CODE_A = 'A'.charCodeAt(0);

const distance = (i1, j1, k1, i2, j2, k2) => Math.hypot(i1 - i2, j1 - j2, k1 - k2);

const clamp = (n, lo = MIN_LIGHT, hi = MAX_LIGHT) => Math.min(hi, Math.max(lo, n));

function charToLight(c) {
    if (c >= '0' && c <= '9') {
        return Number(c);
    } else {
        return clamp(10 + c.charCodeAt(0) - CODE_A);
    }
}

function lightToChar(l) {
    if (l >= 0 && l <= 9) {
        return l.toString();
    } else {
        return String.fromCharCode(clamp(l) - 10 + CODE_A);
    }
}

const lights = [];
const grid = Array.from({length: d}, (_, i) => {
    const plane = Array.from({length: w}, (_, j) => {
        const line = readline();
        for (let k = 0; k < l; k++) {
            if(line[k] != '.') lights.push({i, j, k, bright: charToLight(line[k])});
        }
        return line;
    });
    // get rid of blank line
    readline();
    return plane;
});

const brightGrid = Array.from({length: d}, () => Array.from({length: w}, () => Array(l).fill(0)));

for (const {i: li, j: lj, k: lk, bright: brightness} of lights) {
    for (let i = 0; i < d; i++) {
        for (let j = 0; j < w; j++) {
            for (let k = 0; k < l; k++) {
                const falloff = Math.round(distance(i, j, k, li, lj, lk));
                const contrib = Math.max(0, brightness - falloff);
                brightGrid[i][j][k] += contrib;
            }
        }
    }
}

for (let i = 0; i < d; i++) {
    if (i !== 0) console.log("");
    for (let j = 0; j < w; j++) {
        const line = brightGrid[i][j].map(y => lightToChar(y)).join("");
        console.log(line);
    }
}
