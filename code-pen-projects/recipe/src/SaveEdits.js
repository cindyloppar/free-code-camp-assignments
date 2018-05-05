import React from 'react';
import View from './View';
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";

export default class SaveEdits extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRecipe: props.currentRecipe,
            recipe: props.recipes,
            ingredients:props.ingredients,
        }
    }

    save(){
        this.props.SaveEdit(this.state.recipe,this.state.ingredients);
    }
    delete() {
        this.props.deleteRecipe(this.state.currentRecipe);
    }
    showEditForm(){
        this.props.showEditRecipe(this.state.currentRecipe);
    }

    // close(){
    //     this.props.handleClose(this.state.show)
    // }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    render() {
        console.log(this.props.recipes)
        return (
            <div>
                <Modal
                    show={this.props.editShowOrHide}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >

                    <Modal.Header>
                        <Modal.Title>
                            RECIPE:
                            <input value={this.props.recipes} name='recipe' onChange={this.handleChange.bind(this)} />
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Ingredients</th>

                                </tr>
                                <td>
                                    <textarea placeholder='ingredients' value={this.props.ingredients} name='ingredients' onChange={this.handleChange.bind(this)} />

                                </td>

                            </tbody>
                        </table>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.save()}>Save </Button>

                    </Modal.Footer>
                </Modal>


                <button onClick={this.delete.bind(this)}>Delete</button>
                <button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.showEditForm.bind(this)}>Edit</button>
                    {/* <button onClick={this.close.bind(this)}>Close</button> */}
            </div>
        )
    }
}




