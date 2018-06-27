import React, {Component} from 'react'

class stageTwo extends Component (){
constructor (){
    super(),
    this.state = {

    }
}
creatingGridWithDeadCells(){
    var grid = [];
    for(var x = 0; x< 10; x++){
        for(var y = 0; y < 10; y++){
            
        } 
    }
}
render(){
    return (
        <div className = 'grid'>
       { this.state.grid.map(element => {
            return <button onClick={() => this.grid(element)} className={element.status}></button>
            })}
        </div>
    )
}
}

export default stageTwo;