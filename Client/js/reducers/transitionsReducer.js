const transitionsReducer = (state = {
    currentPage : "Login",
    currentControl : "",
    selectedPlace: {},
    recommendations: [],
    placesToShow: []
}, action) => {
    switch (action.type) {
        case "TRANSITION_LOGIN":
            state = {
                currentPage: "Login",
                placesToShow: []
            }
            break;
        case "TRANSITION_REGISTER":
            state = {
                currentPage: "Register",
                placesToShow: []
            }
            break;
        case "TRANSITION_HOME":
            state = {
                currentPage: "Home",
                currentControl: action.payload,
                selectedPlace: state.selectedPlace,
                recommendations: state.recommendations,
                placesToShow: state.placesToShow
            }
            break;
            case "TRANSITION_RESULTS":
                state = {
                    currentPage: "Home",
                    currentControl: "Results",
                    selectedPlace: state.selectedPlace,
                    recommendations: action.payload,
                    placesToShow: action.payload
                }
                break;
            case "TRANSITION_DETAILS":
                state = {
                    currentPage: "Home",
                    currentControl: "Details",
                    selectedPlace: action.payload,
                    recommendations: state.recommendations,
                    placesToShow: [action.payload]
                }
                break;
                case "TRANSITION_FILTERS":
                    state = {
                        currentPage : "Home",
                        currentControl : "SearchFilters",
                        selectedPlace: state.selectedPlace,
                        recommendations: state.recommendations,
                        placesToShow: state.placesToShow
                    }
                    break;
                case "TRANSITION_PROFILE":
                    state = {
                        currentPage : "Home",
                        currentControl : "Profile",
                        selectedPlace: state.selectedPlace,
                        recommendations: state.recommendations,
                        placesToShow: state.placesToShow
                    }
                    break;
                case "TRANSITION_MARKER":
                    state = {
                        currentPage : "Home",
                        currentControl : "Marker",
                        selectedPlace: state.selectedPlace,
                        recommendations: state.recommendations,
                        placesToShow: [action.payload]
                    }
                    break;
    }
    return state;
};

export default transitionsReducer;