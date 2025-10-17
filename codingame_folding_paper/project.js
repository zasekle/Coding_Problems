const order = readline();
const outputSide = readline();

const sides = {
    R: ["L", 1],
    L: ["R", 1],
    U: ["D", 1],
    D: ["U", 1],
};

for (const letter of order) {
    const oppChar = sides[letter][0];

    // Must be calculated before current side is set to 1.
    sides[oppChar][1] += sides[letter][1];
    
    for (const sidesKey in sides) {
        if (letter === sidesKey) {
            sides[sidesKey][1] = 1;
        } else if (sidesKey != oppChar) {
            sides[sidesKey][1] *= 2;
        }
    }
}


console.log(sides[outputSide][1]);
