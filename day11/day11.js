const splitMap = {};

// Count digits in a number
function numDigits(num) {
    return Math.ceil(Math.log10(num + 1));
}

// Split number into 2
function splitNumber(n) {
    if (n in splitMap) {
        return splitMap[n];
    }

    const orig = n;

    // Get number of digits
    // Can assume that number of digits is even
    const len = numDigits(n) / 2;
    
    let rightHalf = 0;
    for (let i = 0; i < len; i++) {
        const digit = n % 10;
        rightHalf += digit * (10 ** i);
        n = Math.floor(n / 10)
    }

    return (splitMap[orig] = [n, rightHalf]);
}

function processRock(x, iters, memo={}) {
    // Recursions with memoization
    if (x in memo && iters in memo[x]) return memo[x][iters];
    
    if (iters === 0) return 1;
    
    if (!(x in memo))
        memo[x] = {};
    
    // If the stone is engraved with the number 0,
    // it is replaced by a stone engraved with the number 1.
    if (x === 0) {
        return (memo[x][iters] = processRock(1, iters - 1, memo));
    }
    
    // If the number of digits is even,
    // Split the stone into two
    const n = numDigits(x);
    if (n % 2 === 0) {
        const [a, b] = splitNumber(x);
        return (memo[x][iters] = processRock(a, iters - 1, memo) + processRock(b, iters - 1, memo));
    }

    // Catch call condition:
    // Multiply number by 2024
    return (memo[x][iters] = processRock(x * 2024, iters - 1, memo));
}

let count = 0;
let rocks = [1750884, 193, 866395, 7, 1158, 31, 35216, 0];
for (const rock of rocks) {
    count += processRock(rock, 75)
}
console.log(count);