const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('day3/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let txt = "";
  let res = 0;

  // Read multiline input into one big string
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    txt += line;
  }

  // Multiplication instructions are formatted as mul(X,Y)
  // Enable/disable instructions are formatted as do() and don't()
  instructions = txt.match(/mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g);
  let flag = true;
  for (const op of instructions) {
    // Disable multiplication
    if (op.startsWith("don't")) flag = false;

    // Enable multiplication
    else if (op.startsWith('do')) flag = true;

    // Use enable/disable flag to decide if we should multiply the two numbers
    // If so, then add the product
    else if (flag) {
      const [x, y] = op.slice(4, -1).split(',');
      res += x * y;
    }
  }

  console.log("Answer:", res);
}

processLineByLine();