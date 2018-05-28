import React from 'react';

require('./filters.scss');

class SearchFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: ['fast food', 'italian', 'chinese', 'japanese'],
            selectedCategories: [],
            rating: 0,
            distance: 0,
            budget: 0
        }
    }

    categorySelected(category) {
        let select = document.getElementById('categories');
        let value = select.options[select.selectedIndex].value;
        let index = this.state.selectedCategories.indexOf(value)
        if (index === -1) {
            let temp = this.state.selectedCategories;
            temp.push(value);
            this.setState({
                selectedCategories: temp
            }, () => {
                console.log(this.state.selectedCategories);
            });
        }
    }

    removeCategory(id) {
        let index = this.state.selectedCategories.indexOf(id)
        if (index > -1) {
            let temp = this.state.selectedCategories;
            temp.splice(index, 1);
            this.setState({
                selectedCategories: temp
            }, () => {
                console.log(this.state.selectedCategories);
            });
        }
    }

    ratingChanged() {
        let value = document.getElementById('rating').value;
        this.setState({
            rating: value
        })
    }
    
    distanceChanged() {
        let value = document.getElementById('distance').value;
        this.setState({
            distance: value
        })
    }
    
    budgetChanged() {
        let value = document.getElementById('budget').value;
        this.setState({
            budget: value
        })
    }

    submit() {
        this.props.recommend(this.state)
    }

    render() {
        console.log(this.state.categories);
        return (
            <div className="row">
                <div className="col-sm-2">

                </div>
                <div className="col-sm-8">
                    <div className="thumbnail filters-back" id="filters">
                        <form>
                            <span className="filters-span">Categories</span>
                            <br/>
                            <select id="categories"
                                    className="filters-dropdown"
                                    onChange={this.categorySelected.bind(this)}>
                                {this.state.categories.map((category) => 
                                    <option value={category}>{category}</option>
                                )}
                            </select>
                            <ul>
                                {this.state.selectedCategories.map((category) => 
                                    <li id={category} className="badge filters-selected-category">
                                        {category}
                                        <button className="close" 
                                            onClick={this.removeCategory.bind(this, category)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                            <span className="filters-span">Minimum rating: {" " + this.state.rating}</span>
                            <input id="rating" className="filters-rating" type="range" max="5" defaultValue="0"
                                   onChange={this.ratingChanged.bind(this)}/>
                            <span className="filters-span">Maximum distance: {" " + this.state.distance + " m"}</span>
                            <input id="distance" className="filters-distance" type="range" max="30000" defaultValue="0"
                                   onChange={this.distanceChanged.bind(this)}/>
                            <span className="filters-span">Budget {" $" + this.state.budget}</span>
                            <input id="budget" className="filters-input" type="number"
                                   onChange={this.budgetChanged.bind(this)}/>
                            <button className="btn btn-primary filters-btn" type="button" onClick={this.submit.bind(this)}>Recommend</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchFilters;