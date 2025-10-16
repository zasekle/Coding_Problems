const input = readline().split(" ");
const dir = input[0] === "right" ? ">" : "<";
const num = Number(input[1]);
const height = Number(input[2]);
const stroke = Number(input[3]);
const spacing = Number(input[4]);
const indent = Number(input[5]);

const longestLine = (num * stroke) + (spacing * (num - 1)) + (indent * Math.floor(height/2))
let sign = [];
for (let i = 0; i < height; i++) {
    let line = [];
    let curLen = indent * Math.min(i, height - i - 1);

    line.push(" ".repeat(curLen));
    for (let j = 0; j < num; j++) {
        if (j != 0) {
            curLen += spacing;
            line.push(" ".repeat(spacing))
        }
        curLen += stroke;
        line.push(dir.repeat(stroke));
    }
    line.push(" ".repeat(longestLine - curLen));
    if (dir === "<") line = line.reverse();

    sign.push(line.join("").replace(/\s+$/, ""));
}

for(const line of sign) {
    console.log(line);
}
