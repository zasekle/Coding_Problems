const h = parseInt(readline());
const grid = []
for (let i = 0; i < h; i++) {
    grid.push(readline().split(' ').map(Number));
}

function buildOutput(str, i, j) {
    str = str === "NONE" ? "" : str + ", ";
    return str + "(" + j.toString() + ", " + i.toString() + ")";
}

const Location = Object.freeze({
    NOT_SET: 0,
    BELOW: 1,
    ABOVE: 2,
    INVALID: 3,
});

let above = true;
const w = grid[0].length;
const dir = [[-1, -1], [0, -1], [+1, -1], [+1, 0], [+1, +1], [0, +1], [-1, +1], [-1, 0]]

const inBounds = (x, y) => x >= 0 && x < w && y >=0 && y < h;

let peaks = "NONE";
let valleys = "NONE";

for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
        let loc = Location.NOT_SET;
        let cur_pos = grid[i][j];
        for (const pos of dir) {
            const x = pos[0] + j;
            const y = pos[1] + i;
            if (inBounds(x, y)) {
                const new_pos = grid[y][x];
                if(loc == Location.NOT_SET) {
                    if (cur_pos > new_pos) {
                        loc = Location.ABOVE;
                    } else if (cur_pos < new_pos) {
                        loc = Location.BELOW;
                    } else {
                        loc = Location.INVALID;
                        break;
                    }
                } else if (
                    (cur_pos <= new_pos || loc !== Location.ABOVE) && 
                    (cur_pos >= new_pos || loc !== Location.BELOW)
                ) { // The new position is not in line with the old position.
                    loc = Location.INVALID;
                    break;
                }
            }
        }

        if (loc == Location.ABOVE) {
            peaks = buildOutput(peaks, i, j);
        } else if (loc == Location.BELOW) {
            valleys = buildOutput(valleys, i, j);
        }
    }
} 

console.log(peaks);
console.log(valleys);