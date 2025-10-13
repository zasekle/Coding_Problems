const n = parseInt(readline());
const map = []
for (let i = 0; i < n; i++) {
    map.push(readline().split(''));
}

const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

const inBounds = (i, j) => i >= 0 && i < n && j >= 0 && j < n;

const addPair = (i, j, shore) => shore.add(`${i},${j}`);

function bfs(i, j, shore) {
    if (map[i][j] !== '#') {
        return;
    }

    map[i][j] = 'U';

    for (const [di, dj] of DIRS) {
        const newI = i + di;
        const newJ = j + dj;
        if (inBounds(newI, newJ) && map[newI][newJ] === '~') {
            addPair(newI, newJ, shore);
        }
    }

    for (const [di, dj] of DIRS) {
        const newI = i + di;
        const newJ = j + dj;
        if (inBounds(newI, newJ) && map[newI][newJ] === '#') {
            bfs(newI, newJ, shore);
        }
    }
}

let islandIndex = 0;
let longestShoreIdx = 1;
let longestShoreLen = 0;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        let shore = new Set();
        bfs (i, j, shore);

        if (shore.size > 0) {
            if (shore.size > longestShoreLen) {
                longestShoreIdx = islandIndex + 1;
                longestShoreLen = shore.size;
            }
            islandIndex++;
        }
    }
}

console.log(`${longestShoreIdx} ${longestShoreLen}`);
