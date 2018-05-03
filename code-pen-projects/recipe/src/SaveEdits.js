import React from 'react';
import View from './View';
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";

export default class SaveEdits extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentRecipe: props.currentRecipe,
            recipe:props.currentRecipe.recipe,
            ingredients:props.currentRecipe.ingredients,
            show:false,
        }
    }

    save(){
        this.props.SaveEdit(this.state.recipe,this.state.ingredients)
    }
    delete() {
        this.props.deleteRecipe(this.state.currentRecipe);
    }
    showEditForm(){
        this.props.showEditRecipe(this.state.currentRecipe.ingredients)
    }

    close(){
        this.props.handleClose(this.state.show)
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    render() {
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
                            <input value={this.state.recipe} name='recipe' onChange={this.handleChange.bind(this)} />
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
                        <Button onClick={() => this.save()}>Save </Button>
                        <Button onClick={this.delete.bind(this)}>Delete</Button>

                    </Modal.Footer>
                </Modal>


                <button onClick={this.delete.bind(this)}>Delete</button>
                <button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.showEditForm.bind(this)}>Edit</button>
                    <button onClick={this.close.bind(this)}>Close</button>
            </div>
        )
    }
}




