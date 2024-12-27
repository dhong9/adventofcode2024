const fs = require('fs');
const readline = require('readline');

// Checks if two locks can fit
// It's okay if both slots are empty
const canFit = (lock1, lock2) => {
    for (let r = 0; r < lock1.length; r++) {
        for (let c = 0; c < lock1[r].length; c++) {
            if (lock1[r][c] === lock2[r][c] && lock2[r][c] === '#')
                return false;
        }
    }
    return true;
}

async function processLineByLine() {
    const fileStream = fs.createReadStream('day25/input.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    const locks = [];
    
    let temp = [];
    for await (const line of rl) {
        if (line) {
            temp.push(line);
        } else {
            locks.push(temp);
            temp = [];
        }
    }
    locks.push(temp);
    
    // Count how many combinations fit
    let count = 0;
    for (let i = 0; i < locks.length - 1; i++) {
        for (let j = i + 1; j < locks.length; j++) {
            count += canFit(locks[i], locks[j])
        }
    }

    console.log(count)
}
  
  processLineByLine();