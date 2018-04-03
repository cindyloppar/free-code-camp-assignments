
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
                <footer>Pen By Mrs Nevhufumba</footer>
            </div>

        );
    }
}
