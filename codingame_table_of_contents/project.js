const lengthofline = parseInt(readline());
const N = parseInt(readline());
let titleNum = [0];
const indent = " ".repeat(4);
for (let i = 0; i < N; i++) {
    const [section, pageNum] = readline().split(" ");
    let line = "";

    // Find the first char that is not '>'
    const idx = section.search(/[^>]/);

    while(titleNum.length < idx+1) {
        titleNum.push(0);
    }

    while(titleNum.length > idx+1) {
        titleNum.pop();
    }

    titleNum[titleNum.length-1] += 1;

    line = indent.repeat(idx) + titleNum[titleNum.length-1].toString() + " " + section.slice(idx);

    line += ".".repeat(lengthofline - line.length - pageNum.length) + pageNum;

    console.log(line);
}
