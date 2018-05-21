import React from 'react';
import { initialEmptyGrid, aliveCells, checkNeighbors, checkForAliveNeighbors } from "./use-javascript";


export default class Layout extends React.Component {
    constructor() {
        super()
        this.state = {
            grid: [],
            onlyAlive: [],
            status: [],
            pauseGame: true,
            generation: 0,
        }
    }
    componentDidMount() {
        var initial = initialEmptyGrid();
        initial = aliveCells(initial);
        var firstGen = checkNeighbors(initial);
        this.setState({ grid: firstGen.grid, onlyAlive: firstGen.onlyAlive });

    }
    generateNewGeneration() {
        var counter = 0;
        var currentGen = this.state.onlyAlive;
        var looper = setInterval(() => {
            var initial = initialEmptyGrid();
            initial = aliveCells(initial, currentGen);
            var newGeneration = checkNeighbors(initial);
            currentGen = newGeneration.onlyAlive;
            this.setState({ grid: newGeneration.grid, onlyAlive: newGeneration.aliveCells });
            counter += 1;
            if (counter === 5) {
                clearInterval(looper)
            }
        }, 1000);
        this.setState({ pauseGrid: false });
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
    pauseGenerating() {
        console.log("pause game")
        this.state.grid.forEach(element => {
            if (element.status === "alive") {
            } else if (element.status === "dead") {
                this.setState({ pauseGame: false });
            }
        })
    }

    handleClear() {
        console.log("clear game")
        //    this.setState({generation: 0, pauseGame: false});
        this.state.grid.forEach(element => {
            if (element.status === 'alive') {
                element.status = 'dead';
            }
            clearTimeout(this.grid)
            this.setState({ grid: this.state.grid, onlyAlive: [] }
            )
        })
    }

    render() {
        return (
            <div >
                <button onClick={this.generateNewGeneration.bind(this)}>Start</button>
                <button onClick={this.pauseGenerating.bind(this)}>Pause</button>
                <button onClick={this.handleClear.bind(this)}>Clear</button>
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