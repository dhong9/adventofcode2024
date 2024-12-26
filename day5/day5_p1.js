const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('day5/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const rules = [], seqs = [];
  
  let readRules = true;
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if (line) {
      if (readRules) {
        // Get ordering rules
        const [x, y] = line.split('|');
        rules.push([x, y]);
      } else {
        // Get sequences
        seqs.push(line.split(','));
      }
    } else {
      readRules = false;
    }
  }

  let sum = 0;
  for (const seq of seqs) {
    // If all the left numbers in the rules come before the right numbers,
    // then find the middle number and add it
    if (rules.every(([x, y]) => {
      // Verify that both numbers are in the rules
      const xInd = seq.indexOf(x), yInd = seq.indexOf(y);
      if (xInd && yInd >= 0) {
        return xInd < yInd;
      }
      // Otherwise, don't check the number against the rules
      return true;
    })) {
      const mid = seq[seq.length >> 1];
      sum += +mid;
    }
  }

  console.log("Answer:", sum);
}

processLineByLine();