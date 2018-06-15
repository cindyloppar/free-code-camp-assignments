import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      grid: [],
      status: '',
      player: { x: 1, y: 1, player: "", status: "pass" },
      path: [],
      health: 20,
      weapon: 1,
      level: 1,
      enemies: [],
    }
    this.grid = this.grid.bind(this);
    this.pathWays = this.pathWays.bind(this);
    this.creatingRandomEnemies = this.creatingRandomEnemies.bind(this)
  }

  componentDidMount() {
    this.grid()
    this.pathWays()
    // this.setState({ grid:this.grid()})
  }


  grid() {
    var deadCells = [];
    for (var x = 0; x < 10; x++) {
      for (var y = 0; y < 10; y++) {
        deadCells.push({
          x: x,
          y: y,
          status: "X",
        })
      }
    }
    this.setState({ grid: deadCells});
  }

  pathWays() {
    var cells = this.state.grid;
    var path = [];
    var paths = [
      { x: 1, y: 1, player: "", status: "pass" },
      { x: 2, y: 1, player: "", status: "pass" },
      { x: 3, y: 1, player: "", status: "pass" },
      { x: 4, y: 1, player: "", status: "pass" },
      { x: 5, y: 1, player: "", status: "pass" },
      { x: 6, y: 2, player: "", status: "pass" },
      { x: 7, y: 2, player: "", status: "pass" },
      { x: 8, y: 3, player: "", status: "pass" },
      { x: 5, y: 3, player: "", status: "pass" },
      { x: 32, y: 1, player: "", status: "pass" },
      { x: 67, y: 3, player: "", status: "pass" },
      { x: 18, y: 5, player: "", status: "pass" },
      { x: 97, y: 2, player: "", status: "pass" },
      { x: 64, y: 4, player: "", status: "pass" },
      { x: 55, y: 2, player: "", status: "pass" },
      { x: 87, y: 3, player: "", status: "pass" },
    ]
    path.push(paths);
    for (var i = 0; i < cells.length; i++) {
      if (cells[i] !== undefined) {
        var cellFound = cells.find(element => element.x === path[i].x && element.y === path[i].y);
        console.log('found', cellFound)
        if (cells[cells.indexOf(cellFound)]) {
          cells[cells.indexOf(cellFound)].status = "pass";
        }
      }
    }
    this.grid();
    this.setState({ path:paths })
  }
  
  creatingRandomEnemies() {
    var newGrid = this.state.grid;
    console.log(newGrid);
    var enemy = this.state.enemies;
    var randomArray = [];
    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        var random = { x: Math.floor(Math.random() * 8), y: Math.floor(Math.random() * 8), status: 'pass' };
        if (randomArray.indexOf(random) === -1) {
          randomArray.push(random);
        }
      }
    }
    for (var i = 0; i < randomArray.length; i++) {
      var findMatch = randomArray.find(element => element.x === randomArray[i].x && element.y === randomArray[i].y);
      console.log('path', findMatch);
      if (newGrid[newGrid.indexOf(findMatch)]) {
        newGrid[newGrid.indexOf(findMatch)].status = 'pass';
      }
      
    }
    this.setState({ enemies: randomArray, grid:newGrid})
  }
    // Random Position Generator

    //  genPos = () =>{
    //   return Number(Math.floor(Math.random()*30));
    //   }

    //  genAttack = (dungeon)=>{
    //   return Number((dungeon)*Math.floor(Math.random()*10)+1)
    // }


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
