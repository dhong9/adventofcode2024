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

const safePossible = arr => {
  // Check if row is already safe
  if (isSafe(arr)) return true;

  // Check if row can be made safe by removing an entry
  for (let i = 0; i < arr.length; i++) {
    const testRow = [...arr.slice(0, i), ...arr.slice(i + 1)];
    if (isSafe(testRow)) return true;
  }
  return false;
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
    const row = line.split(' ');
    let safe = safePossible(row);
    count += safe;
  }

  console.log("Answer:", count)
}

processLineByLine();