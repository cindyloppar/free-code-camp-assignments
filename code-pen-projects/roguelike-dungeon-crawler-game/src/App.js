import React, { Component } from 'react';
import * as stage from './stages';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      grid: [],
      status: '',
      player: { x: 2, y: 2, player: "playerBlock", status: "playerBlock", XP: 0, health: 50, enemy: 20, weapon: 5 },
      oldLocation: { x: 2, y: 2, player: "playerBlock", status: "playerBlock" },
      path: [],
      health: [],
      weapon: [],
      level: 1,
      enemies: [],
      enemyLife: 20,
      stages: [stage.stage1, stage.stage2, stage.stage3],
      currentStage: 0
    }
    this.grid = this.grid.bind(this);
    this.pathWays = this.pathWays.bind(this);
    this.creatingRandomEnemies = this.creatingRandomEnemies.bind(this);
    this.playerMovesInTheGrid = this.playerMovesInTheGrid.bind(this);
  }

  componentDidMount() {
    document.onkeydown = this.playerMovesInTheGrid;
    var allDeadCells = this.grid();
    var aliveAndDead = this.pathWays(allDeadCells, this.state.stages[this.state.currentStage]);
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
          status: "pass",
        })
      }
    }
    return deadCells;
  }

  pathWays(deadGrid, paths) {
    var cells = deadGrid;

    for (var i = 0; i < paths.length; i++) {
      var cellFound = cells.find(element => element.x === paths[i].x && element.y === paths[i].y);
      if (cells[cells.indexOf(cellFound)]) {
        cells[cells.indexOf(cellFound)].status = "walls";
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

  placeHealthOnTheGrid(life) {
    var play = this.state.player
    var alive = life;
    var playerRandom = [];
    while (playerRandom.length < 5) {
      var randomPlacement = Math.floor(Math.random() * alive.length);
      var copyFromRandomPlacement = { ...alive[randomPlacement] };
      if (copyFromRandomPlacement.status === 'pass') {
        copyFromRandomPlacement.status = "healthBlock";
        playerRandom.push(copyFromRandomPlacement);
      }

    }
    for (var c = 0; c < playerRandom.length; c++) {
      var lookForMatch = alive.find(element => element.x === playerRandom[c].x && element.y === playerRandom[c].y);
      if (alive[alive.indexOf(lookForMatch)]) {
        alive[alive.indexOf(lookForMatch)].status = 'healthBlock';
      }

    }
    return { grid: playerRandom, player: playerRandom };
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
    return weaponFunction;
  }

  playerMovesInTheGrid(event) {
    var keys = this.state.player;
    var oldLoc = this.state.player;
    var grid = this.state.grid;
    if (event.key === "ArrowDown") {
      keys = { x: keys.x + 1, y: keys.y }
    } else if (event.key === "ArrowUp") {
      keys = { x: keys.x - 1, y: keys.y }
    } else if (event.key === "ArrowRight") {
      keys = { x: keys.x, y: keys.y + 1 }
    } else if (event.key === "ArrowLeft") {
      keys = { x: keys.x, y: keys.y - 1 }
    }
    var objectFound = grid.find(cell => cell.x === keys.x && cell.y === keys.y);
    if (objectFound === undefined) {
      keys = oldLoc;
    }
    else if (objectFound.status === "walls") {
      keys = oldLoc
    }
    var index = grid.findIndex(cell => cell.x === keys.x && cell.y === keys.y);
    var player = this.playerLifeIncreaseOrDecrease(grid[index]);
    player = { ...player, x: grid[index].x, y: grid[index].y }
    this.setState({ player: player, oldLocation: oldLoc })
  }

  playerLifeIncreaseOrDecrease(item) {
    var playerInfo = this.state.player;
    console.log('play', playerInfo);
    
    if (item.status === "healthBlock") {
      playerInfo = { ...playerInfo, health: playerInfo.health + 1 }
    } else if (item.status === "enemy") {
      playerInfo = { ...playerInfo, health: playerInfo.health - 1 }
    }
    // else if (item.status === "weaponBlock"){
    //   playerInfo = { ...playerInfo, weapon: playerInfo.weapon + 1 }      
    // }
    else if (item.status === "healthBlock") {
      if (this.state.currentStage <= 2) {
        var allDeadCells = this.grid();
        var aliveAndDead = this.pathWays(allDeadCells, this.state.stages[this.state.currentStage]);
        var newGrid = this.creatingRandomEnemies(aliveAndDead.grid);
        this.placeAllRandomFunctions(aliveAndDead.grid)
        this.setState({ grid: aliveAndDead.grid, stage: stage.stage2, currentStage: this.state.currentStage + 1 });
      }
    }
    return playerInfo
  }

  experienceForPlayer(event) {
    var oldLocation = this.state.oldLocation
    console.log('xp', oldLocation);
  }

  render() {
    return (
      <div >
        <div className='heading'>
          <h1>Roguelike Dungeon Crawler Game</h1>
        </div>
        <div className="">
          <span className='level'>Dungeon: 1</span>
          <span className='health'>Health:{this.state.player.health}</span>
          <span className='playerLife'>XP:</span>
          <span className='playerLife'>Weapon:{this.state.player.weapon}</span>          
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
            if (element.x === this.state.oldLocation.x && element.y === this.state.oldLocation.y) {
              element.status = "pass"
            }

            if (element.x === this.state.player.x && element.y === this.state.player.y) {
              element.status = "playerBlock"
            }
            return <button onClick={() => this.grid(element)} className={element.status}></button>
          })}
        </div>
      </div>
    );
  }
}

export default App;
