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

  // Read multiline input into one big string
  let input = "";
  for await (const line of rl) {
    input += line;
  }
  
  // Track which indices have data and which ones are blank
  const data = [];
  let index = 0;
  let empties = 0;
  for (let i = 0; i < input.length; i += 2) {
    const blocks = ~~input[i];
    const freeSize = ~~input[i + 1];
    for (let j = 0; j < blocks; j++) {
      data.push(index + '');
    }
    for (let j = 0; j < freeSize; j++) {
      data.push(null);
      empties++;
    }
    index++;
  }

  // Move data starting from rightmost to the left leftmost empty
  while (empties) {
    for (let j = data.length - 1; j >= 0; j--) {
      const curr = data[j];
      if (curr) {
        for (let k = 0; k < data.length; k++) {
          if (!data[k]) {
            data[k] = curr;
            data[j] = null;
            break;
          }
        }
        break;
      }
    }
    empties--;
  }

  // Sum index multiplied by data number
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]) {
      sum += i * data[i];
    }
  }

  console.log("Answer:", sum);
}

processLineByLine();