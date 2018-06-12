import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      grid: [],
      status: '',
      player: {},
      path: []
    }
  }

  componentDidMount() {
    this.grid()
    // this.pathways();
    this.setState({ path: this.grid })
  }

  grid() {
    var grid = [];
    for (var x = 0; x < 6; x++) {
      for (var y = 0; y < 6; y++) {
        grid.push({
          x: x,
          y: y,
          status: "X",
        })
      }
    }
    this.setState({ grid: grid });
  }


  pathways(grid) {
    grid = [];
    var paths = [
      { x: 1, y: 1, player: "", status: "pass" },
      { x: 2, y: 1, player: "", status: "pass" },
      { x: 3, y: 1, player: "", status: "pass" },
      { x: 4, y: 1, player: "", status: "pass" },
      { x: 5, y: 1, player: "", status: "pass" },
      { x: 6, y: 2, player: "", status: "pass" },
      { x: 7, y: 2, player: "", status: "pass" },
      { x: 8, y: 3, player: "", status: "pass" },
    ]
    grid.push(paths);
    console.log('path', grid);
    this.setState({ grid: paths })
  }


  render() {
    return (
      <div >
        <div className='heading'>
          <h3>Dungeon Crawler Game</h3>
        </div>
        <div className="icons">
          <ul className="fa-ul">
            <li><span className="fa-li"><i className="fas fa-check-square"></i></span>List icons can</li>
            <li><span className="fa-li"><i className="fas fa-check-square"></i></span>be used to</li>
            <li><span className="fa-li"><i className="fas fa-spinner fa-pulse"></i></span>replace bullets</li>
            <li><span className="fa-li"><i className="far fa-square"></i></span>in lists</li>
          </ul>
        </div>
        <div className="grid">
          {this.state.grid.map(element => {
            return <button onClick={() => this.grid()(element)} id={element.status}>{element.status}</button>
          })}
        </div>
      </div>
    );
  }
}

export default App;
