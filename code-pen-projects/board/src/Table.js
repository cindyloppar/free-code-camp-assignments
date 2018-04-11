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
    getData() {
        Axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/" + this.state.currentState)
            .then(response => {
                this.setState({ data: response.data });
            })
    }

    changeToRecent() {
        if (this.state.currentState === "recent") {
            this.setState({ currentState: "alltime" });
            this.getData();
        }
    }
    
    changeToAllTime() {
        if (this.state.currentState === "alltime") {
            this.setState({ currentState: "recent" });
            this.getData();
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
                            <th><button onClick={() => this.changeToRecent()}>Points in past 30 days</button></th>
                            <th><button onClick={() => this.changeToAllTime()}>All time points</button></th>
                            
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






