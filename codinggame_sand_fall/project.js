function isCapital(char) {
   return /[A-Z]/.test(char); 
}

var inputs = readline().split(' ');
const W = parseInt(inputs[0]);
const H = parseInt(inputs[1]);
const N = parseInt(readline());
const box = Array.from({length: H}, () => Array(W).fill('.'));
for (let i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    const id = inputs[0];
    let col = parseInt(inputs[1]);
    let row = -1;
    let dropping = true;

    function checkLeft() {
        if (col > 0 && box[row + 1][col - 1] === '.') { //check left
            row++;
            col--;
            return true;
        }
        return false;
    }

    function checkRight() {
        if (col < W-1 && box[row + 1][col + 1] === '.') { //check right
            row++;
            col++;
            return true;
        }
        return false;
    }

    while (dropping) {
        if (row === H-1) { // At bottom
            dropping = false;
        } else if (box[row + 1][col] === '.') { // Empty Space Below
            row++;
        } else {
            let moved = false;
            if (isCapital(id)) { // capital letter
                moved = checkLeft();
                if (!moved) moved = checkRight();
            } else {
                moved = checkRight();
                if (!moved) moved = checkLeft();
            }

            if (!moved) {
                dropping = false;
            }
        }
    }

    if (row > -1) {
        box[row][col] = id;
    }
}

for (const row of box) {
    console.log(`|${row.map(c => c === '.' ? ' ' : c).join('')}|`);
}
console.log(`+${'-'.repeat(W)}+`);
