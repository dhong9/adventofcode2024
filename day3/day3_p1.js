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
  instructions = txt.match(/mul\(\d+,\d+\)/g);
  for (const op of instructions) {
    // Extract the two operands and add the product
    const [x, y] = op.slice(4, -1).split(',');
    res += x * y;
  }

  console.log("Answer:", res);
}

processLineByLine();