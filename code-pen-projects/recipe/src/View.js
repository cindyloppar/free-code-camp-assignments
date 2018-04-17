
import React from 'react';
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";


export default class View extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            recipes: [{ recipe: "chicken mayo Salad", ingredients: ["Chicken breast", "Onion", 'Mayonnaise', 'Celery'] }],
            ingredients: [],
            recipeName: '',
            edit: '',
            delete: '',
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.SaveNewRecipe = this.SaveNewRecipe.bind(this);
        this.EditRecipe = this.EditRecipe.bind(this);
        this.DeleteRecipe = this.DeleteRecipe.bind(this);
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);

    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    EditRecipe() {
        
        // var recipes = recipes.find( element => {
        //     return element.recipe;
        // }) 
        // this.setState({edit:this.state.recipes});

        // localStorage.setItem("MoreValues", JSON.stringify(this.state.recipes));
        // window.location.reload(true);

    }
    DeleteRecipe() {
        var deleteData = this.setState({delete:this.state.recipes});
        localStorage.clear(deleteData);
        window.location.reload(true);
    }

    SaveNewRecipe() {
        var existingRecipes = this.state.recipes;
        var list = this.state.ingredients;
        list = list.split(',')
        var newItem = { recipe: this.state.recipeName, ingredients: list };
        existingRecipes.push(newItem);
        console.log('new Recipe list:', this.state.recipes);
        localStorage.setItem('data', JSON.stringify(this.state.recipes));
        this.setState({ recipes: existingRecipes });
    }

    componentDidMount() {
        var pastState = localStorage.getItem('data');
        if (JSON.parse(pastState) === null) {
            this.setState(this.state.recipes)
        } else {
            this.setState({ recipes: JSON.parse(pastState) });
        }

    }

    render() {
        return (
            <div className="static-modal">

                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={() => this.setState({ show: true })}

                >
                    ADD RECIPE
                </Button>
                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header>
                        <Modal.Title>
                            RECIPE:
                            <input placeholder="Recipe" name="recipeName" onChange={this.handleChange.bind(this)} />
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Ingredients</th>

                                </tr>
                                <td>
                                    <textarea placeholder="Ingredients" name="ingredients" onChange={this.handleChange.bind(this)} />
                                    {/* {this.state.ingredients} */}
                                </td>

                            </tbody>
                        </table>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button onClick={() => this.SaveNewRecipe()}>Save changes</Button>
                        <Button onClick={this.DeleteRecipe}>Delete</Button>

                    </Modal.Body>

                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>

                <div>
                    {this.state.recipes.map(element => (<button>{element.recipe}</button>))}
                </div>
                <div>
                   
                    <Button onClick={this.EditRecipe}>Edit</Button></div>
            </div>

        );
    }
}

