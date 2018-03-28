
import React from 'react';
import Axios from 'axios';

export default class Table extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            count: []

        }
    }
    componentDidMount() {
        Axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
            .then(output => {
                this.setState({ data: output.data });
                for (var i = 1; i < output.data.length; i++) {
                    this.state.count.push(i)
                    console.log("output")
                }

            })
            .catch(err => {
                console.log(err)
            })
    }

    allTimeTopCamper() {
        Axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime.")
            .then(output => {
                this.setState({ data: output.data });
                for (var i = 1; i < output.data.length; i++) {
                    this.state.count.push(i)
                }

            })
            .catch(err => {
                console.log(err)
            })
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
                            <th>All time points</th>

                        </tr>


                        
                            {this.state.data.map(value=>(
                                <tr>
                            
                            <td>{this.state.data.indexOf(value) + 1}</td>
                            

                    <td> 
                                <a href={"https://freecodecamp.com/" + value.username}>
                                    {value.username}
                                </a></td>
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






