
function initialEmptyGrid() {
    var grid = [];
    for (var x = 0; x < 5; x++) {
        for (var y = 0; y < 5; y++) {
            grid.push({
                x: x,
                y: y,
                status: "dead",
            })
        }
    }
    return grid;
}
function aliveCells(impilo,grid) {
    var initialAliveCells = [];
    var aliveDeadGrid = grid;
    if (!impilo) {
        initialAliveCells = [{ x: 0, y: 0, status: "alive" }, { x: 0, y: 1, status: "alive" }, { x: 1, y: 0, status: "alive" }];

    } else {
        initialAliveCells = impilo;
    }
    for (var i = 0; i < aliveDeadGrid.length; i++) {
        var cellFound = aliveDeadGrid.find(element => element.x === aliveDeadGrid[i].x && element.y === aliveDeadGrid[i].y);
        aliveDeadGrid[aliveDeadGrid.indexOf(cellFound)].status = "alive";
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


function checkNeighbors(displayGrid) {
    var grid = displayGrid;
    grid.forEach(element => {
        var cellsNeighbor = checkForAliveNeighbors(element);
        var aliveNeighbors = [];
        var deadNeighbors = [];
        cellsNeighbor.listOfNeighbors.forEach(item => {
            var actualCell = grid.find(cell => cell.x === item.x && cell.y === item.y);
            if (actualCell !== undefined && actualCell.status === "alive") {
                aliveNeighbors.push(actualCell)
            } else if (actualCell !== undefined && actualCell.status === "dead") {
                deadNeighbors.push(actualCell)
            }
        })
        if (element.status === "dead" && deadNeighbors.length === 3) {
            element.status = "alive";

        } else if (element.status === "alive" && aliveNeighbors.length > 3) {
            element.status = "dead"
        } else if (element.status === "alive" && aliveNeighbors.length < 2) {
            element.status = "dead";
        } else if (element.status === "alive" && aliveNeighbors.length === 2 || aliveNeighbors.length === 3) {
            element.status = "alive"
        }

    });
    return grid;
}


module.exports = { initialEmptyGrid, aliveCells, checkNeighbors }