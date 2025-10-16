const lengthofline = parseInt(readline());
const N = parseInt(readline());

let counters = [0];
for (let i = 0; i < N; i++) {
    const [section, page] = readline().split(" ");

    const depth = section.match(/^>*/)[0].length;

    const title = section.slice(depth);

    counters = counters.slice(0, depth + 1);

    //?? in javascript is called the nullish coalescing operator, if the lhs
    // returns null or undefined it will use the rhs of the operator, so 
    // essentially this will add an element to the array if it doesn't have one
    // here
    counters[depth] = (counters[depth] ?? 0) + 1;

    const number = counters[depth];

    const left = `${" ".repeat(depth * 4)}${number} ${title}`;

    const line = left.padEnd(lengthofline - page.length, ".") + page;

    console.log(line);
}
