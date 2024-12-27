const rows = 103, cols = 101;

// Negative mod used to guarantee positive number
const getRobotPos = (px, py, vx, vy, seconds) => [(((px + vx * seconds) % cols) + cols) % cols, (((py + vy * seconds) % rows) + rows) % rows];

// Calculate by multiplying number of robots in:
// Top left quadrant
// Top right quadrant
// Bottom left quadrant
// Bottom right quadrant
const calcSafety = (robots, sec) => {
    const robotPositions = robots.map(robot => getRobotPos(...robot[0], ...robot[1], sec));

    let topLeft = 0, topRight = 0, bottomLeft = 0, bottomRight = 0;
    for (const [x, y] of robotPositions) {
        topLeft += x < (cols >> 1) && y < (rows >> 1);
        topRight += x > (cols >> 1) && y < (rows >> 1);
        bottomLeft += x < (cols >> 1) && y > (rows >> 1);
        bottomRight += x > (cols >> 1) && y > (rows >> 1);
    }

    return topLeft * topRight * bottomLeft * bottomRight;
}

// Prints visual representation of robots at a given snapshot
const view = (robots, sec) => {
    const layout = [];
    for (let r = 0; r < rows; r++) {
        const temp = [];
        for (let c = 0; c < cols; c++) {
            temp.push('.');
        }
        layout.push(temp);
    }

    for (const [position, velocity] of robots) {
        const [x, y] = getRobotPos(...position, ...velocity, sec);
        layout[y][x] = 'X';
    }
    for (const row of layout) {
        console.log(row.join(''));
    }
}

const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('day14/input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  const robots = [];
  for await (const line of rl) {
    const [position, velocity] = line.split(' ').map(row => row.split('=')[1].split(',').map(v => +v));
    robots.push([position, velocity]);
  }

  const safety = [];
  for (let sec = 0; sec < rows * cols; sec++) {
    safety.push(calcSafety(robots, sec));
  }
  
  console.log("Safety after 100 secs:", safety[100]);

  // To see Christmas tree for part 2, output data to text file (see day14.log)
  const enumeratedSafety = safety.map((v, i) => [i, v]);
  enumeratedSafety.sort((a, b) => a[1] - b[1]);
  for (const [sec, safety] of enumeratedSafety) {
    console.log("Second:", sec);
    view(robots, sec);
    console.log();
  }
  
}

processLineByLine();