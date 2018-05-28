const usersReducer = (state = {
    userProfile : {
        id: 0,
        nationality : "",
        firstName: "",
        lastName: "",
        age: 0,
        email: "",
        country: "",
        region: "",
        city: "",
        affinities: [],
        alergies: [],
        likes: [],
        dislikes: [],
        photo: "",
        budget: 0,
        profession: ""
    },
    loggedUserId: 0
}, action) => {
    let user;
    switch (action.type) {
        case "USERS_REGISTER":
        console.log("reducer: " + action.payload)
            state = {
                userProfile: state.userProfile,
                loggedUserId: action.payload
            }
            break;
        case "USERS_LOGIN":
            console.log("reducer login " + action.payload)
            state = {
                userProfile: state.userProfile,
                loggedUserId: action.payload
            }
            break;
        case "USER_LIKE":
            user = state.userProfile;
            user.likes.push(action.payload);
            state = {
                loggedUserId: state.loggedUserId,
                userProfile: user
            }
            break;
        case "USER_DISLIKE":
            user = state.userProfile;
            user.dislikes.push(action.payload);
            state = {
                loggedUserId: state.loggedUserId,
                userProfile: user
            }
            break;
        case "USER_LOAD_PROFILE":
            user = state.userProfile;
            user.firstName = "Aleksandar" //action.payload.firstName
            user.lastName = "Rajic" //action.payload.lastName
            user.nationality = "Serbian" //action.payload.nationality
            user.age = 24 //action.payload.age
            user.email = "aleksandar.v.rajic@gmail.com" //action.payload.email
            user.country = action.payload.country
            user.region = action.payload.region
            user.city = action.payload.city
            state = {
                loggedUserId: state.loggedUserId,
                userProfile: user
            }
            break;
        case "USER_UPDATE_PROFILE":
            user = state.userProfile;
            user.firstName = action.payload.firstName
            user.lastName = action.payload.lastName
            user.nationality = action.payload.nationality
            user.age = action.payload.age
            user.email = action.payload.email
            user.country = action.payload.country
            user.region = action.payload.region
            user.city = action.payload.city
            state = {
                loggedUserId: state.loggedUserId,
                userProfile: user
            }
        default:
            break;
    }
    return state;
};

export default usersReducer;