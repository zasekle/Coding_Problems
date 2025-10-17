const order = readline();
const out = readline();

const opp = {
    R: "L",
    L: "R",
    U: "D",
    D: "U",
};

const orth = {
    R: ["U", "D"],
    L: ["U", "D"],
    U: ["L", "R"],
    D: ["L", "R"],
};

const sides = {
    R: 1,
    L: 1,
    U: 1,
    D: 1,
};

for (const c of order) {
    const o = opp[c];
    const [a, b] = orth[c];

    sides[o] += sides[c];
    sides[a] *= 2;
    sides[b] *= 2;
    sides[c] = 1;
}

console.log(sides[out]);