var grid = [];
function initialEmptyGrid(){
 
    for(var x = 0; x < 2; x++){
        for(var y = 0; y < 2; y++){
            grid.push({
                x:x,
                y:y,
            status: "dead",
            })
        }
    }
    return grid;
}
console.log(initialEmptyGrid());


var initialGrid = initialEmptyGrid();
function aliveCells(){
    initialAliveCells = [{x:1, y:0,status:"alive"}, {x:0, y:1, status:"alive"}, {x:2, y:0, status: "alive"}];
    for(var i = 0; i < initialGrid.length; i++){
        for(var c = 0; c < initialAliveCells.length; c++){
            if(initialGrid[i].x === initialAliveCells[c].x && initialGrid[i].y === initialAliveCells[c].y){
                initialGrid[i] = initialAliveCells[c];
    
            }
        }
    }
    return  initialGrid
}

 console.log(aliveCells());


function checkForNeighbors(x,y){
    var neighbors = [];
for(var i = 0; i < initialGrid.length; i++){
    var neighborToEval = [
        {x:initialGrid[i].x, y:initialGrid[i].y+1},
        {x:initialGrid[i].x+1, y:initialGrid[i].y+1},
        {x:initialGrid[i].x+1, y:initialGrid[i].y},
        {x:initialGrid[i].x+1, y:initialGrid[i].y-1},
        {x:initialGrid[i].x, y:initialGrid[i].y-1},
        {x:initialGrid[i].x-1, y:initialGrid[i].y-1},
        {x:initialGrid[i].x-1, y:initialGrid[i].y},
        {x:initialGrid[i].x-1, y:initialGrid[i].y-1}
       ]
        neighbors.push({coordinate:initialGrid[i],neighbors: neighborToEval})
     }
     return neighbors;
    }
console.log(checkForNeighbors())

function  checkForAliveDeadCells(){
    for(var i = 0; i < initialGrid.length; i++){
        if( initialGrid[i] === "kckv" )
    }
}