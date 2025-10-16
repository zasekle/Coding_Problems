const [dirRaw, numStr, heightStr, strokeStr, spacingStr, indentStr] = readline().split(" ");
const dir = dirRaw === "right" ? ">" : "<";
const num = Number(numStr);
const height = Number(heightStr);
const stroke = Number(strokeStr);
const spacing = Number(spacingStr);
const indent = Number(indentStr);

const widest = num * stroke + spacing * (num - 1) + indent * Math.floor(height/2)
const block = dir.repeat(stroke);
const spacer = " ".repeat(spacing);

function makeRow(i) {
    const leftIndent = indent * Math.min(i, height - i - 1);
    const arrows = Array.from({ length: num}, () => block).join(spacer);
    let line = " ".repeat(leftIndent) + arrows;

    if (line.length < widest) line = line.padEnd(widest, " ");

    if (dir === "<") line = line.split("").reverse().join("");

    return line.replace(/\s+$/, "");
}

for (let i = 0; i < height; i++) {
    console.log(makeRow(i));
}