const h = parseInt(readline());
const grid = Array.from({ length: h }, () => readline().split(' ').map(Number));
const w = grid[0].length;
const DIRS = [[-1, -1], [0, -1], [+1, -1], [+1, 0], [+1, +1], [0, +1], [-1, +1], [-1, 0]]

const inBounds = (x, y) => x >= 0 && x < w && y >=0 && y < h;

const peaks = [];
const valleys = [];

for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {

        let allLower = true;
        let allHigher = true;
        let cur_pos = grid[i][j];
        for (const [dx, dy] of DIRS) {
            const x = dx + j;
            const y = dy + i;
            if (!inBounds(x, y)) continue;

            const new_pos = grid[y][x];
            if (new_pos === cur_pos) { allLower = false; allHigher = false; }
            if (new_pos >= cur_pos) allHigher = false;
            if (new_pos <= cur_pos) allLower = false;

            if (!allLower && !allHigher) break;
        }

        if (allHigher) peaks.push([j, i]);
        if (allLower) valleys.push([j, i]);
    }
} 

const fmt = (arr) => arr.length ? arr.map(([x, y]) => `(${x}, ${y})`).join(', ') : 'NONE';
console.log(fmt(peaks));
console.log(fmt(valleys));
