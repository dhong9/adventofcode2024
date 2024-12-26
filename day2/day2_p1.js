const fs = require('fs');
const readline = require('readline');

const isSafe = arr => {
  // A report is safe if:
  // The levels are all increasing or all decreasing.
  // Any two adjacent levels by at least one and at most 3.

  let found = false;
  let prev = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i]
    if (prev) {
      // Check if neighbors are increasing or decreasing
      if ((diff < 0 && prev > 0) || (diff > 0 && prev < 0)) {
        found = true;
        break;
      }
    }
    // Check if differences are between 1 and 3
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      found = true;
      break;
    }
    prev = diff;
  }
  return !found;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('day2/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let count = 0;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.

    // Get numbers from row
    const row = line.split(' ').map(v => +v);

    // Count safe rows
    count += isSafe(row);
  }

  console.log("Answer:", count)
}

processLineByLine();