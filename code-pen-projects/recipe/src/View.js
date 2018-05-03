
import React from 'react';
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import SaveEdits from "./SaveEdits"

export default class View extends React.Component {
    constructor() {
        super();
        this.state = {
            boolean: false,
            editShowOrHide: false,
            show: false,
            recipes: [],
            ingredients: [],
            recipeName: '',
            edit: false,
            delete: '',
            currentRecipe: {}

        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.SaveNewRecipe = this.SaveNewRecipe.bind(this);
        this.showEditRecipe = this.showEditRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
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
        var results = JSON.parse(localStorage.getItem("data"));
       var foundRecipe = this.state.recipes.find(element => { return element.recipe === e });
       var values = results.find((element => element.recipe === e));
       this.setState({ boolean: true, show:false, currentRecipe: foundRecipe, recipe: values.recipe, ingredients: values.ingredients });
       console.log('foundRecipe',this.state.currentRecipe);
    }

    showEditRecipe(ing) {
        var foundObject = this.state.recipes.find(element => { return element.ingredients[0] === ing[0] });
        this.setState({ editShowOrHide: true, show:false, recipe: foundObject.recipe, ingredients: foundObject.ingredients })

    }

    SaveEdit(recipe, ingredients) {
        var existingRecipes = this.state.recipes;
        console.log('existingRecipes', existingRecipes.find(e => e.recipe === this.state.currentRecipe.recipe))
        var index = existingRecipes.indexOf(existingRecipes.find(e => e.recipe === this.state.currentRecipe.recipe));
        console.log('currentRecipe', this.state.currentRecipe)
        console.log('index', index)
        var newItem = { recipe: recipe, ingredients: ingredients.split(",") };
        console.log('newItem', newItem);
        existingRecipes[index] = newItem;
        console.log('newExistingRecipes', existingRecipes);
        this.setState({ recipes: existingRecipes, editShowOrHide: false});
        console.log('recipes', this.state.recipes)
        localStorage.setItem('data', JSON.stringify(this.state.recipes));
        window.location.reload(true);
    }

    deleteRecipe(collection, rec, ing) {
        var newData = this.state.recipes;
        var currentRecipe = { recipe: rec, ingredients: ing };
        var position = newData.indexOf(collection);
       newData.splice(position,1)
        console.log("col", newData);
        // for (var i in collection) {
        //     if (collection[i].recipe !== currentRecipe.recipe && collection[i].ingredients !== currentRecipe.ingredients) {
        //         newData.push(collection[i]);
        //     }
        // }
        this.setState({ currentRecipe: {},recipes:newData,boolean:false })
        localStorage.setItem('data', JSON.stringify(this.state.recipes));
        console.log("newData", newData);
       
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
                    id="addButton"
                    onClick={() => this.setState({ show: true ,editShowOrHide:false, currentRecipe:{}, boolean:false})}

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

                <div>
                    {this.state.recipes.map(element =>
                        (<button id="displayButton" onClick={e => this.getData(element.recipe)}>{element.recipe}</button>))}

                </div>

                <div>

                    {this.state.currentRecipe.ingredients !== undefined ? this.state.currentRecipe.ingredients.map(e => <ol>{e}</ol>) : null}

                    {this.state.boolean === true ? <SaveEdits SaveEdit={this.SaveEdit.bind(this)} showEditRecipe={this.showEditRecipe.bind(this)} editShowOrHide={this.state.editShowOrHide} deleteRecipe={() => this.deleteRecipe(this.state.currentRecipe)} currentRecipe={this.state.currentRecipe} recipes={this.state.recipes} /> : null}
                </div>
            </div>

        );
    }
}
