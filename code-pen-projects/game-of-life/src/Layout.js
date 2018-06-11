import React from 'react';
import { fixedSizeGridOfDeadAndAliveCells, changeDeadCellsToAliveCellsInAGrid, getNewGenerationOfAliveCells, findMinMax, getBoundaries } from "./grid";

export default class Layout extends React.Component {
    constructor() {
        super()
        this.state = {
            grid: [],
            onlyAlive: [],
            status: [],
            gamePaused: false,
            timeChange: false,
            generation: 0,
            speed: 1000,
            highLow: { highestX: 0, lowestX: 0, highestY: 0, lowestY: 0 }
        }
    }
    componentDidMount() {
        var initial = fixedSizeGridOfDeadAndAliveCells([]);
        initial = changeDeadCellsToAliveCellsInAGrid(initial);
        var onlyAlive = initial.filter(e => e.status === "alive");
        var firstGenOfAlive = getNewGenerationOfAliveCells(onlyAlive);
        var firstGenAliveDead = changeDeadCellsToAliveCellsInAGrid(initial, firstGenOfAlive);
        this.setState({ grid: firstGenAliveDead, onlyAlive: firstGenOfAlive });
        this.generateNewGeneration();


    }

    generateNewGeneration() {
        var counter = this.state.generation;
        var currentSpeed = this.state.speed;
        var looper = setInterval(() => {
        var currentGenAliveCells = this.state.onlyAlive;
        if (this.state.gamePaused) {
        return;
        }
        var gridWithDeadCells = fixedSizeGridOfDeadAndAliveCells(currentGenAliveCells);
        var newGenerationOfAliveCells = getNewGenerationOfAliveCells(currentGenAliveCells);
        gridWithDeadCells = changeDeadCellsToAliveCellsInAGrid(gridWithDeadCells, newGenerationOfAliveCells);
        if (currentGenAliveCells.length <= 0) {
        clearInterval(looper)
        counter = 0;
        } else if (this.state.timeChange) {
        this.setState({ timeChange: false })
        this.generateNewGeneration()
        }
        
        counter += 1;
        this.setState({ grid: gridWithDeadCells, onlyAlive: newGenerationOfAliveCells, generation: counter });
        
        }, this.state.speed);
        }
        

    generateDeadAliveCells(value) {
        var currentGrid = this.state.grid;
        var live = this.state.onlyAlive;
        var cellFound = currentGrid.find(element => { return value.x === element.x && value.y === element.y });
        var findCell = live.find(element => { return value.x === element.x && value.y === element.y });
        if (cellFound.status === "alive") {
            currentGrid[currentGrid.indexOf(cellFound)].status = "dead"
            live.splice(live.indexOf(currentGrid[currentGrid.indexOf(cellFound)]), 1);
        } else if (cellFound.status === "dead") {
            currentGrid[currentGrid.indexOf(cellFound)].status = "alive"
            live.push(currentGrid[currentGrid.indexOf(cellFound)]);
        }

        this.setState({ grid: currentGrid, onlyAlive: live })
    }

    pauseGame() {
        this.setState({ gamePaused: !this.state.gamePaused });
    }

    handleClear() {
        var currentGen = this.state.onlyAlive;
        this.setState({ onlyAlive: [], grid: fixedSizeGridOfDeadAndAliveCells(currentGen), generation: 0 });
    }
    mediumSpeed() {
        this.setState({ speed: 1000, timeChange: true })
    }

    fastSpeed() {
        this.setState({ speed: 200, timeChange: true })
    }

    slowSpeed() {
        this.setState({ speed: 2000, timeChange: true });
    }
    render() {

        var { newLowestX, newHighestX, newLowestY, newHighestY } = getBoundaries(this.state.grid);
        var xSize = newHighestX - newLowestX - 1;
        var ySize = newHighestY - newLowestY - 1;
        return (
            <div >
                <h3>CONWAY'S GAME OF LIFE!!</h3>
                <button onClick={this.generateNewGeneration.bind(this)} id='start'>Start</button>
                <button onClick={this.pauseGame.bind(this)} id='pause'>{this.state.gamePaused ? "Unpause" : "Pause"}</button>
                <button onClick={this.handleClear.bind(this)} id='clear'>Clear</button>
                <p>Generation: {this.state.generation}</p>
                <p> Speed: <button onClick={this.fastSpeed.bind(this)} id='speed'>Fast</button>
                    <button onClick={this.mediumSpeed.bind(this)} id='speed'>Medium</button>
                    <button onClick={this.slowSpeed.bind(this)} id='speed'>Slow</button> </p>
                <div className="grid" style={{
                    gridTemplateColumns: "repeat(" + ySize + ",20px)",
                    gridTemplateRows: "repeat(" + xSize + ",20px)",
                  
                }}>
                    {this.state.grid.map(element => {
                        return <button className="cell" onClick={() => this.generateDeadAliveCells(element)} id={element.status}></button>
                    })}
                </div>
            </div>
        );

    }
}