import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { keys: '' }
  }


  handleOnClick(event) {
    var keys = [];
    if (event.keys === "Q") {
     return keys = ""
    } else if (event.keys === "W") {
      keys = ""
    } else if (event.keys === "E") {
      keys = ""
    } else if (event.keys === "A") {
      keys = ""
    } else if (event.keys === "S") {
      keys = ""
    } else if (event.keys === "D") {
      keys = ""
    } else if (event.keys === "Z") {
      keys = ""
    } else if (event.keys === "X") {
      keys = ""
    } else if (event.keys === "C") {
      keys = ""
    }
  }
  render() {
    return (
      <div id="drum-machine">
        <h1>DRUM PAD</h1>
        <div id="display">
          <button onClick={this.handleOnClick}>Q</button>
          <button onClick={this.handleOnClick}>W</button>
          <button onClick={this.handleOnClick}>E</button>
          <button onClick={this.handleOnClick}>A</button>
          <button onClick={this.handleOnClick}>S</button>
          <button onClick={this.handleOnClick}>D</button>
          <button onClick={this.handleOnClick}>Z</button>
          <button onClick={this.handleOnClick}>X</button>
          <button onClick={this.handleOnClick}>C</button>
        </div>
      </div>
    );
  }
}

export default App;
