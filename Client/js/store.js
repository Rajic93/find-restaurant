import {createStore, combineReducers, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import thunk from "redux-thunk";

import transitionsReducer from "./reducers/transitionsReducer";
import usersReducer from "./reducers/usersReducer";
import initialState from "../json/AppInitState";

const combinedReducer = combineReducers({
    transitions: transitionsReducer,
    usersReducer: usersReducer
})

export default createStore(combineReducers({     //if many reducers use combinedReducer
    transitions: transitionsReducer,
    users: usersReducer
}), {},                                       //initial state of the store
    applyMiddleware(createLogger(), thunk)              //optional - custom middlewares
);