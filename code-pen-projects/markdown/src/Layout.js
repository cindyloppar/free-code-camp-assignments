
import React from 'react';
 

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            name: ""
        }
    }

    changeDescription(newValue) {
        this.setState({ name: newValue });
    }
    handleChange(e) {
        const description = e.target.value;
        this.changeDescription(description);
    }

    render() {
        console.log("this.state", this.state)
        return (
            <div>
                <h1> Markdown Previewer</h1>
                <input onChange={this.handleChange.bind(this)} />
                <p>{this.state.name} </p>
            </div>

        );
    }
}

