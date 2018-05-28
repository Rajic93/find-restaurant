import React from 'react';

import { connect } from "react-redux";
import { like, dislike } from "../../js/actions/usersActions"
import { transitionResults, transitionMarker } from "../../js/actions/transitionsActions"

require('./place.scss');

class PlaceDetails extends React.Component {

    constructor(props) {
        super(props);

        console.log("address")
        console.log(props.place)
        
        this.state = {
            place: this.props.place
        };
    }

    componentWillReceiveProps(nextProps){
        console.log("next props")
        console.log(nextProps)
    }

    showLatLng(){
        let loc = (this.state.place.location.lat === "" || this.state.place.location.lng === "") ? "" : "(" + this.state.place.location.lat + "," + this.state.place.location.lng + ")";
        console.log("loc");
        console.log(loc);
        return loc
    }

    back() {
        this.props.back(this.props.recommendations);
    }
    
    like(){
        this.props.like(this.state.place);
    }
    
    dislike(){
        this.props.dislike(this.state.place);
    }

    showPlace() {
        this.props.info(this.state.place);
    }

    render() {
        let verified = [];
        if(this.state.place.verified)
            verified = <span className="glyphicon glyphicon-ok" title="verified" aria-hidden="true"></span>;
        else
            verified = <span className="glyphicon glyphicon-remove" title="verified" aria-hidden="true"></span>;
        return (
            <div className="row">
                <div className="col-xs-0 col-sm-3 col-md-3">

                </div>
                <div className="col-xs-12 col-sm-6 col-md-8">
                    <div className="thumbnail placeDetailsThumb">
                        <table className="placeDetailsTable">
                            <tbody>
                                <tr>
                                    <td className="placeDetailsHeading">
                                        <span className="label label-primary">{this.state.place.name}, {this.state.place.location.distance}</span>
                                    </td>
                                    <td className="placeDetailsVerified">
                                        {verified}
                                    </td>
                                    <td className="placeDetailsRating">
                                        <span className="glyphicon glyphicon-star-empty" aria-hidden="true">{this.state.place.rating}</span>
                                    </td>
                                </tr>
                                <tr >
                                    <button className="btn btn-success back" onClick={this.back.bind(this)}>
                                        <span className="glyphicon glyphicon-chevron-left" 
                                            aria-hidden="true"/>
                                    </button>
                                    <button className="btn btn-danger like" onClick={this.dislike.bind(this)}>
                                        <span className="glyphicon glyphicon-thumbs-down" 
                                            aria-hidden="true"/>
                                    </button>
                                    <button className="btn btn-primary like" onClick={this.like.bind(this)}>
                                        <span className="glyphicon glyphicon-thumbs-up" 
                                            aria-hidden="true"/>
                                    </button>
                                </tr>
                                <tr className="placeDetailsTr">
                                    <td>
                                        <span className="label label-default">{this.state.place.location.formattedAddress}, {this.state.place.contact}, {this.state.place.hours}</span>
                                    </td>
                                </tr>
                                <tr className="placeDetailsTr">
                                    <td>
                                        <span className="label label-default">{this.showLatLng()}</span>
                                    </td>
                                </tr>
                                <tr className="placeDetailsTr">
                                </tr>
                                <tr className="placeDetailsTr">
                                    <td>
                                        <span className="label label-default">{this.state.place.url}</span>
                                    </td>
                                </tr>
                                <tr className="placeDetailsTr">
                                    <td>
                                        <span className="label label-default">{this.state.place.description}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <br/>
                                    </td>
                                </tr>
                                <tr className="placeDetailsTr">
                                    <td>
                                        {this.state.place.categories.map((category) => {
                                            <span className="label label-default">{category.label}</span>
                                        })}
                                    </td>
                                </tr>
                                <tr className="placeDetailsTr">
                                    <td>
                                        {/* <img className="placeDetailsImg" src={this.state.place.photos} alt=""/> */}
                                        <img className="placeDetailsImg"
                                             src="../../images/location.png"
                                             alt=""/>
                                    </td>
                                </tr>
                                <tr>
                                    
                                    <button className="btn btn-info like" onClick={this.showPlace.bind(this)}>
                                        <span className="glyphicon glyphicon-map-marker" 
                                            aria-hidden="true"/>
                                    </button>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        likes: state.users.userProfile.likes,
        dislikes: state.users.userProfile.dislikes,
        recommendations: state.transitions.recommendations
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        like: (place) => {
            dispatch(like(place));
        },
        dislike: (place) => {
            dispatch(dislike(place));
        },
        back: (recommendations) => {
            dispatch(transitionResults(recommendations));
        },
        info: (place) => {
            dispatch(transitionMarker(place));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);