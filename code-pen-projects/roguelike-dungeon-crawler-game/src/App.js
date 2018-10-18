import React, { Component } from 'react';
import * as stage from './stages';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isHidden: false,
      grid: [],
      status: '',
      player: { x: 2, y: 2, player: "playerBlock", status: "playerBlock", XP: 0, health: 50, enemy: 10, weapon: 5, boss: 50 },
      oldLocation: { x: 2, y: 2, player: "playerBlock", status: "playerBlock" },
      path: [],
      health: 'jam',
      weapon: 'strike',
      enemy: 'octopus',
      boss: 'jason',
      door:'stage',
      dungeon: 1,
      enemyLife: 20,
      bossLife:40,
      hiddenGrid: [],
      stages: [stage.stage1, stage.stage2, stage.stage3],
      currentStage: 0,
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
    for (var x = 0; x < 12; x++) {
      for (var y = 0; y < 12; y++) {
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
    var i = 6;
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
    var alive = life;
    var playerRandom = [];
    while (playerRandom.length < 4) {
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
        copyFromRandomPlacement.status = "weaponBlock";
        playerRandom.push(copyFromRandomPlacement);
        console.log(playerRandom, alive)
      }
    }

    for (var c = 0; c < playerRandom.length; c++) {
      var lookForMath = alive.find(element => element.x === playerRandom[c].x && element.y === playerRandom[c].y);
      if (alive[alive.indexOf(lookForMath)]) {
        alive[alive.indexOf(lookForMath)].status = 'weaponBlock';
      }

    }
    return { grid: playerRandom };
  }

  placeDoorOnTheGrid(life) {
    var alive = life;
    var playerRandom = [];
    while (playerRandom.length < 1) {
      var randomPlacement = Math.floor(Math.random() * alive.length);
      var copyFromRandomPlacement = { ...alive[randomPlacement] };
      if (copyFromRandomPlacement.status === 'pass') {
        copyFromRandomPlacement.status = "stage";
        playerRandom.push(copyFromRandomPlacement);
        console.log(playerRandom, alive)
      }
    }

    for (var c = 0; c < playerRandom.length; c++) {
      var lookForMath = alive.find(element => element.x === playerRandom[c].x && element.y === playerRandom[c].y);
      if (alive[alive.indexOf(lookForMath)]) {
        alive[alive.indexOf(lookForMath)].status = 'stage';
      }

    }
    return { grid: playerRandom };
  }
    
  placeAllRandomFunctions(life) {
    var healthFunction = this.placeHealthOnTheGrid(life);
    var xpLimit = 6;
    if (this.state.player.XP === xpLimit++) {
      this.placeDoorOnTheGrid(life);
    } var weaponFunction = this.placeWeaponOnTheGrid(life);
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
    } else if (objectFound.status === 'walls') {
      keys = oldLoc
    }
    console.log('object :', objectFound);
    var index = grid.findIndex(cell => cell.x === keys.x && cell.y === keys.y);
    var player = this.playerLifeIncreaseOrDecrease(grid[index]);

    player = player.shouldMove ? { ...player, x: grid[index].x, y: grid[index].y } : player;
    var getAllNeighbors = this.checkNeighbors(player);
    this.setState({ player: player, oldLocation: oldLoc, hiddenGrid: getAllNeighbors })
  }

  restartGame() {
    var allDeadCells = this.grid();
    var aliveAndDead = this.pathWays(allDeadCells, this.state.stages[0]);
    var newGrid = this.creatingRandomEnemies(aliveAndDead.grid);
    this.placeAllRandomFunctions(aliveAndDead.grid)
    this.placeDoorOnTheGrid(aliveAndDead.grid)
    this.setState({ gameOver: false, currentStage: this.state.stages[0], grid: aliveAndDead.grid, player: { x: 2, y: 2, player: "playerBlock", status: "playerBlock", XP: 0, health: 50, enemy: 20, weapon: 5 } });

  }

  playerLifeIncreaseOrDecrease(item) {
    var playerInfo = { ...this.state.player, shouldMove: true };
    var current = this.state.currentStage;
    var xpLimit = 6;
    if (item.status === 'healthBlock') {
      playerInfo = { ...playerInfo, health: playerInfo.health + 5 }
    }
    if (item.status === 'enemy') {
      playerInfo = { ...playerInfo, XP: playerInfo.XP + 2 };
      if (playerInfo.XP >= xpLimit++) {
        this.placeDoorOnTheGrid(this.state.grid);
      }
    }
    if (item.status === 'weaponBlock') {
      playerInfo = { ...playerInfo, weapon: playerInfo.weapon + 3 }
    }

    if (playerInfo.health <= 0) {
      this.setState({ gameOver: true })
    }
    if (item.status === "stage") {
      if (this.state.currentStage <= 1) {
        console.log("not yet the last stage");
        var allDeadCells = this.grid();
        var aliveAndDead = this.pathWays(allDeadCells, this.state.stages[this.state.currentStage]);
        var newGrid = this.creatingRandomEnemies(aliveAndDead.grid);
        this.placeAllRandomFunctions(aliveAndDead.grid);
        this.placingDifferentIcons();
        this.setState({ grid: aliveAndDead.grid, boss: 'jason', stage: stage.stage2, currentStage: this.state.currentStage + 1 });
      } else {
        var allDeadCells = this.grid();
        var aliveAndDead = this.pathWays(allDeadCells, this.state.stages[this.state.currentStage]);
        var newGrid = this.creatingRandomEnemies(aliveAndDead.grid);
        this.placeAllRandomFunctions(aliveAndDead.grid);
        this.placingDifferentIcons();
        aliveAndDead.grid = this.placeBossOnTheGrid(this.state.stages[this.state.currentStage], aliveAndDead.grid);
        this.setState({ grid: aliveAndDead.grid, boss: 'jason', stage: stage.stage2, currentStage: this.state.currentStage + 1 });
      }
    }
    if (item.status === 'enemy') {
      playerInfo = { ...playerInfo, health: playerInfo.health - 10 };
      this.setState({ enemyLife: this.state.enemyLife - 10 })
      if (this.state.enemyLife === 0) {
        shouldMove: true;
        this.setState({ enemyLife: 20 })
      } else {
        playerInfo = { ...playerInfo, x: this.state.oldLocation.x, y: this.state.oldLocation.y, shouldMove: false }
      }
    }
    if (item.status === 'jason') {
      this.setState({bossLife:this.state.bossLife - 15})
      playerInfo = { ...playerInfo, health: playerInfo.health - 25};
      if (this.state.bossLife === 0) {
        alert('YOU WON!!');
        window.location.reload();
      } else {
        playerInfo = { ...playerInfo, x: this.state.oldLocation.x, y: this.state.oldLocation.y, shouldMove: false }
      }
    }
    return playerInfo
  }

  placeBossOnTheGrid(stage, grid) {
    var validGrid = grid;
    var nextStage = stage
    var bossInfo = this.state.boss;
    if (nextStage && nextStage === this.state.stages[2]) {
      var boss = undefined;
      while (!boss) {
        var randomPlace = { x: Math.floor(Math.random() * 12), y: Math.floor(Math.random() * 12) };
        var randomPlace = grid.find(item => {
          return item.x === randomPlace.x && item.y === randomPlace.y && item.status === "pass"
        });
        boss = randomPlace ? randomPlace : undefined;
      }
      var doorFound = validGrid.find(item => item.status === "stage");
      validGrid[validGrid.indexOf(doorFound)].status = "pass";
      validGrid[validGrid.indexOf(boss)].status = "jason";
    }
    return validGrid;
  }

  placingDifferentIcons(item) {
    var nextStage = this.state.stages[this.state.currentStage + 1];
    var playerInfo = this.state.player;
    if (nextStage && nextStage.stage === this.state.stage2) {
      playerInfo = { ...playerInfo, health: 'health.png', enemy: 'crab.png', weapon: 'gun.png', boss: 'jason' };
      this.setState({ health: 'syringe', enemy: 'bat', weapon: 'fist', boss: 'jason', stage: stage.stage3 });
    }

    return playerInfo;
  }


  checkNeighbors(object) {
    var valid = [object]
    var grid = this.state.grid;
    var allNeighbors = [
      { x: object.x, y: object.y + 1 },
      { x: object.x + 1, y: object.y + 1 },
      { x: object.x + 1, y: object.y },
      { x: object.x + 1, y: object.y - 1 },
      { x: object.x, y: object.y - 1 },
      { x: object.x - 1, y: object.y - 1 },
      { x: object.x - 1, y: object.y },
      { x: object.x - 1, y: object.y + 1 }
    ]
    allNeighbors.forEach(item => {
      var checkProperties = grid.find(cell => { return cell.x === item.x && cell.y === item.y });
      if (checkProperties) {
        valid.push(checkProperties);
      } else {
        checkProperties = { ...item, status: 'walls' }
        valid.push(checkProperties);
      }
    });
    valid.sort((a, b) => {
      if (a.x === b.x) return a.y - b.y;
      return a.x - b.x;
    });
    return valid;
  }

  toggleHidden() {
    var setGrid = this.state.isHidden;
    if (setGrid === false) {
      this.setState({ isHidden: true })
    } else {
      this.setState({ isHidden: false })

    }
  }

  render() {

    return (
      <div >

        {this.state.gameOver && (
          <div>
            <h1 id='gameOver'>Sorry Game Over!</h1>
            <button id='restart' onClick={() => this.restartGame()}>Restart</button>
          </div>
        )}

        {!this.state.gameOver && (
          <div>
            <header>
              <div className='heading'>
                <h1>Roguelike Dungeon Crawler Game</h1>
              </div>
              <div className='elementsInsideGrid'>
                <span className='level'>Dungeon: </span>
                <span className='health'>Health: {this.state.player.health}</span>
                <span className='enemyLife'>Enemy: {this.state.enemyLife}</span>
                <span className='playerLife'>XP: {this.state.player.XP}</span>
                <span className='playerLife'>Weapon: {this.state.player.weapon}</span>
              </div>
            </header>
            <div className="message">
              <span className='value'>Player: </span>
              <span id='playerBlock'></span>
              <span className='value'>Health: </span>
              <span className='healthBlock' id={this.state.health}></span>
              <span className='value'>Weapon: </span>
              <span className='weaponBlock' id={this.state.weapon}></span>
              <span className='value'>Enemies: </span>
              <span className='enemy' id={this.state.enemy}></span>
              <span className='value'>Boss: </span>
              <span className='boss' id={this.state.boss}></span>
              <span className='value'>Next-Stage: </span>
              <span className='stage'></span>
            </div>

            <div>
              <button id='showHide' onClick={this.toggleHidden.bind(this)} >
                Show/Hide Grid
        </button>

            </div>
            {!this.state.isHidden && (

              <div className="grid" >
                {this.state.grid.map(element => {
                  if (element.x === this.state.oldLocation.x && element.y === this.state.oldLocation.y) {
                    element.status = "pass"
                  }
                  if (element.x === this.state.player.x && element.y === this.state.player.y) {
                    element.status = "playerBlock";
                  }
                  if (element.status === 'healthBlock') {
                    element.icon = this.state.health;
                  } else if (element.status === 'weaponBlock') {
                    element.icon = this.state.weapon;
                  } else if (element.status === 'enemy') {
                    element.icon = this.state.enemy;
                  } else if (element.status === 'boss') {
                    element.icon = this.state.boss;
                  } else {
                    element.icon = element.status;
                  }

                  return <span id={element.icon} onClick={() => this.grid(element)} className={element.status}></span>
                })}
              </div>
            )}

            {this.state.isHidden && (
              <div className="smallGrid">
                {
                  this.state.hiddenGrid.map(element => {
                    if (element.x === this.state.oldLocation.x && element.y === this.state.oldLocation.y) {
                      element.status = "pass"
                      console.log('status', element);

                    }
                    if (element.x === this.state.player.x && element.y === this.state.player.y) {
                      element.status = "playerBlock";
                    }
                    if (element.status === 'healthBlock') {
                      element.icon = this.state.health;
                    } else if (element.status === 'weaponBlock') {
                      element.icon = this.state.weapon;
                    } else if (element.status === 'enemy') {
                      element.icon = this.state.enemy;
                    } else if (element.status === 'boss') {
                      element.icon = this.state.boss;
                    } else {
                      element.icon = element.status;
                    }

                    return <span id={element.icon} onClick={() => this.grid(element)} className={element.status}></span>
                  })
                }
              </div>
            )}

          </div>
        )}
      </div>
    );
  }
}

export default App;
