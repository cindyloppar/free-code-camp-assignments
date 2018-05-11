import React from 'react';
import {initialEmptyGrid, aliveCells, checkNeighbors, checkForAliveNeighbors } from "./use-javascript";


export default class Layout extends React.Component {
    constructor() {
        super(),
            this.state = {
                grid: initialEmptyGrid(),

            }
    }
    componentDidMount() {
        this.setState({ grid: aliveCells(this.state.grid) });
        //   this.setState({grid:aliveCells()})
        // this.setState({grid:checkNeighbors()})
    }
    render() {
        return (
            <div className="grid">
                {this.state.grid.map(element => {
                    return <button id={element.status}>{element.status}</button>
                })}
            </div>
        );

    }
}