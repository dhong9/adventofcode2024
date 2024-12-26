const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('day1/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const set1 = [], set2 = [];

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);

    // Each line is two numbers separated by spaces
    const [a, b] = line.split(/\s+/);
    set1.push(+a);
    set2.push(+b);
  }

  // Sort both sets of numbers in ascending order
  set1.sort((a, b) => a - b);
  set2.sort((a, b) => a - b);

  // Add absolute differences between each pair of numbers
  let diffs = 0;
  for (let i = 0; i < set1.length; i++) {
    diffs += Math.abs(set1[i] - set2[i]);
  }

  console.log("Answer:", diffs)
}

processLineByLine();