function initialEmptyGrid() {
    var grid = [];

    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {
            grid.push({
                x: x,
                y: y,
                status: "dead",
            })
        }
    }
    return grid;
}

function aliveCells(grid, impilo) {
    var initialAliveCells = [];
    var aliveDeadGrid = grid;
    if (impilo === undefined) {
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
        initialAliveCells = impilo;
    }
    for (var i = 0; i < aliveDeadGrid.length; i++) {
        if (initialAliveCells[i] !== undefined) {
            var cellFound = aliveDeadGrid.find(element => element.x === initialAliveCells[i].x && element.y === initialAliveCells[i].y);
            console.log('onny', aliveDeadGrid[aliveDeadGrid.indexOf(cellFound)])
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

function checkNeighbors(onlyAlive) {
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
    var onlyX = [];
    var onlyY = [];
    var newGen = [];

    for (let index = 0; index < onlyAlive.length; index++) {
        onlyX.push(onlyAlive[index].x);
        onlyY.push(onlyAlive[index].y);

    }
    var highestX = onlyX.sort((a, b) => b - a)[0];
    var lowestX = onlyX.sort((a, b) => a - b)[0];
    var lowestY = onlyY.sort((a, b) => a - b)[0];
    var highestY = onlyY.sort((a, b) => b - a)[0];

    for (var i = lowestX - 2; i < highestX + 2; i++) {
        for (var c = lowestY - 2; c < highestY + 2; c++) {
            var foundCells = onlyAlive.find(e => e.x === i && e.y === c)
            foundCells = foundCells ? { ...foundCells, status: "alive" } : { x: i, y: c, status: "dead" };
            newGen.push(foundCells);
        }
    }

    return newGen;

}
module.exports = { initialEmptyGrid, aliveCells, checkNeighbors, findMinMax }