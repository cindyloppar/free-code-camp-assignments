
import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            source: ""
        }
    }

    // changeDescription(newValue) {
    //     this.setState({ input: newValue });
    // }
    handleChange(e) {
        this.setState({ source: e.target.value });
        
    }

    render() {
       
        
        return (
            <div>
                <h1> Markdown Previewer</h1>
                <textarea onChange={this.handleChange.bind(this)} />
                <p>{this.state.input} </p>
                <ReactMarkdown source={this.state.source} /> 
            </div>

        );
    }
}
