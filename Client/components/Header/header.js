import React from 'react';

import { connect } from "react-redux";
import { transitionLogin, transitionRegister, transitionHome } from "../../js/actions/transitionsActions";
import { loadProfile } from "../../js/actions/usersActions";

import RESTCall from "../../js/RESTServiceProvider";



require('./header.scss');

class Header extends React.Component {

    profileOnClick() {
        console.log(this.props.userID)
        RESTCall.getProfile(this.props.userID, (response) => {
            console.log("user profile");
            console.log(response.data.responseData)
            this.props.load(response.data.responseData);
            this.props.profileOnClick();
        }, (error) => {
    
        });
        //
    }

    logoutOnClick() {
        this.props.logoutOnClick();
    }
    
    loginOnClick() {
        this.props.transitionLogin();
    }
    
    registerOnClick() {
        this.props.transitionRegister();
    }

    render() {
        let home;
        let recommend;
        let exit;
        if (this.props.currentPage === "Home") {
            home = <div className="btn-group group-profile">
                        <button type="button"
                         className="btn btn-default"
                                onClick={this.props.recommendOnClick}>Home</button>
                        <button type="button"
                                className="btn btn-default"
                                onClick={this.profileOnClick.bind(this)}>Profile</button>
                        <button type="button"
                                className="btn btn-default">History</button>
                    </div>
            recommend = <button type="button"
                                className="btn btn-primary recommend"
                                onClick={this.props.recommendOnClick}>Recommend</button>
            exit = <div className="group-login-logout">
                        <button type="button"  
                                className="btn btn-danger logout"
                                onClick={this.logoutOnClick.bind(this)}>Logout</button>
                        {/* <button type="button"  className="btn btn-success login">Login</button> */}
                    </div>
        }
        if (this.props.currentPage === "Register") {
            exit = <div className="group-login-logout">
                        <button type="button"  
                                className="btn btn-success login"
                                onClick={this.loginOnClick.bind(this)}>Login</button>
                    </div>
        }
        if (this.props.currentPage === "Login") {
            exit = <div className="group-login-logout">
                        <button type="button"  
                                className="btn btn-primary login"
                                onClick={this.registerOnClick.bind(this)}>Register</button>
                    </div>
        }
        return (
            <div id="headContainer" className="header">
                {exit}
                {home}
                {recommend}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.transitions.currentPage,
        currentControl: state.transitions.currentControl,   
        userID: state.users.loggedUserId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        transitionLogin: () => {
            dispatch(transitionLogin())
        },
        transitionRegister: () => {
            dispatch(transitionRegister());
        },
        transitionHome: () => {
            dispatch(transitionHome());
        },
        load: (profile) => {
            dispatch(loadProfile(profile));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);