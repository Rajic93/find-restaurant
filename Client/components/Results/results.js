import React from 'react';

import PlacePreview from '../Place/placePreview';

var scroll = {
    overflowY: "scroll",
    maxHeight: "90%"
}

class Results extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props.places)
        this.state = {
            places: this.props.places
        };
    }

    placeClicked(place){
        this.props.showDetails(place);
    }

    render() {
        return (
            <div className="row ">
                <div className="col-sm-12 col-md-12">
                        {this.state.places.map((place) => <PlacePreview key={place.id}
                                                                        place={place}
                                                                        click={this.placeClicked.bind(this)}/>)}
                    
                </div>
            </div>
        );
    }
}

export default Results;