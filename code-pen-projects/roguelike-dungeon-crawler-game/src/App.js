import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      grid: [],
      status: '',
      player: { x: 1, y: 1, player: "", status: "pass" },
      playerLife: 50,
      path: [],
      health: [],
      weapon: [],
      level: 1,
      enemies: [],
      enemyLife: 20,
    }
    this.grid = this.grid.bind(this);
    this.pathWays = this.pathWays.bind(this);
    this.creatingRandomEnemies = this.creatingRandomEnemies.bind(this);
    this.playerMovesInTheGrid = this.playerMovesInTheGrid.bind(this);
  }

  componentDidMount() {
    document.onkeydown = this.playerMovesInTheGrid;
    var allDeadCells = this.grid();
    var aliveAndDead = this.pathWays(allDeadCells);

    var newGrid = this.creatingRandomEnemies(aliveAndDead.grid);
    this.placeAllRandomFunctions(aliveAndDead.grid)
    this.setState({ grid: aliveAndDead.grid });
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
    return deadCells;
  }

  pathWays(deadGrid) {
    var cells = deadGrid;
    var paths = [
      { x: 1, y: 1, player: ":)", status: "pass" },
      { x: 0, y: 1, player: "", status: "pass" },
      { x: 0, y: 2, player: "", status: "pass" },
      { x: 1, y: 2, player: "", status: "pass" },
      { x: 2, y: 2, player: "", status: "pass" },
      { x: 3, y: 2, player: "", status: "pass" },
      { x: 3, y: 3, player: "", status: "pass" },
      { x: 4, y: 5, player: "", status: "pass" },
      { x: 3, y: 4, player: "", status: "pass" },
      { x: 3, y: 5, player: "", status: "pass" },
      { x: 5, y: 5, player: "", status: "pass" },
      { x: 5, y: 6, player: "", status: "pass" },
      { x: 5, y: 7, player: "", status: "pass" },
      { x: 5, y: 8, player: "", status: "pass" },
      { x: 6, y: 7, player: "", status: "pass" },
      { x: 5, y: 4, player: "", status: "pass" },
      { x: 6, y: 4, player: "", status: "pass" },
      { x: 6, y: 3, player: "", status: "pass" },
      { x: 7, y: 3, player: "", status: "pass" },
      { x: 7, y: 7, player: "", status: "pass" },

    ];
    for (var i = 0; i < paths.length; i++) {
      var cellFound = cells.find(element => element.x === paths[i].x && element.y === paths[i].y);
      if (cells[cells.indexOf(cellFound)]) {
        cells[cells.indexOf(cellFound)].status = "pass";
      }
    }
    return { grid: cells, path: paths, player: paths }
  }

  creatingRandomEnemies(aliveCells) {
    var onlyAlive = aliveCells
    var randomArray = [];
    var i = 7;
    while (randomArray.length < i) {
      var randomNumber = Math.floor(Math.random() * onlyAlive.length);
      var randomCell = { ...onlyAlive[randomNumber] };
      if (randomCell.status === 'pass') {
        randomCell.status = 'enemy'
        randomArray.push(randomCell);
      }
    }

    for (var index = 0; index < randomArray.length; index++) {
      var findMatch = onlyAlive.find(element => element.x === randomArray[index].x && element.y === randomArray[index].y);
      if (onlyAlive[onlyAlive.indexOf(findMatch)]) {
        onlyAlive[onlyAlive.indexOf(findMatch)].status = 'enemy';
      }
    }

    return { grid: randomArray, enemies: randomArray };

  }

  placePlayerOnTheGrid(life) {
    var alive = life;
    var playerRandom = [];
    var i = 1;
    while (playerRandom.length < 1) {
      var randomPlacement = Math.floor(Math.random() * alive.length);
      var copyFromRandomPlacement = { ...alive[randomPlacement] };
      if (copyFromRandomPlacement.status === 'pass') {
        copyFromRandomPlacement.status = "playerBlock";
        playerRandom.push(copyFromRandomPlacement);
        console.log(playerRandom, alive)
      }
    }

    for (var c = 0; c < playerRandom.length; c++) {
      var lookForMath = alive.find(element => element.x === playerRandom[c].x && element.y === playerRandom[c].y);
      if (alive[alive.indexOf(lookForMath)]) {
        alive[alive.indexOf(lookForMath)].status = 'playerBlock';
      }

    }
    return { grid: playerRandom };
  }

  placeHealthOnTheGrid(life) {
    var alive = life;
    var playerRandom = [];
    while (playerRandom.length < 5) {
      var randomPlacement = Math.floor(Math.random() * alive.length);
      var copyFromRandomPlacement = { ...alive[randomPlacement] };
      if (copyFromRandomPlacement.status === 'pass') {
        copyFromRandomPlacement.status = "healthBlock";
        playerRandom.push(copyFromRandomPlacement);
        console.log(playerRandom, alive)
      }
    }

    for (var c = 0; c < playerRandom.length; c++) {
      var lookForMath = alive.find(element => element.x === playerRandom[c].x && element.y === playerRandom[c].y);
      if (alive[alive.indexOf(lookForMath)]) {
        alive[alive.indexOf(lookForMath)].status = 'healthBlock';
      }

    }
    return { grid: playerRandom };

  }

  placeWeaponOnTheGrid(life) {
    var alive = life;
    var playerRandom = [];
    while (playerRandom.length < 3) {
      var randomPlacement = Math.floor(Math.random() * alive.length);
      var copyFromRandomPlacement = { ...alive[randomPlacement] };
      if (copyFromRandomPlacement.status === 'pass') {
        copyFromRandomPlacement.status = " weaponBlock";
        playerRandom.push(copyFromRandomPlacement);
        console.log(playerRandom, alive)
      }
    }

    for (var c = 0; c < playerRandom.length; c++) {
      var lookForMath = alive.find(element => element.x === playerRandom[c].x && element.y === playerRandom[c].y);
      if (alive[alive.indexOf(lookForMath)]) {
        alive[alive.indexOf(lookForMath)].status = ' weaponBlock';
      }

    }
    return { grid: playerRandom };
  }

  placeAllRandomFunctions(life) {
    var healthFunction = this.placeHealthOnTheGrid(life);
    var weaponFunction = this.placeWeaponOnTheGrid(life);
    var playerFunction = this.placePlayerOnTheGrid(life);
    return playerFunction;
  }


  playerMovesInTheGrid(event) {
    var keys = this.state.player;
    if (event.key === "ArrowUp") {
      keys = { x: keys.x + 1, y: keys.y }
    } else if (event.key === "ArrowDown") {
      keys = { x: keys.x - 1, y: keys.y }
    } else if (event.key === "ArrowRight") {
      keys = { x: keys.x, y: keys.y + 1 }
    } else if (event.key === "ArrowLeft") {
      keys = { x: keys.x, y: keys.y - 1 }
    }
    this.setState({ player: keys })
  }

  render() {
    return (
      <div >
        <div className='heading'>
          <h1>Roguelike Dungeon Crawler Game</h1>
        </div>
        <div className="message">
          <span className='playerBlock'></span>
          <span className='value'>Play</span>
          <span className='healthBlock'></span>
          <span className='value'>Health</span>
          <span className='weaponBlock'></span>
          <span className='value'>Weapon</span>
          <span className='enemy'></span>
          <span className='value'>Enemies</span>
        </div>
        <div className="grid">
          {this.state.grid.map(element => {
            return <button onClick={() => this.grid(element)} className={element.status}></button>
          })}
        </div>
      </div>
    );
  }
}

export default App;
