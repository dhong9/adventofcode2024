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
  const visited = new Set();
  for (const k in positions) {
    const arr = positions[k];
    for (let i = 0; i < arr.length; i++) {
      const [r, c] = arr[i];
      for (let j = 0; j < arr.length; j++) {
        if (i !== j) {
          const dRow = r - arr[j][0];
          const dCol = c - arr[j][1];

          let currRow = r, currCol = c;
          while (currRow >= 0 && currRow < rows.length && currCol >= 0 && currCol < rows[0].length) {
            const cellVal = rows[currRow][currCol];
            if (cellVal === '.') {
              rows[currRow][currCol] = '#';
            }
            else if (cellVal !== '#') {
              visited.add(currRow + ',' + currCol)
            }
            currRow += dRow;
            currCol += dCol;
          }

          currRow = r;
          currCol = c;
          while (currRow >= 0 && currRow < rows.length && currCol >= 0 && currCol < rows[0].length) {
            const cellVal = rows[currRow][currCol];
            if (cellVal === '.') {
              rows[currRow][currCol] = '#';
            }
            else if (cellVal !== '#') {
              visited.add(currRow + ',' + currCol)
            }
            currRow -= dRow;
            currCol -= dCol;
          }
        }
      }
    }
  }

  // Count anti nodes
  let count = visited.size;
  for (const row of rows) {
    for (const col of row) {
      count += col === '#';
    }
  }

  console.log("Answer:", count);
}

processLineByLine();