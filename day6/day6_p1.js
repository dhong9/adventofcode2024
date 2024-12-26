const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('day6/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const maze = [];
  const visited = new Set();

  // The guard is currently facing up
  // Make right turns for each obstacle
  const directions = [
    [-1, 0],// Up
    [0, 1], // Right
    [1, 0], // Down
    [0, -1] // Left
  ]

  // Read maze
  for await (const line of rl) {
    maze.push(line);
  }

  // Find guard
  let guardRow = 0, guardCol = 0;
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === '^') {
        guardRow = i;
        guardCol = j;
        break;
      }
    }
  }

  console.log("Found guard at (", guardRow, ', ', guardCol, ')');

  while (true) {
    let flag = false;
    for (const [dRow, dCol] of directions) {
      while (true) {
        const nRow = guardRow + dRow, nCol = guardCol + dCol;
        if (nRow < 0 || nRow >= maze.length || nCol < 0 || nCol >= maze[0].length) {
          // Exit reached
          console.log("Exit reached");
          console.log("Answer:", visited.size + 1);
          flag = true;
          break;
        }

        if (maze[nRow][nCol] === '#') {
          break;
        };

        // Empty space, so update position
        visited.add(guardRow + ',' + guardCol);
        guardRow = nRow;
        guardCol = nCol;
      }
    }
    
    if (flag) break;
  }
}

processLineByLine();