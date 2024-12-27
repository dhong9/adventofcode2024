const fs = require('fs');
const readline = require('readline');

const findOptions = (toTest, towels, memo = {}) => {
    let res = 0;
    for (const towel of towels) {
        const towlen = towel.length;
        if (toTest.startsWith(towel)) {
            if (toTest in memo)
                res += memo[toTest];
            else if (towlen === toTest.length)
                res++;
            else {
                const temp = toTest.slice(towlen);
                memo[temp] = (res += findOptions(toTest.slice(towlen), towels, memo))
            }
        }
    }
    return res;
}

async function processLineByLine() {
    const fileStream = fs.createReadStream('day19/input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let readBlock = true;
    const stripes = [];
    const towels = [];
  
    for await (const line of rl) {
        if (line) {
            if (readBlock)
                stripes.push(...line.match(/[a-z]+/gi))
            else
                towels.push(line);
        }
        else {
            readBlock = false;
        }
    }

    let result = 0;
    for (const towel of towels) {
        result += !!findOptions(towel, stripes)
    }
    console.log(result)
}
  
  processLineByLine();