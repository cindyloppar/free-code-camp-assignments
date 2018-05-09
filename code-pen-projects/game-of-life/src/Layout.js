import React from 'react';
import { initialEmptyGrid, aliveCells, checkNeighbors } from "./use-javascript";


export default class Layout extends React.Component {
    constructor() {
        super(),
            this.state = {
                grid: [],

            }
    }
    componentDidMount() {
        this.setState({ grid: initialEmptyGrid() });
    }
    render() {
        return (
            <div className="grid">
                {this.state.grid.map(element => {
                    return <button >{element.status}</button>
                })}
            </div>
        );

    }
}