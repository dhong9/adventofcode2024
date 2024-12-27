const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('day10/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const maze = [];
  for await (const line of rl) {
    maze.push([...line].map(v => +v));
  }

  const scoreTrail = (maze, [r, c]) => {
    // Directions
    const dir = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ]

    // Track trail score
    let count = 0;
    const visited = maze.map(row => row.map(_ => 0));
    const queue = [[r, c, 0]];
    for (const [row, col, score] of queue) {
      // If we reached the end of a trail, add 1 to the score
      count += score === 9;
      visited[r][c] = 1;
      for (const [dRow, dCol] of dir) {
        const nextRow = row + dRow, nextCol = col + dCol;
        if (nextRow >= 0 && nextRow < maze.length && nextCol >= 0 && nextCol < maze[0].length && !visited[nextRow][nextCol] && maze[nextRow][nextCol] === score + 1) {
          queue.push([nextRow, nextCol, maze[nextRow][nextCol]]);
          visited[nextRow][nextCol] = 1;
        }
      }
    }
    return count;
  }

  // Get trail heads
  const starts = [];
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      const curr = maze[i][j];
      if (curr === 0) starts.push([i, j]);
    }
  }

  // Sum score of each trail heads
  let sum = 0;
  for (const start of starts) {
    const score = scoreTrail(maze, start);
    sum += score;
  }

  console.log("Answer:", sum);
  
}

processLineByLine();