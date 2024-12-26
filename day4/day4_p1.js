const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('day4/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const rows = [];
  const position = [];
  let count = 0;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    rows.push(line)
  }

  const n = rows.length;
  const m = rows[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
  ]

  // Find starting points
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        const letter = rows[i][j];
        if (letter == 'X') {
            position.push([i, j]);
        }
    }
  }

  // For each starting position,
  // Branch out in each of the 8 directions
  // to find XMAS
  for (const [x, y] of position) {
    for (const [dx, dy] of directions) {
        const nextX1 = x + dx, nextY1 = y + dy;
        if (nextX1 >= 0 && nextX1 < n && nextY1 >= 0 && nextY1 < m && rows[nextX1][nextY1] == 'M') {
            const nextX2 = x + 2*dx, nextY2 = y + 2*dy;
            if (nextX2 >= 0 && nextX2 < n && nextY2 >= 0 && nextY2 < m && rows[nextX2][nextY2] == 'A') {
                const nextX3 = x + 3 * dx, nextY3 = y + 3*dy;
                if (nextX3 >= 0 && nextX3 < n && nextY3 >= 0 && nextY3 < m && rows[nextX3][nextY3] == 'S') {
                    count++;
                }
            }
        }
    }
  }
  console.log("Answer:", count);
}

processLineByLine();