export function transitionLogin() {
    return {
        type: "TRANSITION_LOGIN",
        payload: ""
    };
};

export function transitionRegister() {
    return {
        type: "TRANSITION_REGISTER",
        payload: ""
    };
};

export function transitionHome(control) {
    return {
        type: "TRANSITION_HOME",
        payload: control
    };
};

export function transitionSearch() {
    return {
        type: "TRANSITION_FILTERS",
        payload: ""
    }
}

export function transitionResults(results) {
    return {
        type: "TRANSITION_RESULTS",
        payload: results
    };
};

export function transitionDetails(place) {
    return {
        type: "TRANSITION_DETAILS",
        payload: place
    };
};

export function transitionProfile(profile) {
    return {
        type: "TRANSITION_PROFILE",
        payload: profile
    };
};

export function transitionMarker(places) {
    return {
        type: "TRANSITION_MARKER",
        payload: places
    };
};