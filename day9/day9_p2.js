const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('day9/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let input = "";
  for await (const line of rl) {
    input += line;
  }
  
  // Move data
  const data = [];
  let index = 0;
  for (let i = 0; i < input.length; i += 2) {
    const blocks = ~~input[i];
    const freeSize = ~~input[i + 1];
    data.push([index, blocks]);
    if (freeSize > 0)
      data.push([null, freeSize])
    index++;
  }

  for (let i = data.length - 1; i >= 0; i--) {
    const [v, count] = data[i];
    if (v !== null) {
      let insert = false;
      let found = false;
      for (let j = 0; j < data.length; j++) {
        const [x, count2] = data[j];
        if (x === null && count2 >= count && j <= i) {
          const rem = count2 - count;
          data[j][0] = v;
          data[j][1] = count;
          found = true;
          if (rem > 0) {
            // Insert at index
            data.splice(j + 1, 0, [null, rem]);
            insert = true;
          }
          break;
        }
      }
      if (found)
        data[i + insert][0] = null;
      if (insert) i++;
    }
  }

  const expansion = [];
  for (const [x, y] of data) {
    for (let i = 0; i < y; i++) {
      expansion.push(x);
    }
  }

  let sum = 0;
  for (let i = 0; i < expansion.length; i++) {
    if (data[i] !== null) {
      sum += i * expansion[i];
    }
  }

  console.log("Answer:", sum);
}

processLineByLine();