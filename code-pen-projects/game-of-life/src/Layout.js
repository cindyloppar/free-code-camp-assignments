import React from 'react';
import { initialEmptyGrid, aliveCells, checkNeighbors, checkForAliveNeighbors } from "./use-javascript";


export default class Layout extends React.Component {
    constructor() {
        super(),
            this.state = {
                grid: [],
                onlyAlive: [],
                status:[],
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
        }, 2000);
    }
     generateDeadAliveCells(){
         var currentState = this.state.status;
         var initial = initialEmptyGrid();
         var generate = checkNeighbors(initial)
         if (currentState === "dead"){
            status.push(currentState) === "alive"
         }else if(currentState === "alive"){
             status.push(currentState) === "dead"
         }
         this.setState({grid:currentState.status, status: currentState.checkNeighbors});
         console.log(generate)
     }
    
    // var initial = initialEmptyGrid();
    // initial = aliveCells(initial);
    // var firstGen = checkNeighbors(initial);


    // var secondInitial = initialEmptyGrid();
    // secondInitial = aliveCells(secondInitial, firstGen.onlyAlive);
    // var secondGen = checkNeighbors(secondInitial);
    // console.log(firstGen, secondGen)
    render() {
        return (
            <div >
                <button onClick={this.generateNewGeneration.bind(this)}>Start</button>
                <div className="grid">
                    {this.state.grid.map(element => {
                        return <button onClick={this.generateDeadAliveCells.bind(this)} id={element.status}>{element.status}</button>
                    })}
                </div>
            </div>
        );

    }
}