const isCapital = (c) => /^[A-Z]$/.test(c);

let inputs = readline().split(' ');
const W = parseInt(inputs[0]);
const H = parseInt(inputs[1]);
const N = parseInt(readline());

let inBounds = (r,c) => r >= 0 && r < H && c >=0 && c < W;
let empty = (r,c) => inBounds(r,c) && box[r][c] === '.';
let emptyBelow = (r, c) => empty(r + 1, c);

const box = Array.from({length: H}, () => Array(W).fill('.'));
for (let i = 0; i < N; i++) {
    let inputs = readline().split(' ');
    const id = inputs[0];

    // Need to start row at -1 so that when the sand piles to the top it will
    // properly check 'below' it which is index 0.
    let col = parseInt(inputs[1]);
    let row = -1;

    while (true) {
        // Check if the sand is at the bottom of the box.
        if (row === H - 1) break;

        // Check if spot below the sand is empty.
        if (emptyBelow(row, col)) {
            row++;
            continue;
        }

        let order = isCapital(id) ? [-1, +1] : [+1, -1];

        // Check if it can move down-left or down-right.
        let moved = false;
        for (const dc of order) {
            const new_col = col + dc;
            if (empty(row + 1, new_col)) {
                row++;
                col = new_col;
                moved = true;
                break;
            }
        }

        // No where for the sand to fall. Leave it stationary.
        if (!moved) break;
    }

    if (row > -1) box[row][col] = id;
}

for (const row of box) {
    console.log(`|${row.map(c => c === '.' ? ' ' : c).join('')}|`);
}
console.log(`+${'-'.repeat(W)}+`);
