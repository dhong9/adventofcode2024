const fs = require('fs');
const readline = require('readline');

const dirMap = {
    '^': [-1, 0],
    'v': [1, 0],
    '<': [0, -1],
    '>': [0, 1]
};

const moveRobot = (maze, instructions) => {
    let currRow = -1, currCol = -1;

    // Find starting position
    for (let r = 0; r < maze.length; r++) {
        for (let c = 0; c < maze[r].length; c++) {
            if (maze[r][c] === '@') {
                currRow = r;
                currCol = c;
                break;
            }
        }
    }

    for (const instruction of instructions) {
        const [dRow, dCol] = dirMap[instruction];
        
        // Identify pieces to move
        const pieces = [];
        let tempRow = currRow, tempCol = currCol;
        while (tempRow >= 0 && tempRow < maze.length && tempCol >= 0 && tempCol < maze[0].length && maze[tempRow][tempCol] !== '#' && maze[tempRow][tempCol] !== '.') {
            pieces.push([tempRow, tempCol]);
            tempRow += dRow;
            tempCol += dCol;
        }

        // Move each piece
        let moved = false;
        while (pieces.length) {
            const [pieceRow, pieceCol] = pieces.pop();
            const nextRow = pieceRow + dRow, nextCol = pieceCol + dCol;
            if (maze[nextRow]?.[nextCol] === '.') {
                maze[nextRow][nextCol] = maze[pieceRow][pieceCol];
                maze[pieceRow][pieceCol] = '.';
                moved = true;
            }
        }
        if (moved) {
            currRow += dRow;
            currCol += dCol;
        }
    }
}

const sumCoords = maze => {
    let sum = 0;
    for (let r = 0; r < maze.length; r++) {
        for (let c = 0; c < maze[r].length; c++) {
            if (maze[r][c] === 'O') {
                sum += 100 * r + c;
            }
        }
    }
    return sum;
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('day15/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const maze = [];
  let instructions = "";
  let readMaze = true;
  for await (const line of rl) {
    if (!line) readMaze = false;
    if (line) {
        if (readMaze)
            maze.push([...line]);
        else
            instructions += line;
    }
  }

  moveRobot(maze, instructions);
  const sum = sumCoords(maze);
  console.log("Answer:", sum);
  
}

processLineByLine();