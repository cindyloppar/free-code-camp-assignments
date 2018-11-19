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
                <h1 className="header"> Markdown Previewer</h1>
                <textarea onChange={this.handleChange} />
                <div className="container">
                    <ReactMarkdown source={this.state.source} />
                </div >
                <div className="footer">
                    <footer>By Mrs Lauper</footer>
                </div>
            </div>

        );
    }
}
