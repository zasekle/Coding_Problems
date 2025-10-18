const n = parseInt(readline());

let fib = [1, 2];

while (fib[fib.length - 1] <= n) {
    const a = fib[fib.length - 1];
    const b = fib[fib.length - 2];
    fib.push(a + b);
}

if (fib[fib.length - 1] > n) fib.pop();

let rem = n;
const parts = [];

for (let i = fib.length - 1; i >= 0 && rem > 0; i--) {
    if (fib[i] <= rem) {
        parts.push(fib[i]);
        rem -= fib[i];
        i--;
    }
}

console.log(parts.join('+'));