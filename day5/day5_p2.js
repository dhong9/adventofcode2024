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
  const tracked = new Set();
  
  let readRules = true;
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    if (line) {
      if (readRules) {
        // When parsing rules, also remember which numbers are in the rules set
        const [x, y] = line.split('|');
        rules.push([x, y]);
        tracked.add(x);
        tracked.add(y)
      } else {
        seqs.push(line.split(','));
      }
    } else {
      readRules = false;
    }
  }

  // Check that numbers in the sequence follows rules
  const followsRules = seq => rules.every(([x, y]) => {
    const xInd = seq.indexOf(x), yInd = seq.indexOf(y);
    if (xInd && yInd >= 0) {
      return xInd < yInd;
    }
    return true;
  });

  // How to sort numbers such that they follow the rules
  const sortRules = (a, b) => {
    if (tracked.has(a) && tracked.has(b)) {
      const [x, y] = rules.find(([v1, v2]) => (v1 == a && v2 == b) || (v1 == b && v2 == a));
      if (x == a) return -1;
      return 1;
    }
    return 0;
  }
  
  let sum = 0;
  for (const seq of seqs) {
    if (!followsRules(seq)) {
      // If a sequence doesn't follow the original rules,
      // sort it appropriately, and then add the middle number
      seq.sort(sortRules);
      const mid = seq[seq.length >> 1];
      sum += +mid;
    }
  }

  console.log("Answer:", sum);
}

processLineByLine();