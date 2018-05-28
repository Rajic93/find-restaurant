import React from 'react';

import PersonalInfo from './personalInfo';

import { connect } from "react-redux";
import { transitionSearch} from "../../js/actions/transitionsActions";

require("./profile.scss")

class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    save() {
        this.props.home();
    }

    render() {
        return (
            <div className="row profile-back">
                <div className="col-xs-12 col-sm-6 col-md-10">
                    <div className="profile-back">
                        <div className="thumbnail">
                            <span className="glyphicon glyphicon-off close" aria-hidden="true" onClick={this.save.bind(this)}/>
                            <PersonalInfo />
                            <button className="btn btn-primary profile-btn" type="button"
                                    onClick={this.save.bind(this)} >Save</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2 col-md-2 ">

                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        home: () => {
            dispatch(transitionSearch());
        }
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);