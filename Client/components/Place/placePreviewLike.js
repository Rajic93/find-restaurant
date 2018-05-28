import React from 'react';

require('./place.scss');

class PlacePreview extends React.Component {

    constructor(props) {
        super(props);
      
        console.log(props.place)
        this.state = {
            place: this.props.place
        };
    }

    showDetails(){
        console.log(this.state.place)
        this.props.click(this.state.place);
    }

    render() {
        return (
                <div className="col-xs-12 col-sm-12 col-md-12">
                    <div className="thumbnail placePreviewThumb">
                        <table className="placePreviewTable">
                            <tbody>
                                <tr className="placePreviewTr">
                                    <td>
                                        <span className="label label-primary"
                                              onClick={this.showDetails.bind(this)}>{this.state.place.name}</span>
                                    </td>
                                </tr>
                                <tr className="placePreviewTr">
                                    <td>
                                        <span className="label label-default">{this.state.place.contact}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <br/>
                                    </td>
                                </tr>
                                <tr className="placePreviewTr">
                                    <td>
                                        <img className="placePreviewImg"
                                             onClick={this.showDetails.bind(this)}
                                             src="../../images/location.png"
                                             alt=""/>
                                    </td>
                                </tr>
                                <tr>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
}

export default PlacePreview;
