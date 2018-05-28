import React from 'react';
import { connect } from "react-redux";
import { transitionDetails, transitionHome, transitionLogin,
    transitionRegister, transitionResults, transitionSearch,
    transitionProfile } from "../../js/actions/transitionsActions";

import Header from "../Header/header";
import Footer from "../footer";

import Login from '../Login/login';
import Register from '../Register/register';
import MapContainer from '../GoogleMaps/googleMap';
import Profile from "../Profile/profile";
import SearchFilters from '../Filters/filters';
import PlacePreview from '../Place/placePreview';
import PlaceDetails from '../Place/placeDetails';
import Results from '../Results/results';

const styles = {
    app: {
        width: "100%",
        height: "100%",
        backgroundColor: "maroon"
    },
    container: {
        height: "100%"
    }
}

require('./layout.scss');

const placesObj = require('../../json/data.json');

class Layout extends React.Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     filtersComponent: null,
        //     details: [],
        //     detailsShown: false,
        //     selectedPlaceId: 0
        // }
    }

    showFilters() {
        
        this.setState({
            filtersComponent: <SearchFilters submitOnClick={this.submitOnClick.bind(this)}/>
        });
    }
    
    hideFilters() {
        this.setState({
            filtersComponent: null
        });
    }

    recommendOnClick() {
        this.props.transitionSearch();
    }

    profileOnClick() {
        this.props.transitionProfile({});
    }

    logoutOnClick() {
        this.props.transitionLogin();
    }

    submitOnClick() {
        this.props.transitionResults(placesObj);
    }

    showDetails(placeSelected){
        this.props.transitionDetails(placeSelected);
    }

    render() {
        let results;
        let main;
        if (this.props.currentPage === "Home" && this.props.currentControl === "Results") {
            results = <Results places={this.props.recommendations}
                               showDetails={this.showDetails.bind(this)}/>
        }
        if (this.props.currentPage === "Home" && this.props.currentControl === "SearchFilters"){
            main = <div id="filtersContainer" className="filters">
                        <SearchFilters recommend={this.submitOnClick.bind(this)}/>
                    </div> 
        }
        if (this.props.currentPage === "Home" && this.props.currentControl === "Profile") {
            main = <div id="filtersContainer" className="filters">
                        <Profile/>
                    </div>
        }
        if (this.props.currentPage === "Home" && this.props.currentControl === "Details") {
            main = <PlaceDetails place={this.props.selectedPlace}/>
        }
        if (this.props.currentPage === "Register") {
           main = <Register />
        }
        if (this.props.currentPage === "Login") {
           main = <Login />
        }
        return (
            <div className="layout">
                <MapContainer />
                <Header recommendOnClick={this.recommendOnClick.bind(this)}
                        profileOnClick={this.profileOnClick.bind(this)}
                        logoutOnClick={this.logoutOnClick.bind(this)}/>
                <div className="row changable">
                    <div className="col-sm-3">
                        <div id="resContainer" className="results">
                            {results}
                        </div>
                    </div>
                    <div className="col-sm-6">
                        {main}
                    </div>
                    <div className="col-sm-3">
                        {this.props.prop1}  {/*this will be automatically populated by redux*/}
                    </div>
                </div>              
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.transitions.currentPage,
        currentControl: state.transitions.currentControl,
        selectedPlace: state.transitions.selectedPlace,
        recommendations: state.transitions.recommendations
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        transitionLogin: () => {
            dispatch(transitionLogin());
        },
        transitionRegister: () => {
            dispatch(transitionRegister());
        },
        transitionHome: (control) => {
            dispatch(transitionHome(control));
        },
        transitionSearch: () => {
            dispatch(transitionSearch());
        },
        transitionResults: (results) => {
            dispatch(transitionResults(results));
        },
        transitionDetails: (place) => {
            dispatch(transitionDetails(place));
        },
        transitionProfile: (profile) => {
            dispatch(transitionProfile(profile));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);