
import React from 'react';
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import Well from "react-bootstrap/lib/Well";
import Collapse from "react-bootstrap/lib/Collapse";

export default class View extends React.Component {
    constructor() {
        super();
        this.state = {
            editShowOrHide: false,
            show: false,
            recipes: [{ recipe: "Chicken Mayo Salad", ingredients: ["Chicken breast", "Onion", "Mayonnaise", "Celery"] }],
            ingredients: [],
            recipeName: '',
            edit: false,
            delete: '',
            data: '',
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

    getData(e) {

        var results = JSON.parse(localStorage.getItem("data"))
        var values = results.find((element => element.recipe === e));
        console.log("results", results)
        this.setState({ data: values.ingredients });
    }

    EditRecipe(ing) {
        // var event = this.state.recipes;
        var foundObject = this.state.recipes.find(element => { return element.ingredients[0] === ing[0] });
        this.setState({ ingredients: foundObject.ingredients, recipeName: foundObject.recipe })
        this.setState({ editShowOrHide: true });

        this.setState({ edit: true });
        // this.getData();
    }

    DeleteRecipe(title) {

        // var deleteData = this.setState({ delete: this.state.recipes });
        // localStorage.clear(deleteData);
        this.state.recipes.forEach(element => {
            if (element.recipe === title) {
                var position = this.state.recipes.indexOf(element);
                this.state.recipes.splice(position, position + 1)
                this.setState({ recipes: this.state.recipes })
                localStorage.setItem("data", JSON.stringify(this.state.recipes));

            }
            console.log(position);
        })

    }

    SaveNewRecipe() {
        var existingRecipes = this.state.recipes;
        var list = this.state.ingredients;
        list = list.split(',');
        var newItem = { recipe: this.state.recipe, ingredients: list };
        existingRecipes.push(newItem);
        console.log('new Recipe list:', this.state.recipes);
        localStorage.setItem('data', JSON.stringify(this.state.recipes));
        this.setState({ recipes: existingRecipes });
        this.setState({ show: false });
        edit: false;


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
        console.log("data", this.state.data)
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
                            <input placeholder="Recipe" name='recipe' onChange={this.handleChange.bind(this)} />
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Ingredients</th>

                                </tr>
                                <td>
                                    <textarea placeholder="Ingredients" name='ingredients' onChange={this.handleChange.bind(this)} />

                                </td>

                            </tbody>
                        </table>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.SaveNewRecipe()}>Save </Button>
                        <Button onClick={this.handleClose}>Close</Button>

                    </Modal.Footer>
                </Modal>


                <Modal
                    show={this.state.editShowOrHide}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >

                    <Modal.Header>
                        <Modal.Title>
                            RECIPE:
                            <input placeholder={this.state.recipeName} name='recipe' onChange={this.handleChange.bind(this)} />
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Ingredients</th>

                                </tr>
                                <td>
                                    <textarea placeholder='ingredients' value={this.state.ingredients} name='ingredients' onChange={this.handleChange.bind(this)} />

                                </td>

                            </tbody>
                        </table>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.SaveNewRecipe()}>Save </Button>
                        <Button onClick={this.handleClose}>Close</Button>

                    </Modal.Footer>
                </Modal>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={() => this.EditRecipe(this.state.data)}

                >
                    Edit
                </Button>

                <div>
                    {this.state.recipes.map(element => {
                        return <div className="container-fluid" key={this.state.recipes.indexOf(element)}>
                            <recipes key={this.state.recipes.indexOf(element)} name={element.recipe} ingredients={element.ingredients} deleteButton={this.DeleteRecipe.bind(this)} editButton={this.EditRecipe.bind(this)} />
                        </div>
                    })}
                </div>

                <div>
                    {this.state.recipes.map(element => (<button onClick={e => this.getData(element.recipe)}>{element.recipe}</button>))}

                </div>


                <div>

                    <ul>
                        {this.state.data === "" ? this.state.data : this.state.data.map(element => { return <ul>{element}</ul> })}
                        <Button onClick={this.DeleteRecipe}>Delete</Button>
                        {/* <Button onClick={this.getData.bind(this)}>Edit</Button> */}

                    </ul>

                </div>

            </div>

        );
    }
}


