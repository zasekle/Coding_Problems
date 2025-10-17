const size = parseInt(readline());
const grid = [];
const gridMap = new Map();
for (let i = 0; i < size; i++) {
    const row = readline();
    grid.push(row);

    for (let j = 0; j < size; j++) {
        if(!gridMap.has(row[j])) {
            gridMap.set(row[j], [[i, j]]);
        } else {
            gridMap.get(row[j]).push([i, j]);
        }
    }
}

const clues = readline().toUpperCase().split(" ");
const finalGrid = Array.from({length: size}, (_) => Array(size).fill(" "));

const isInBounds = (i, j) => i >= 0 && i < size && j >= 0 && j < size;
const DIRS = [[1, 1], [1, 0], [0, 1], [-1, 0], [0, -1], [1, -1], [-1, 1], [-1, -1]];

clueLoop: for (const clue of clues) {
    const char = clue[0];

    if (!gridMap.has(char)) continue;
    
    const coords = gridMap.get(char);
    for (const [origI, origJ] of coords) {
        let secondDirs = [];
    
        for (const [di, dj] of DIRS) {
            let newI = origI + di;
            let newJ = origJ + dj;
            if (isInBounds(newI, newJ) && grid[newI][newJ] === clue[1]) {
                secondDirs.push([di, dj]);
            }
        }

        secondCharLoop: for (const [dirI, dirJ] of secondDirs) {
            let wordLocs = [[origI, origJ], [origI+dirI, origJ + dirJ]];
            let i = origI + dirI + dirI;
            let j = origJ + dirJ + dirJ;

            for (let k = 2; k < clue.length; k++) {
                if(!isInBounds(i, j) || grid[i][j] !== clue[k]) {
                    continue secondCharLoop;
                }
                wordLocs.push([i, j]);
                i += dirI;
                j += dirJ;
            }

            console.error(wordLocs);
    
            for (let k = 0; k < clue.length; k++) {
                const locI = wordLocs[k][0];
                const locJ = wordLocs[k][1];
    
                finalGrid[locI][locJ] = clue[k];
            }
    
            continue clueLoop;
        }
    }
}

console.error(finalGrid);

for (const row of finalGrid) {
    console.log(row.join(""));
}
