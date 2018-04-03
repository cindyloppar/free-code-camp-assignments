import React from 'react';
import Axios from 'axios';

export default class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            currentState: "recent",
            count: [],
            data: [],
           

        }
    }
    componentDidMount() {
        Axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/" + this.state.currentState)
            .then(response => {
                this.setState({ data: response.data });
                console.log(this.state.currentState+":", this.state.currentState);
                console.log("data:", this.state.data);
               
            })
            
    }

changeTables(){
    if(this.state.currentState === "recent"){
        this.setState({currentState: "alltime"});
        this.componentDidMount();
    }
    else if(this.state.currentState === "alltime"){
        this.setState({currentState: "recent"});
        this.componentDidMount();
    }
}

    render() {
        return (
            <div className="Table">
                <p> Camp Leader Board</p>
                <table>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Camper Name</th>
                            <th>Points in past 30 days</th>
                            <div>
                                <th><button onClick={this.changeTables.bind(this)}>All time points</button></th>
                            </div>
                        </tr>

                        {this.state.data.map(value => (
                            
                            <tr>
                                <td>{this.state.data.indexOf(value) + 1}</td>
                                <td><img alt='images' src={value.img} />
                                    <a href={"https://freecodecamp.com/" + value.username}>
                                        {value.username}</a>
                                </td>
                                <td>
                                    {value.recent}
                                </td>
                                <td>{value.alltime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}






