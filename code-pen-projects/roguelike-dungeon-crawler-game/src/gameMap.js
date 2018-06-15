
import React, { Component } from 'react';
// import keydown from 'react-keydown';
import App from './App.js'
import './App.css';


function initialState() {
    return (
        {
            boardState: boardArray01,
            mobs1: genMobs1(),
            mobs2: genMobs2(),
            mobs3: genMobs3(),
            mobs4: genMobs4(),
            count: 5,
            heroPos: 28,
            floor: floor01,
            dungeon: 1,
            dungeonTitle: 'The Skeleton Army',
            gold: 0,
            health: -1000,
            weapon: 1,
            weaponType: 'fists(+3)',
            boss: 1,
            honorPoints: 0,
            fog: 1,
        })
}

class gameMap extends React.Component {
    // @keydown('up','down','left','right')
    //     submit(event) {
    //       this.heroMove(event)
    //     }


    constructor(props) {
        super(props);
        this.state = initialState()
    }


    handleStart = () => {
        this.setState({ ...initialState() })
        this.setState({ health: 20 })
    }

    handleMainMenu = () => {
        this.setState({ ...initialState() })
        this.setState({ health: -1000 })
    }

    handleFog = () => {
        if (this.state.fog === 1) { this.setState({ fog: 0 }) }
        else { this.setState({ fog: 1 }) }
    }
}