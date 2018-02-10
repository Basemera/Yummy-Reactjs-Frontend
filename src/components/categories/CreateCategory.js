import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axiosInstance from '../Apicalls';

class CreateCategory extends Component {
    state = {
        title: ''
    }
    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    handleAddCategories = (event) => {
        const {title: name} = this.state;
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }

        event.preventDefault();
        axiosInstance.post('categories/', {name}, {headers})
        .then(response => {
            this
                .props
                .getCategories()

        }).catch(error => {
            if (error.response) {
                alert(error.response.data.message)
            } else if (error.request) {
                alert("Request not made")
            }
        });
    }

    render() {
        return (
            <div >
                <div id="recipebar">
                    <div className="container text-center">
                        <div className='row'>
                            <div
                                className='col-xs-8  col-sm-6 offset-xs-2 offset-sm-3 col-md-4 offset-md-4'>
                                <h2>Create Your Recipe Category</h2>

                                <form onSubmit={this.handleAddCategories}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="title"
                                            className='form-control'
                                            placeholder="category name"
                                            onChange={this.handleInputChange}
                                            value={this.state.title}/>
                                    </div>

                                    <input type="submit" className='btn btn-primary' value="Add Category"/>
                                </form>
                            </div>
                        </div>
                    </div>
                    <br/>
                    
                    <form className="form-group" role="search">
                        <div className="input-group add-on col-sm-3 pull-right">
                            <input type="text" className="form-control" placeholder="Search for a category..." name="srch-term"/>
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit">
                                    <i className="glyphicon glyphicon-search"></i></button>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>
        );
    }
}
export default CreateCategory;