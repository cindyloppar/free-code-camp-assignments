
import React from 'react';
import ReactDom from 'react-dom';
// import ReactMarkdown from 'react-markdown';


// const input = '# This is a header\n\nAnd this is a paragraph'

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
        <ReactMarkdown source={input} /> ,
            document.getElementById('container')
        return (
            <div>
                <h1> Markdown Previewer</h1>
                <input onChange={this.handleChange.bind(this)} />
                <p>{this.state.name} </p>
            </div>

        );
    }
}

