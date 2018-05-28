import React from 'react';

import { connect } from "react-redux";
import { transitionDetails } from "../../js/actions/transitionsActions";

import Map, { GoogleApiWrapper, Marker } from 'google-maps-react';

const styles = {
    map: {
        height: "100%",
        width: "100%",
        zIndex: -1
    }
}

//Places.apiKey = 'AIzaSyBb_lSZV23973sZTsG82hSB0oXKqh64wr0';

const apiKey = 'AIzaSyBXt6SbINUzL6-3pfleH6ugw0DOTSYtrCo';

class MapContainer extends React.Component {
    

    onMapMoved(props, map) {
        
    }

    onMarkerClick(props, marker, e) {
        this.props.back(props.placeShown);
    }

    onInfoWindowClose() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
            showingInfoWindow: false,
            activeMarker: null
            })
        }
    }
    render() {
        console.log("to show \n")
        console.log(this.props.placesToShow[0])
        return (
            <div 
            style={styles.map}>
                <Map google={this.props.google}
                className={'map'}
                zoom={14}
                containerStyle={{}}
                clickableIcons={false}
                centerAroundCurrentLocation={true}
                onClick={this.onMapClicked}
                onDragend={this.onMapMoved}>
                {this.props.placesToShow.map((place) => <Marker name={'Your position'}
                                                                key={place.id}
                                                                placeShown={place}
                                                                position={{lat: place.location.lat, lng: place.location.lng}}
                                                                onClick={this.onMarkerClick.bind(this)}/>)}
                </Map>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        placesToShow: state.transitions.placesToShow
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        back: (place) => {
            dispatch(transitionDetails(place));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: apiKey,
    version: '3.28'
  })(MapContainer));