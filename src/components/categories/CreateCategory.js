import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import axiosInstance from '../Apicalls';

/**
 * Component for allowing users to add categories.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
class CreateCategory extends Component {
    state = {
        title: ''
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    /**
     * handles addition of categories
     * @param {object} event - Reference to the submit form component
     * used to prevent default form behaviours on submission
     */
    handleAddCategories = (event, id) => {
        const { title: name } = this.state;
        event.preventDefault();
        axiosInstance.post('categories/', { name })
            .then(response => {
                document.getElementById('closeAddModal').click();
                this
                    .props
                    .getCategories()
                this.setState({ title: '' })

<<<<<<< HEAD
            }).catch(error => {
                if (error.response) {
                    notify.show(error.response.data.message, 'error', 4000)
                } else if (error.request) {
                    notify.show("Request not made")
                }
            });
=======
        }).catch(error => {
            if (error.response) {
                notify.show(error.response.data.message, 'error', 4000)
            } else if (error.request) {
                notify.show("Request not made", 'error', 3000)
            }
        });
>>>>>>> 725f55ca400dc79f019e5b6d2215271003c3b3f3
    }

    render() {
        return (
            <div >
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createCategoryModal" aria-hidden="true">
                    <i className="fa fa-plus" />{' '}
                    Add category
                </button>
                <div className="modal fade" id="createCategoryModal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add category</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={this.handleAddCategories}>
                                <div className="modal-body">

                                    <div className="input-group ">
                                        <span className="input-group-addon pr-4"><i className="glyphicon glyphicon-pencil"></i></span>
                                        <input
                                            type="text"
                                            name="title"
                                            className='form-control'
                                            placeholder="category name"
                                            onChange={this.handleInputChange}
                                            value={this.state.title} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" className='btn btn-primary' value="Add" />
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="closeAddModal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default CreateCategory;