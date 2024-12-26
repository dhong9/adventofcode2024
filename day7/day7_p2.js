const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('day7/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  // DFS if adding, multiplying, and concatenat
  const canReachTarget = (target, values) => {
    let stack = [values[0]];
    for (let i = 1; i < values.length; i++) {
        const copy = [...stack];
        stack = [];
        for (const v of copy) {
            const val1 = v + values[i];
            const val2 = v * values[i];
            const val3 = +(v + '' + values[i])
            if (val1 <= target) stack.push(val1);
            if (val2 <= target) stack.push(val2);
            if (val3 <= target) stack.push(val3);
        }
    }
    return stack.some(v => v == target);
  }

  // Sum reachable targets
  let sum = 0;
  for await (const line of rl) {
    const [target, values] = line.split(": ");
    if (canReachTarget(+target, values.split(' ').map(v => +v))) {
        sum += +target;
    }
  }

  console.log("Answer:", sum);

}

processLineByLine();