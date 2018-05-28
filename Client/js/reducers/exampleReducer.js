export default mathReducer = (state = {
    result: 1,
    last: 2
}, action) => {
    switch (action.type) {
        case "value":
            state  = {
                // ...state,
                result: state.result + 1 //overwrite
            }
            break;
    
        default:
            break;
    }
    return state;
};