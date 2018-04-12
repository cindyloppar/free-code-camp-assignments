import React from 'react';
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
// import Recipe from './Recipe';

export default class View extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            recipe: [{ recipeName: "cake", ingredients: ["milk", "baking powder", 'cocoa', 'Rama'] }],
            ingredients: '',
            recipeName: '',
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
    }

    handleChange(e) {
        this.setState({ recipeName: e.target.value });
        console.log(this.state.recipeName);
    }

    handleChangeIngredients(e) {

        this.setState({ ingredients: e.target.value.split(',') });
        console.log("ingredients", this.state.ingredients)
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSaveChanges() {
        var newItem = { recipeName: this.state.recipeName, ingredients: this.state.ingredients };
        this.setState({ recipe: this.state.recipe.push(newItem) });
        console.log(this.state)
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
                            <input placeholder="dish name" onChange={this.handleChange.bind(this)} />
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <textarea placeholder="ingredients" onChange={this.handleChangeIngredients.bind(this)} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Edit</Button>
                        <Button bsStyle="primary" onClick={this.handleSaveChanges.bind(this)}>Save changes</Button>
                    </Modal.Footer>
                </Modal>
                <div>
                    {
                        this.state.recipe.map(element => {
                            return <div> <button>{element.recipeName}</button>
                              <ul>{element.ingredients.map(singleItem => { return <ul>{singleItem}</ul> })}</ul>
                            </div>
                        })
                    }
                </div>
            </div>

        );
    }
}

