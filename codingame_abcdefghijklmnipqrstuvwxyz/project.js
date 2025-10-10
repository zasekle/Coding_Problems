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
const DIRS = [[0, -1], [+1, 0], [0, +1], [-1, 0]];
let number = 0;

while(true) {
    let currIdx = allLocs.length - 1;
    let curI = allLocs[currIdx][0];
    let curJ = allLocs[currIdx][1];
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
        const prevI = allLocs[currIdx-1][0];
        const prevJ = allLocs[currIdx-1][1];
        for (let i = finalPath.length-1; finalPath.length > 0; i--) {
            let finI = finalPath[i][0];
            let finJ = finalPath[i][1];
            if(grid[prevI][prevJ] !== grid[finI][finJ]) {
                finalPath.pop();
            } else {
                break;
            }
        }
        finalPath.pop();
    }

    number++;
}

const finalGrid = Array.from({length: n}, () => Array(n).fill('-'));

for (const [i, j] of finalPath) {
    finalGrid[i][j] = grid[i][j];
}

finalGrid.map(x => console.log(x.join("")));

