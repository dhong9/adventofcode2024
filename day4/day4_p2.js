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
  let count = 0;

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    rows.push(line)
  }

  const n = rows.length;
  const m = rows[0].length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        const letter = rows[i][j];
        // 'A' will always be center,
        // so use that as starting point
        if (letter == 'A') {
            // Check all valid arrangements of "MAS" in an "X" shape
            const x1 = i - 1, y1 = j - 1, x2 = i + 1, y2 = j + 1;
            if (x1 >= 0 && x1 < n && x2 >= 0 && x2 < n && y1 >= 0 && y1 < m && y2 >= 0 && y2 < m) {
              if ((rows[x1][y1] == 'M' && rows[x2][y2] == 'S' && rows[x2][y1] == 'M' && rows[x1][y2] == 'S') ||
                  (rows[x1][y1] == 'S' && rows[x2][y2] == 'M' && rows[x2][y1] == 'M' && rows[x1][y2] == 'S') ||
                  (rows[x1][y1] == 'M' && rows[x2][y2] == 'S' && rows[x2][y1] == 'S' && rows[x1][y2] == 'M') ||
                  (rows[x1][y1] == 'S' && rows[x2][y2] == 'M' && rows[x2][y1] == 'S' && rows[x1][y2] == 'M')) {
                count++;
              }
            }
        }
    }
  }
  console.log("Answer:", count);
}

processLineByLine();