

function getBoundaries(aliveCells) {
    var onlyX = [];
    var onlyY = [];

    for (let index = 0; index < aliveCells.length; index++) {
        onlyX.push(aliveCells[index].x);
        onlyY.push(aliveCells[index].y);
    }

    var newHighestX = onlyX.sort((a, b) => b - a)[0] + 1;
    var newLowestX = onlyX.sort((a, b) => a - b)[0] - 1;
    var newLowestY = onlyY.sort((a, b) => a - b)[0] - 1;
    var newHighestY = onlyY.sort((a, b) => b - a)[0] + 1;
    return { newHighestX, newLowestX, newHighestY, newLowestY }
}

function fixedSizeGridOfDeadCells(aliveCells, lowest = 0, highest = 10) {
    var grid = [];
    var lowestX = lowest;
    var highestX = highest;
    var lowestY = lowest;
    var highestY = highest;

    if (aliveCells.length > 0) {
        var { newLowestX, newHighestX, newLowestY, newHighestY } = getBoundaries(aliveCells);

        if (newHighestX > highest) {
            highestX = newHighestX;
        }

        if (newLowestX < lowest) {
            lowestX = newLowestX;
        }

        if (newHighestY > highest) {
            highestY = newHighestY;
        }

        if (newLowestY < lowest) {
            lowestY = newLowestY;
        }

    }

    for (var x = lowestX; x <= highestX; x++) {
        for (var y = lowestY; y <= highestY; y++) {
            grid.push({
                x: x,
                y: y,
                status: "dead",
            })
        }
    }
    return grid;
}


function changeDeadCellsToAliveCellsInAGrid(grid, aliveCells) {
    var initialAliveCells = [];
    var aliveDeadGrid = grid;
    if (aliveCells === undefined) {
        var randomArray = [];
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                var random = { x: Math.floor(Math.random() * 8), y: Math.floor(Math.random() * 8), status: 'alive' };
                if (randomArray.indexOf(random) === -1) {
                    randomArray.push(random);
                }
            }
        }
        initialAliveCells = randomArray;

    } else {
        initialAliveCells = aliveCells;
    }
    for (var i = 0; i < aliveDeadGrid.length; i++) {
        if (initialAliveCells[i] !== undefined) {
            var cellFound = aliveDeadGrid.find(element => element.x === initialAliveCells[i].x && element.y === initialAliveCells[i].y);
            if (aliveDeadGrid[aliveDeadGrid.indexOf(cellFound)]) {

                aliveDeadGrid[aliveDeadGrid.indexOf(cellFound)].status = "alive";
            }
        }
    }
    return aliveDeadGrid
}

module.exports = { fixedSizeGridOfDeadCells, changeDeadCellsToAliveCellsInAGrid,  }



















//  function grid() {
//     var grid = this.state.grid;
//     for (var x = 0; x < 6; x++) {
//       for (var y = 0; y < 6; y++) {
//         grid.push({
//           x: x,
//           y: y,
//           status: "X",
//         })
//       }
//     }
//   }
  
  
//   function pathWays(grid) {
//      grid = [];
//      var paths = [
//        { x: 1, y: 1, player: "", status: "pass" },
//        { x: 2, y: 1, player: "", status: "pass" },
//        { x: 0, y: 1, player: "", status: "pass" },
//        { x: 4, y: 5, player: "", status: "pass" },
//        { x: 5, y: 1, player: "", status: "pass" },
//        { x: 6, y: 2, player: "", status: "pass" },
      
//       ]
//       grid.push(paths);
//   }

//   module.exports = { grid, pathWays}