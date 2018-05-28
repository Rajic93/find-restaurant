import React from 'react';

import { connect } from "react-redux";
import { transitionSearch, transitionLogin } from "../../js/actions/transitionsActions";
import { register } from "../../js/actions/usersActions";

import RESTCall from '../../js/RESTServiceProvider';

var styleDiv = {
    marginTop: "20vh",
    marginLeft: "35%",
    width: "40%",
    backgroundColor : "#fcfdfd",
    borderColor: "#eef1f1",
    borderStyle: "outset",
    borderSize: "2px",
    borderRadius: "5px",
}

var styleLogo = {
    width: "30%",
    height: "25%",
    marginLeft: "35%",
    marginBottom: "4%",
    marginTop: "4%"
}

var styleInput = {
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%"
}

var styleButton = {
    float: "right",
    marginTop: "5%",
    marginRight: "5%"
}

var styleJoin = {
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
    marginBottom: "5%"
}

var styleType = {
    float: "left",
    marginTop: "5%",
    width: "30%"
}

var styleDropContainer = {
    width: "90%",
    float: "right",
    marginRight: "5%"
}

var styleDropdown = {
    width: "50%",
    float: "right",
    marginTop: "5%"
}

class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.props = props;
    }

    /**
     * This is a callback function for making API request for registering new user
     * @param {Object} response - response message from the server 
     */
    registerClick(response) {
        //hardcoding 
        //*************
        // response.data = {
        //     username: "alex",
        //     password: "123",
        //     type: "regular"
        // }
        // delete it
        //*************
        if (response.statusCode === 2 && response.responseData !== null) {
            console.log("success")
            console.log(response.responseData)
            this.props.register(response.responseData);
            this.props.transitionSearch();
        }
        else {
            if (response.data === null)
            console.log("server response data is null")
        }
    }

    registerr() {
    }

    register() {
        //hashing password
        var passwordValue = document.getElementById('password').value;
        var repeatPasswordValue = document.getElementById('repeatPassword').value;
        // var passwordHash = require('password-hash');
        // var hashedPassword = passwordHash.generate(passwordValue);
        // var hashedRepeatPassword = passwordHash.generate(repeatPasswordValue);
        // console.log(passwordValue); 
        // console.log(repeatPasswordValue);
        // var x = hashedPassword.split("$");
        // console.log(x[x.length - 1]); 

        //if (passwordHash.verify(repeatPasswordValue, hashedPassword)) {
        if (passwordValue == repeatPasswordValue) {
            var usernameValue = document.getElementById('username').value;
            var emailValue = document.getElementById('email').value;
           
            var dataObject = {
                firstName: usernameValue,
                password: passwordValue,
                email: emailValue
            };
            console.log(dataObject);
            RESTCall.register(dataObject, function(response) {
                console.log("Response message:")
                console.log(response)
                this.registerClick(response.data)
            }.bind(this), function(error) {
                console.log("Error message:")
                console.log(error)
                //hardcoding 
                //*************
                this.registerClick({
                    status: 200
                })
                // delete it
                //*************
            }.bind(this))
        }
        else
            console.log("paswords do not match")
    }

    login() {
        console.log("login")
        this.props.transitionLogin();
    }

    render() {
        return (
            <div>
                <div style={styleDiv}>
                    <input type="text" placeholder="username" id="username" style={styleInput}/>
                    <br/>
                    <input type="password" placeholder="password" id="password" style={styleInput}/>
                    <br/>
                    <input type="password" placeholder="repeat password" id="repeatPassword" style={styleInput}/>
                    <br/>
                    <input type="text" placeholder="email" id="email" style={styleInput}/>
                    <input type="button" className="btn btn-primary" value="Register" name="register" onClick={this.register.bind(this)} style={styleButton}/>
                    <input type="button" className="btn btn-success" value="Login" onClick={this.login.bind(this)} style={styleJoin}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.transitions.currentPage,
        currentControl: state.transitions.currentControl,
        loggedUserId: state.users.loggedUserId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        transitionLogin: () => {
            dispatch(transitionLogin())
        },
        transitionSearch: () => {
            dispatch(transitionSearch());
        },
        register: (id) => {
            dispatch(register(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);