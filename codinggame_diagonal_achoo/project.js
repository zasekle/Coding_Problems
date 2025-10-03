const n = parseInt(readline());
const g = parseInt(readline());

const DIRS = [
    [-1, -1], //top-left
    [-1, +1], //top-right
    [+1, -1], //bottom-left
    [+1, +1], //bottom-right
];

function convertInfected(myGrid) {
    let infected = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (myGrid[i][j] === 'C') {
                infected.push([i, j]);
            }
        }
    }

    let numberInfected = infected.length;
    while (infected.length) {
        const [hRow, hCol] = infected.shift();
        for (const [i, j] of DIRS) {
            let row = hRow + i;
            let col = hCol + j;
            if(myGrid[row]?.[col] === '.') {
                myGrid[row][col] = 'C';
                numberInfected++;
                infected.push([row, col]);
            }
        }
    }

    return numberInfected;
}


//People that write JavaScript use camel case :(.
let finalIndex = 0;
let finalNumInfected = 0;
let finalGrid = [];
for (let i = 0; i < g; i++) {
    // Will make this a 2d array of chars.
    let myGrid = [];
    for (let j = 0; j < n; j++) {
        // javascript stores things as strings. These strings are immutable.
        // This means that in a problem like this where I need to modify them,
        // problems can occur. I can use the split() function to instead turn
        // the string into an array of chars.
        myGrid[j] = readline().split("");
    }

    let numberInfected = convertInfected(myGrid);

    if (i === 0 || finalNumInfected < numberInfected) {
        finalNumInfected = numberInfected;
        finalIndex = i;
        finalGrid = myGrid;
    }
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

console.log(finalIndex);
for (let i = 0; i < n; i++) {
    console.log(finalGrid[i].join(""));
}
