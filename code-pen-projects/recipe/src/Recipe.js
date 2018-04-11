
import React from 'react';
import { Button } from 'react-bootstrap';
import View from './View';
// const Well = ReactBootstrap.Well;

export default class Recipes extends React.Component {
    constructor() {
    super();
    this.state = {
    
    }
}

    render() {
    return (
        <div>
         <button bsSize="small">Look I'm in a small well!</button>
        <button bsSize="large">Look I'm in a large well!</button> 
      </div>
    );
    }
   }