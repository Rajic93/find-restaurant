export function register(id) {
    return {
        type: "USERS_REGISTER",
        payload: id
    };
};

export function login(id) {
    return {
        type: "USERS_LOGIN",
        payload: id
    };
};

export function like(place) {
    return {
        type: "USER_LIKE",
        payload: place
    };
};

export function dislike(place) {
    return {
        type: "USER_DISLIKE",
        payload: place
    };
};

export function loadProfile(profile) {
    return {
        type: "USER_LOAD_PROFILE",
        payload: profile
    };
};

export function updateProfile(profile) {
    return {
        type: "USER_UPDATE_PROFILE",
        payload: profile
    };
};