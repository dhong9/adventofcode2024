const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('day24/input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    const valMap = {};
    let tbd = [];

    let initial = true;
    for await (const line of rl) {
        if (!line) initial = false;

        else if (initial) {
            const [key, val] = line.split(": ");
            valMap[key] = +val;
        }

        else {
            const [expression, val] = line.split(" -> ");
            const [a, op, b] = expression.split(" ");
            if (a in valMap && b in valMap) {
                const v1 = valMap[a], v2 = valMap[b];
                const res = op === "AND" ? v1 & v2 : op === "OR" ? v1 | v2 : v1 ^ v2;
                valMap[val] = res;
            } else {
                tbd.push([expression, val]);
            }
        }
    }

    // Keep evaluating bitwise operations until all unknowns are solved
    for (let i = 0; i < 40; i++) {
        const temp = [];
        for (const [expression, val] of tbd) {
            const [a, op, b] = expression.split(" ");
            if (a in valMap && b in valMap) {
                const v1 = valMap[a], v2 = valMap[b];
                const res = op === "AND" ? v1 & v2 : op === "OR" ? v1 | v2 : v1 ^ v2;
                valMap[val] = res;
            } else {
                temp.push([expression, val]);
            }
        }
        tbd = temp;
    }

    // Keys with z indicate what index each bit is at
    const vals = [];
    for (const key in valMap) {
        if (key.startsWith("z")) {
            vals.push([key, valMap[key]])
        }
    }
    vals.sort((a, b) => +a[0].slice(1) - +b[0].slice(1));
    
    // Convert binary string to integer
    let res = 0;
    for (let i = 0; i < vals.length; i++) {
        res += vals[i][1] * 2 ** i;
    }
    console.log("Answer:", res);
}
  
  processLineByLine();