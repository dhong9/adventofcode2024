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

  // Build frequency table from second column of numbers
  const freq = {};
  for (const x of set2) {
    freq[x] = -~freq[x];
  }

  // Score is sum of number in first column multiplied by
  // its frequency in the second column
  let score = 0;
  for (const x of set1) {
    score += x * ~~freq[x];
  }
  console.log("Answer:", score);
}

processLineByLine();