import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {notify} from 'react-notify-toast';
import axiosInstance from '../Apicalls';
import CreateCategory from './CreateCategory';
import EditCategory from './editCategory';
import Pagination from '../pagination';
import Search from '../searchQuery';
import PropTypes from 'prop-types';

// Reusable component to render a single category in a card
export const Category = (props) => (
    <div className="col-md-3 col-sm-6 category-card">
        <div className="card ">
            <div className="card-block color" >
                <h3 className="card-title">{props.name}</h3>
                <h5 className="card-block">
                <Link
                    className="btn btn-sm btn-success card-link"
                    data-toggle="modal"
                    data-target={`#edit_category${props.id}`}
                    to="#"><i className="fa fa-edit"/></Link>
                <Link
                    className="btn btn-sm btn-danger card-link"
                    onClick={props.deleteCategory}
                    to={`#`}><i className="fa fa-trash"/></Link>
                    </h5>
                <Link to={`/category/${props.id}/recipes`}>
                
                    <h4 className="card-footer">View Recipes</h4>
                </Link>
                <EditCategory name={props.name} id={props.id} editCategory={props.editCategory}/>
            </div> 
        </div>
    </div>

)

Category.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    editCategory:PropTypes.func.isRequired,
}
/**
 * Component for rendered categories.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
class Categories extends Component {
    state = {
        categories: [],
        Next_page: null,
        Previous_page: null,
        current_page: null,
        total_pages: null,
        total_Items: null,
        searching: false,
    }

    getCategories = () => {
        if(this.state.searching){
            return;
        }
        // create a variable for page to be current page
        const page = this.state.current_page || 1;
        axiosInstance
            .get('categories/', {params:{page}})
            .then(response => {
                this.setState({...response.data, searching: false});
                console.log(response)
            })
            .catch(error => {
                if (error.response) {
                    const {status} = error.response;
                    //send data and error to a higher order method to signal occurance of an error 
                    //and that no category is created yet
                    if(status === 404){
                        this.setState({
                            categories: [],
                        });
                    }
                } else if (error.request) {
                    alert("Request not made")
                }
            });
    }
    // called always before the component's first render
    // fectches categories
    componentWillMount() {
        this.getCategories();
    }

    deleteCategory(value) {
        axiosInstance
            .delete(`categories/${value}`)
            .then(response => {
                notify.show(response.data.message, 'success', 4000);
                // updates the categories list after delete
                this.getCategories();
            })
    }

    editCategory=  (id, name)=>{
        axiosInstance
            .put(`categories/${id}`,{name})
            .then(response => {
                notify.show(response.data.message, 'success', 4000);
                document.getElementById(`close${id}`).click();
                this.getCategories();
            })
    }
    // pagination with search and normal request
    changePage = (selectedPage)=>{
        this.setState(previousState=>({
            current_page: selectedPage
        }),()=>{
            if(this.state.searching){
                this.searchCategories(this.state.q);
            }else{
                this.getCategories()
            }
        })

    }
    // handles call when searching for a category
    searchCategories =(q)=>{
        const page = !this.state.searching ? 1 : (this.state.current_page || 1);
        this.setState({q})
        axiosInstance.get(`categories/`,{
            params:{ q,page}
        }).then(response =>{
            this.setState({...response.data, searching: true});
        }).catch(error =>{
            if(error.response){
                // notify users incase of an error from response
                notify.show(error.response.data.message,'error', 3000)
            }else if(error.request){
                notify.show("Request not made", 'error' , 3000)
            }
        
        })
    } 

    render() {
        const {current_page, total_pages, Next_page, Previous_page} = this.state;
        // create a list of categories with props
        let categoryitems = this
            .state
            .categories
            .map(category => (<Category
                name={category.cat.name}
                id={category.cat.id}
                deleteCategory={() => this.deleteCategory(category.cat.id)}
                editCategory={this.editCategory}
                key={category.cat.id}/>))

        return (
            <div >
                <CreateCategory getCategories={this.getCategories}/>
                <div className="viewcategories">
                <Search handleSearch={this.searchCategories}/>
                    <div className="row categories">
                        {this.state.categories.length
                            ? categoryitems
                            : <div className="col-sm-5 offset-sm-6">
                            <div class="alert alert-info" role="alert">
                    <strong>Ooops!</strong> No categories , go a head and add some
                    </div></div>}

                    </div>
                    <Pagination 
                        activePage={current_page}
                        previousPage={Previous_page}
                        nextPage={Next_page}
                        totalPages={total_pages}
                        changePage={this.changePage} />
                </div>
            </div>
        );
    }
}
export default Categories;
