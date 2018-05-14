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

function aliveCells(grid, impilo) {
    var initialAliveCells = [];
    var aliveDeadGrid = grid;
    if (impilo === undefined) {
        initialAliveCells = [{ x: 0, y: 1, status: "alive" }, { x: 1, y: 2, status: "alive" }, { x: 2, y: 2, status: "alive" }, { x: 2, y: 1, status: "alive" }, { x: 2, y: 0, status: "alive" }]

    } else {
        initialAliveCells = impilo;
    }
    for (var i = 0; i < aliveDeadGrid.length; i++) {
        if (initialAliveCells[i] !== undefined) {
            var cellFound = aliveDeadGrid.find(element => element.x === initialAliveCells[i].x && element.y === initialAliveCells[i].y);
            aliveDeadGrid[aliveDeadGrid.indexOf(cellFound)].status = "alive";
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

function checkNeighbors(displayGrid) {
    var grid = displayGrid;
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
        }
    });
    var obj = { grid: newGrid, onlyAlive: newGrid.filter(element => { return element.status === "alive" }) }
    return obj;

    // var generateAliveDead = {
    //     grid: newGrid, aliveAndDead: newGrid.forEach(element => {
    //         return
    //         if (element.status === "alive") {
    //             element.status === "dead";
    //         } else if (element.status === "dead") {
    //             element.status === "alive";
    //         }
    //     })
    // }
    // return generateAliveDead;
}
module.exports = { initialEmptyGrid, aliveCells, checkNeighbors, checkForAliveNeighbors }