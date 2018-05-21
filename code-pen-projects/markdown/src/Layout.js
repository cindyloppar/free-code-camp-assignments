import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            source: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ source: e.target.value });
        
    }

    render() {
       
        return (
            <div>
                <h1> Markdown Previewer</h1>
                <textarea onChange={this.handleChange} />
                <p>{this.state.input} </p>
                <ReactMarkdown source={this.state.source} /> 
                { <footer>Pen By M.. Loppar</footer> }
            </div>

        );
    }
}
