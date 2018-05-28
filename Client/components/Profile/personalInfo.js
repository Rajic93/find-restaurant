import React from 'react';

import { connect } from "react-redux";
import { updateProfile } from "../../js/actions/usersActions";

class PersonalInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
                firstName: props.firstName,
                lastName: props.lastName,
                age: props.age,
                email: props.email,
                nationality: props.nationality,
                country: props.country,
                city: props.city,
                region: props.region
            }

        this.state
    }
    
        uploadImage(event) {
            // var file = document.getElementById("file").files[0]
            // var reader = new FileReader()
            // reader.onload = function(event) {
            //     console.log("on load")
            //     var img = document.getElementById("image")
            //     img.src = event.target.result
            //     this.props.saveImage(event.target.result)
            // }.bind(this)
            // if (file) {
            //     reader.readAsDataURL(file)
            //     console.log(reader)
            // }
        }
    
        onInputChangeHandler(){
            
            let userProfile = this.state;
            userProfile.firstName = document.getElementById("firstName").value;
            userProfile.lastName = document.getElementById("lastName").value;
            userProfile.age = document.getElementById("birthday").value;
            userProfile.email = document.getElementById("email").value;
            userProfile.nationality = document.getElementById("nationality").value;
            userProfile.country = document.getElementById("country").value;
            userProfile.region = document.getElementById("region").value;
            userProfile.city = document.getElementById("city").value;
            this.props.update(userProfile);
            // this.setState(userProfile)
        }
    
        onAboutChangeHandler(){
            // var userProfile = this.state.userProfile
            // userProfile.personalInfo.about = document.getElementById("about").value
            // this.setState(userProfile)
        }

    render() {
        return (
            <div>
                <table className="personalInfo-table">
                    <tbody>
                        <tr>
                        <td rowSpan="5">
                            
                                <img id="image" src={this.state.firstName} className="personalInfo-img"/>
                        
                            
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="label label-info personalInfo-lbl">First name:</span>
                            </td>
                            <td>
                                <input className="personalInfo-input" type="text" id="firstName" value={this.state.firstName}
                                        onChange={(event) => this.onInputChangeHandler(event)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="label label-info personalInfo-lbl">Last name:</span>
                            </td>
                            <td>
                                <input className="personalInfo-input" type="text" id="lastName" value={this.state.lastName}
                                        onChange={(event) => this.onInputChangeHandler(event)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="label label-info personalInfo-lbl">Age: </span>
                            </td>
                            <td>
                                <input className="personalInfo-input" type="number" id="birthday" value={this.state.age}
                                        onChange={(event) => this.onInputChangeHandler(event)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span className="label label-info personalInfo-lbl">Email:</span>
                            </td>
                            <td>
                                <input className="personalInfo-input" type="email" id="email" value={this.state.email}
                                        onChange={(event) => this.onInputChangeHandler(event)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="file" id="file" onChange={this.uploadImage.bind(this)} className="personalInfo-img"/>
                            </td>
                            <td>
                                <span className="label label-info personalInfo-lbl">Nationality:</span>
                            </td>
                            <td>
                                <input className="personalInfo-input" type="text" id="nationality" value={this.state.nationality}
                                        onChange={(event) => this.onInputChangeHandler(event)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td>
                                <span className="label label-info personalInfo-lbl">Country:</span>
                            </td>
                            <td>
                                <input className="personalInfo-input" type="text" id="country" value={this.state.country}
                                        onChange={(event) => this.onInputChangeHandler(event)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td>
                                <span className="label label-info personalInfo-lbl">Region:</span>
                            </td>
                            <td>
                                <input className="personalInfo-input" type="text" id="region" value={this.state.region}
                                        onChange={(event) => this.onInputChangeHandler(event)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td>
                                <span className="label label-info personalInfo-lbl">City:</span>
                            </td>
                            <td>
                                <input className="personalInfo-input" type="text" id="city" value={this.state.city}
                                        onChange={(event) => this.onInputChangeHandler(event)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td>
                                <span className="label label-info personalInfo-lbl">Profession:</span>
                            </td>
                            <td>
                                <input className="personalInfo-input" type="text" id="address" value={this.state.address}
                                        onChange={(event) => this.onInputChangeHandler(event)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                               
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        firstName: state.users.userProfile.firstName,
        lastName: state.users.userProfile.lastName,
        age: state.users.userProfile.age,
        email: state.users.userProfile.email,
        nationality: state.users.userProfile.nationality,
        country: state.users.userProfile.country,
        region: state.users.userProfile.region,
        city: state.users.userProfile.city,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: (profile) => {
            dispatch(updateProfile(profile));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);