
const n = parseInt(readline());
const grid = [];
for (let i = 0; i < n; i++) {
    grid.push(readline());
}

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const allLocs = [];

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (grid[i][j] == 'a') {
            allLocs.push([i, j]);
        }
    }
}

function isInBounds(i, j) {
    return i >=0 && i < n && j >=0 && j < n;
}

const finalPath = [];
const DIRS = [[-1, -1], [0, -1], [+1, -1], [+1, 0], [+1, +1], [0, +1], [-1, +1], [-1, 0]];

while(true) {
    const currIdx = allLocs.length - 1;
    console.error(currIdx);
    console.error(allLocs);
    console.error(finalPath.length);
    console.error(finalPath);
    const curI = allLocs[currIdx][0];
    const curJ = allLocs[currIdx][1];
    finalPath.push(allLocs.pop());

    if (alphabet.length === finalPath.length) {
        break;
    }

    let nextFound = false;
    for (let [di, dj] of DIRS) {
        const newI = di+curI;
        const newJ = dj+curJ;
        if (isInBounds(newI, newJ) && grid[newI][newJ] === alphabet[finalPath.length]) {
            console.error(`newI ${newI} newJ ${newJ} found!`);
            nextFound = true;
            allLocs.push([newI, newJ]);
        }
    }

    if (!nextFound) {
        finalPath.pop();
    }
}

const finalGrid = Array.from({length: n}, () => Array(n).fill('-'));

for (const [i, j] of finalPath) {
    finalGrid[i][j] = grid[i][j];
}

finalGrid.map(x => console.log(x.join("")));

