import React from 'react';
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import Recipe from './Recipe';

export default class View extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div className="static-modal">

                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={() => this.setState({ show: true })}
                    
                >
                    Add Recipe
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >

                    <Modal.Header>
                        <Modal.Title>
                            <input placeholder="dish name" />
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <textarea placeholder="ingredients" />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button bsStyle="primary" onClick={this.handleClose}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

