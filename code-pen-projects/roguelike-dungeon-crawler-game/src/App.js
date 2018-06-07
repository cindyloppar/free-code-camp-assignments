import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      grid: []
    }
  }

  grid() {
    var grid = [];
    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {
        grid.push({
          x: x,
          y: y,
          status: "dead",
        })
        console.log(grid)
      }
    }
    this.setState({ grid: grid })
  }



  createAliveCells() {
    var initialAliveCells = [];
    var aliveDeadGrid = this.state.grid;
    var random = [{ x: 1, y: 0, status: "alive" }, { x: 2, y: 0, status: "alive" }, { x: 3, y: 0, status: "alive" }, { x: 3, y: 1, status: "alive" }]
    if (initialAliveCells.indexOf(random) === -1) {
      initialAliveCells.push(random);

    }
    for (var i = 0; i < aliveDeadGrid.length; i++) {
      if (initialAliveCells[i] !== undefined) {
        var cellFound = aliveDeadGrid.find(element => element.x === initialAliveCells[i].x && element.y === initialAliveCells[i].y);
        if (aliveDeadGrid[aliveDeadGrid.indexOf(cellFound)]) {

          aliveDeadGrid[aliveDeadGrid.indexOf(cellFound)].status = "alive";
        }
      }
      this.setState({ grid: initialAliveCells });
    }
  }

  componentDidMount() {
    this.grid();
    this.createAliveCells()
    // this.setState({grid:grid})
  }
  render() {
    return (
      <div className="App">
        {this.state.grid.map(element => {
          return <button onClick={() => this.createAliveCells(element)} id={element.status}>{element.status}</button>
        })}
      </div>
    );
  }
}

export default App;
