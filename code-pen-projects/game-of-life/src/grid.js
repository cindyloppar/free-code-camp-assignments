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



function fixedSizeGridOfDeadAndAliveCells(aliveCells, lowest = 0, highest = 10) {
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


function checkForAliveNeighbors(obj) {
    var neighbors = {};
    var allNeighbors = [
        { x: obj.x, y: obj.y + 1 },
        { x: obj.x + 1, y: obj.y + 1 },
        { x: obj.x + 1, y: obj.y },
        { x: obj.x + 1, y: obj.y - 1 },
        { x: obj.x, y: obj.y - 1 },
        { x: obj.x - 1, y: obj.y - 1 },
        { x: obj.x - 1, y: obj.y },
        { x: obj.x - 1, y: obj.y + 1 }
    ]
    neighbors = { coordinate: obj, listOfNeighbors: allNeighbors };
    return neighbors;

}

function getNewGenerationOfAliveCells(onlyAlive) {
    var grid = findMinMax(onlyAlive);
    var aliveCells = [];
    var newGrid = [];
    grid.forEach(element => {
        var cellsNeighbor = checkForAliveNeighbors(element);
        var neighbors = cellsNeighbor.listOfNeighbors;
        var aliveNeighbors = [];
        var deadNeighbors = [];
        var newCell = {};
        neighbors.forEach(item => {
            var actualCell = grid.find(cell => { return cell.x === item.x && cell.y === item.y });
            if (actualCell !== undefined && actualCell.status === "alive") {
                aliveNeighbors.push(actualCell);
            } else if (actualCell !== undefined && actualCell.status === "dead") {
                deadNeighbors.push(actualCell);
            }
        });
        if (element.status === "dead" && aliveNeighbors.length === 3) {
            newCell = { x: element.x, y: element.y, status: "alive" }
            newGrid.push(newCell);
        } else if (element.status === "alive" && (aliveNeighbors.length === 2 || aliveNeighbors.length === 3)) {
            newCell = { x: element.x, y: element.y, status: "alive" }
            newGrid.push(newCell);
        } else if (element.status === "alive" && aliveNeighbors.length > 3) {
            newCell = { x: element.x, y: element.y, status: "dead" }
            newGrid.push(newCell);
        } else if (element.status === "alive" && aliveNeighbors.length < 2) {
            newCell = { x: element.x, y: element.y, status: "dead" }
            newGrid.push(newCell);
        } else {
            newCell = { x: element.x, y: element.y, status: element.status }
            newGrid.push(newCell);
            if (element.status === "alive") {
            }
        }
    });
    var obj = newGrid.filter(element => { return element.status === "alive" })
    return obj;

}

function findMinMax(onlyAlive) {
    var newGen = [];
    var {newLowestX, newHighestX,newLowestY,newHighestY} = getBoundaries(onlyAlive);
    for (var i = newLowestX - 2; i < newHighestX + 2; i++) {
        for (var c = newLowestY - 2; c < newHighestY + 2; c++) {
            var foundCells = onlyAlive.find(e => e.x === i && e.y === c)
            foundCells = foundCells ? { ...foundCells, status: "alive" } : { x: i, y: c, status: "dead" };
            newGen.push(foundCells);
        }
    }

    return newGen;

}
module.exports = { fixedSizeGridOfDeadAndAliveCells, changeDeadCellsToAliveCellsInAGrid, getNewGenerationOfAliveCells, findMinMax, getBoundaries }