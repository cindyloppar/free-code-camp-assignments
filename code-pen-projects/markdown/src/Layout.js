
import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';



export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            input: ""
        }
    }

    changeDescription(newValue) {
        this.setState({ input: newValue });
    }
    handleChange(e) {
        const description = e.target.value;
        this.changeDescription(description);
    }

    render() {
        <ReactMarkdown source={this.state.input} /> ,
            document.getElementById('container')
        return (
            <div>
                <h1> Markdown Previewer</h1>
                <input onChange={this.handleChange.bind(this)} />
                <p>{this.state.input} </p>
            </div>

        );
    }
}
