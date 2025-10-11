const n = parseInt(readline());
const grid = [];
for (let i = 0; i < n; i++) {
    grid.push(readline());
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function isInBounds(i, j) {
    return i >=0 && i < n && j >=0 && j < n;
}

const finalPath = [];
const DIRS = [[0, -1], [+1, 0], [0, +1], [-1, 0]];

function dfs(i, j) {
    finalPath.push([i, j]);
    
    if (finalPath.length === alphabet.length) {
        console.error(`true`);
        return true;
    }

    for (let [di, dj] of DIRS) {
        const newI = di+i;
        const newJ = dj+j;
        if (isInBounds(newI, newJ) && grid[newI][newJ] === alphabet[finalPath.length]) {
            if(dfs(newI, newJ)) {
                return true;
            }
        }
    }

    finalPath.pop([i, j]);

    return false;
}

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (grid[i][j] == 'a') {
            dfs(i, j);
        }
    }
}

const finalGrid = Array.from({length: n}, () => Array(n).fill('-'));

for (const [i, j] of finalPath) {
    finalGrid[i][j] = grid[i][j];
}

finalGrid.map(x => console.log(x.join("")));
