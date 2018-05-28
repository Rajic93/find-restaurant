import React from 'react';

import { connect } from "react-redux";
import { transitionRegister, transitionSearch } from "../../js/actions/transitionsActions";
import { login } from "../../js/actions/usersActions";
import RESTCall from '../../js/RESTServiceProvider';

var styleDiv = {
    marginTop: "20vh",
    marginLeft: "40%",
    width: "30%",
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
    marginRight: "5%",
    marginTop: "6%"
}

var styleJoin = {
    width: "90%",
    marginLeft: "5%",
    marginTop: "5%",
    marginBottom: "5%"
}

var styleForgot = {
    marginLeft: "5%",
    marginTop: "6%"
}

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
        this.props = props;
    }

    logedIn(response) {
        console.log("repsonse data")
        console.log(response)
        if (response.statusCode === 1 && response.responseData !== null) {
            if (response.data === 0) {
                console.log("user not found")
            }
            else {
                console.log(response.responseData)
                this.props.login(response.responseData);
                this.props.transitionSearch();
            }
        }
        else {
            if (response.responseData === null)
            console.log("server response data is null")
        }
    }

    login() {
        
    }

    login() {
        var passwordValue = document.getElementById('password').value;
        var usernameValue = document.getElementById('email').value;

        // var passwordHash = require('password-hash');
        // var hashedPassword = passwordHash.generate(passwordValue);
        // var x = hashedPassword.split("$");
        //console.log(x[x.length - 1]);

        var dataObject = {
            username: usernameValue,
            password: passwordValue
        };
        console.log(dataObject);
        RESTCall.login(dataObject, function(response) {
            console.log("Response message:")
            console.log(response)
            this.logedIn(response.data)
        }.bind(this), function(error) {
            console.log("Error: LOGIN")
            console.log(error)
        }.bind(this))
    }

    joinNow() {
        this.props.transitionRegister();
    }

    render() {
        return (
            <div>
                <div style={styleDiv}>
                    <input type="email" placeholder="email" id="email" style={styleInput}/>
                    <br/>
                    <input type="password" placeholder="password" id="password" style={styleInput}/>
                    <br/>
                    <input type="button" className="btn btn-success" value="Login" name="login" onClick={this.login.bind(this)} style={styleButton}/>
                        <a href="#">
                            <p  style={styleForgot}>
                                Forgot password?
                            </p>
                        </a>
                    <input type="button" className="btn btn-primary" value="Join now" onClick={this.joinNow.bind(this)} style={styleJoin}/>
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
        transitionRegister: () => {
            dispatch(transitionRegister())
        },
        transitionSearch: () => {
            dispatch(transitionSearch());
        },
        login: (id) => {
            dispatch(login(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);