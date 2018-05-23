import React from 'react';
import { initialEmptyGrid, aliveCells, checkNeighbors } from "./use-javascript";


export default class Layout extends React.Component {
    constructor() {
        super()
        this.state = {
            grid: [],
            onlyAlive: [],
            status: [],
            gamePaused: false,
            generation: 0,
        }
    }
    componentDidMount() {
        var initial = initialEmptyGrid();
        initial = aliveCells(initial);
        var firstGen = checkNeighbors(initial);
        this.setState({ grid: firstGen.grid, onlyAlive: firstGen.onlyAlive });
        this.generateNewGeneration();

    }

    generateNewGeneration() {
        var counter = 1;
        var looper = setInterval(() => {
            var currentGen = this.state.onlyAlive;
            if (this.state.gamePaused) {
                return;
            }
            var initial = initialEmptyGrid();
            initial = aliveCells(initial, currentGen);
            console.log(currentGen)
            var newGeneration = checkNeighbors(initial);
            currentGen = newGeneration.onlyAlive;
            if (currentGen.length <= 0) {
                clearInterval(looper)
                counter = 0;
            }
            this.setState({ grid: newGeneration.grid, onlyAlive: currentGen, generation: counter });
            counter += 1;

        }, 1000);
    }

    generateDeadAliveCells(value) {
        var currentGrid = this.state.grid;
        var cellFound = currentGrid.find(element => { return value.x === element.x && value.y === element.y });
        console.log("cell", cellFound);
        if (cellFound.status === "alive") {
            currentGrid[currentGrid.indexOf(cellFound)].status = "dead"
        } else if (cellFound.status === "dead") {
            currentGrid[currentGrid.indexOf(cellFound)].status = "alive"
        }
        this.setState({ grid: currentGrid })
    }

    pauseGame() {
        this.setState({ gamePaused: !this.state.gamePaused });

    }

    handleClear() {
        var currentGen = this.state.onlyAlive;
        this.setState({ onlyAlive: [], grid: initialEmptyGrid(), generation: 0 });
    }
    randomly() {

    }
    render() {
        return (
            <div >
                <button onClick={this.generateNewGeneration.bind(this)} id='start'>Start</button>
                <button onClick={this.pauseGame.bind(this)} id='pause'>{this.state.gamePaused ? "Unpause" : "Pause"}</button>
                <button onClick={this.handleClear.bind(this)} id='clear'>Clear</button>
                <p>Generation: {this.state.generation}</p>
                <div className="grid">
                    {this.state.grid.map(element => {
                        return <button onClick={() => this.generateDeadAliveCells(element)} id={element.status}>{element.status}</button>
                    })}
                </div>
            </div>
        );

    }
}