const n = parseInt(readline());
const grid = Array.from({length: n}, () => readline().split(''));

const LAND = '#';
const WATER = '~';
const VISITED = 'V';
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

const inBounds = (i, j) => i >= 0 && i < n && j >= 0 && j < n;
const encode = (i, j) => i * n + j;

function bfs(i, j) {
    if (grid[i][j] !== LAND) return null;

    grid[i][j] = VISITED;

    const stack = [[i, j]];
    const shore = new Set();

    while (stack.length) {
        const [nextI, nextJ] = stack.pop();

        for (const [di, dj] of DIRS) {
            const newI = nextI + di;
            const newJ = nextJ + dj;
            if (!inBounds(newI, newJ)) continue;

            if (grid[newI][newJ] === WATER) {
                shore.add(encode(newI, newJ));
            } else if (grid[newI][newJ] === LAND) {
                grid[newI][newJ] = VISITED;
                stack.push([newI, newJ]);
            }
        }
    }

    return shore.size;
}

let islandIdx = 0;
let bestIdx = 0;
let bestLen = -1;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        const length = bfs (i, j);

        if (length === null) continue;

        islandIdx++;
        if (length > bestLen) {
            bestIdx = islandIdx;
            bestLen = length
        }
    }
}

console.log(`${bestIdx} ${bestLen}`);
