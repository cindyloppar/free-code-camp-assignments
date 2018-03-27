
import React from 'react';
import ReactDOM from 'react-dom';




export default class Layout extends React.Component {

    constructor (){
        super();
        this.state={
            data:[]


        }
    }

    render() {
        return (
            <div className="Table">
                <p> Camp Leader Board</p>
                <table>
            
                    <tr>
                        <th>#</th>
                        <th>Camper Name</th>
                        <th>Points in past 30 days</th>
                        <th>All time points</th>
                    </tr>
                    <tr>
                    
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                    <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                    <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                    <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>

            </div>

        );
    }

}






