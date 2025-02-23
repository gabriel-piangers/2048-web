export function addRandomBox(grid, setGrid) {
  const emptySpots = [];
  for (let row = 0; row < 4; row++) {
    for (let box = 0; box < 4; box++) {
      if (grid[row][box] === 0) {
        emptySpots.push([row, box]);
      }
    }
  }
  const rngBox = emptySpots[Math.floor(Math.random() * emptySpots.length)];
  const rngValue = Math.random() > 0.65 ? 4 : 2;
  let newGrid = grid.slice();
  newGrid[rngBox[0]][rngBox[1]] = rngValue;
  setGrid(newGrid);
  return newGrid;
}

export function checkLose(grid) {
  const emptySpots = [];
  for (let row = 0; row < 4; row++) {
    for (let box = 0; box < 4; box++) {
      if (grid[row][box] === 0) {
        emptySpots.push([row, box]);
      }
    }
  }
  if (emptySpots.length === 0) {
    for(let x = 0; x<4; x++) {
      for(let y = 0; y<4; y++) {
        const directions = [[0, -1], [-1, 0], [1, 0], [0, 1]]
        //for each neighbor box
        for (const [cX, cY] of directions) {
          const adjX = x + cX;
          const adjY = y + cY;
          if (adjX >= 0 && adjX < 4 && adjY >= 0 && adjY < 4) {
            if (grid[x][y] === grid[adjX][adjY]) {
              return false;
            }
          }
        }
      }
    }
    return true;
  } else {
    return false;
  }
}

export function updateGrid(grid, setGrid, score, setScore, key) {
  let newScore = score;

  if (key === "a") {
    let newGrid = grid.map((row) => [...row]);
    let alreadyCombined = new Set();
    for (let row = 0; row <= 3; row++) {
      for (let j = 1; j <= 3; j++) {
        if (newGrid[row][j] === 0) {
          continue;
        }
        let k = j - 1;
        while (k >= 0) {
          if (newGrid[row][k] !== 0) {
            if (
              newGrid[row][k] === newGrid[row][j] &&
              !alreadyCombined.has(`${row}, ${k}`)
            ) {
              alreadyCombined.add(`${row}, ${k}`);
              newScore += newGrid[row][k] * 2;
              break;
            } else {
              k++;
              break;
            }
          } else {
            k--;
          }
        }
        k < 0 ? k++ : (k += 0);
        const value = newGrid[row][j];
        newGrid[row][k] += value;
        newGrid[row][j] -= value;
      }
    }
    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      addRandomBox(newGrid, setGrid);
    }
  } else if (key === "d") {
    let newGrid = grid.map((row) => [...row]);
    let alreadyCombined = new Set();
    for (let row = 0; row <= 3; row++) {
      for (let j = 2; j >= 0; j--) {
        if (newGrid[row][j] === 0) {
          continue;
        }
        let k = j + 1;
        while (k >= 0) {
          if (newGrid[row][k] !== 0) {
            if (
              newGrid[row][k] === newGrid[row][j] &&
              !alreadyCombined.has(`${row}, ${k}`)
            ) {
              alreadyCombined.add(`${row}, ${k}`);
              newScore += newGrid[row][k] * 2;
              break;
            } else {
              k--;
              break;
            }
          } else {
            k++;
          }
        }
        k < 0 ? k++ : (k += 0);
        const value = newGrid[row][j];
        newGrid[row][k] += value;
        newGrid[row][j] -= value;
      }
    }
    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      addRandomBox(newGrid, setGrid);
    }
  } else if (key === "w") {
    let newGrid = grid.map((row) => [...row]);
    let alreadyCombined = new Set();
    let col = 0;
    while (col < 4) {
      for (let i = 1; i < 4; i++) {
        if (newGrid[i][col] === 0) {
          continue;
        }
        let k = i - 1;
        while (k >= 0) {
          if (newGrid[k][col] !== 0) {
            if (
              newGrid[k][col] === newGrid[i][col] &&
              !alreadyCombined.has(`${k}, ${col}`)
            ) {
              alreadyCombined.add(`${k}, ${col}`);
              newScore += newGrid[k][col] * 2;
              break;
            } else {
              k++;
              break;
            }
          } else {
            k--;
          }
        }

        k < 0 ? k++ : (k += 0);
        const value = newGrid[i][col];
        newGrid[k][col] += value;
        newGrid[i][col] -= value;
      }

      col++;
    }
    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      addRandomBox(newGrid, setGrid);
    }
  } else if (key === "s") {
    let newGrid = grid.map((row) => [...row]);
    let alreadyCombined = new Set();
    let col = 0;
    while (col < 4) {
      for (let i = 2; i >= 0; i--) {
        if (newGrid[i][col] === 0) {
          continue;
        }
        let k = i + 1;
        while (k < 4) {
          if (newGrid[k][col] !== 0) {
            if (
              newGrid[k][col] === newGrid[i][col] &&
              !alreadyCombined.has(`${k}, ${col}`)
            ) {
              alreadyCombined.add(`${k}, ${col}`);
              newScore += newGrid[k][col] * 2;
              break;
            } else {
              k--;
              break;
            }
          } else {
            k++;
          }
        }

        k > 3 ? k-- : (k += 0);
        const value = newGrid[i][col];
        newGrid[k][col] += value;
        newGrid[i][col] -= value;
      }

      col++;
    }
    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      addRandomBox(newGrid, setGrid);
    }
  }
  setScore(newScore)
}
