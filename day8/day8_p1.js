const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('day8/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  // Read rows
  const rows = [];
  for await (const line of rl) {
    rows.push([...line]);
  }

  // Get antenna positions
  const positions = {};
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      const curr = rows[i][j];
      if (curr !== '.') {
        if (curr in positions) {
          positions[curr].push([i, j]);
        } else {
          positions[curr] = [[i, j]];
        }
      }
    }
  }

  // Place anti nodes
  let count = 0;
  for (const k in positions) {
    const arr = positions[k];
    for (let i = 0; i < arr.length; i++) {
      const [r, c] = arr[i];
      for (let j = 0; j < arr.length; j++) {
        if (i !== j) {
          const dRow = r - arr[j][0];
          const dCol = c - arr[j][1];
          const nextRow1 = r + dRow, nextCol1 = c + dCol;
          const nextRow2 = r - dRow, nextCol2 = c - dCol;
          if (nextRow1 >= 0 && nextRow1 < rows.length && nextCol1 >= 0 && nextCol1 < rows[0].length) {
            if (rows[nextRow1][nextCol1] === '.')
              rows[nextRow1][nextCol1] = '#';
            else if (rows[nextRow1][nextCol1] !== '#') {
              count++;
            }
          }
          if (nextRow2 >= 0 && nextRow2 < rows.length && nextCol2 >= 0 && nextCol2 < rows[0].length && rows[nextRow2][nextCol2] === '.')
            if (rows[nextRow2][nextCol2] === '.')
              rows[nextRow2][nextCol2] = '#';
            else if (rows[nextRow2][nextCol2] !== '#')  {
              count++;
            }
        }
      }
    }
  }

  // Place anti nodes
  for (const row of rows) {
    for (const c of row) {
      count += c === '#';
    }
  }

  console.log("Answer:", count);
}

processLineByLine();