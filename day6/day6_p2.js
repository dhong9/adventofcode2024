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

  const canExit = maze => {
    const visited = new Set();
    
    // Up
    // Right
    // Down
    // Left
    const directions = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1]
    ]
    let cells = 0;

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

    // Attempt to solve the maze
    while (true) {
      let flag = false;
      for (const [dRow, dCol] of directions) {
        while (true) {
          const nRow = guardRow + dRow, nCol = guardCol + dCol;
          if (nRow < 0 || nRow >= maze.length || nCol < 0 || nCol >= maze[0].length) {
            // Exit reached
            flag = true;
            break;
          }
  
          if (maze[nRow][nCol] === '#') {
            break;
          };
  
          // Empty space, so update position
          visited.add(guardRow + ',' + guardCol);
          cells++;
          guardRow = nRow;
          guardCol = nCol;

          if (cells > 11000) return false; // Plenty of visits made to claim we found a cycle
        }
      }
      
      if (flag) return visited;
    }

  }

  const maze = [];

  // Read maze
  for await (const line of rl) {
    maze.push([...line]);
  }

  let traps = 0;
  const visited = canExit(maze);
  for (let visit of visited) {
    const [x, y] = visit.split(',');
    const copyMap = maze.map(arr => arr.slice());
    copyMap[x][y] = '#'; // Attempt to place a new obstacle
    traps += !canExit(copyMap); // If guard can't exit, then count success
  }
  
  console.log("Answer:", traps);
}

processLineByLine();