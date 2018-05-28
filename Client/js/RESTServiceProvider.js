import axios from 'axios';

const BASEURI = "http://localhost:8000/";

var reqObj = {
    method: '',  
    url: "",
    responseType:'json',
    data: {}
}

const files = {
    USERS: "users",
    PLACES: "places"
}

const makeReq = function(req, successCallback, errorCallback) {
    console.log("make req " + req.url)
    axios(req)
    .then(function(response) {
        successCallback(response)
    })
    .catch(function (error) {
        errorCallback(error);
    })
}

const register = function(data, successCallback, erroCallback) {
    reqObj.method = 'POST'
    reqObj.url = BASEURI + files.USERS + "/register"
    console.log("make req " + reqObj.url)
    reqObj.data = JSON.stringify(data)
    makeReq(reqObj, successCallback, erroCallback)
}

const login = function(data, successCallback, erroCallback) {
    reqObj.method = 'POST'
    reqObj.url = BASEURI + files.USERS + "/login"
    reqObj.data = JSON.stringify(data)
    makeReq(reqObj, successCallback, erroCallback)
}

const getProfile = function(id, successCallback, erroCallback) {
    reqObj.method = 'GET'
    reqObj.url = BASEURI + files.USERS + "/" + id
    makeReq(reqObj, successCallback, erroCallback)
}

const updateProfile = function(userProfile, successCallback, erroCallback) {
    reqObj.method = 'POST'
    reqObj.url = BASEURI + files.USERS + "/update"
    reqObj.data = JSON.stringify(userProfile)
    console.log(reqObj)
    makeReq(reqObj, successCallback, erroCallback)
}

//---------------------------------------------------------------

// const getPortfolio = function(userID, successCallback, erroCallback) {

// }

// //add new portfolio item
// const addPortfolioItem = function(portfolioItem, successCallback, erroCallback) {

// }

// const updatePortfolioItem = function(portfolioItem, successCallback, erroCallback) {

// }

// const deletePortfolioItem = function(portfolioID, successCallback, erroCallback) {

// }

// const getAllConversations = function(userID, successCallback, erroCallback) {
//     reqObj.method = 'GET'
//     reqObj.url = BASEURI + files.CONVERSATION + "/conversation/" + userID
//     makeReq(reqObj, successCallback, erroCallback)
// }

// const createConversation = function(conversation, successCallback, erroCallback) {
//     reqObj.method = 'PUT'
//     reqObj.url = BASEURI + files.CONVERSATION + "/addconversation"
//     reqObj.data = JSON.stringify(conversation)
//     console.log(reqObj.url)
//     makeReq(reqObj, successCallback, erroCallback)
// }

// const getAllMessages = function(conversationID, successCallback, erroCallback) {
//     reqObj.method = 'GET'
//     reqObj.url = BASEURI + files.CONVERSATION + "/messages/" + conversationID
//     console.log(reqObj.url)
//     makeReq(reqObj, successCallback, erroCallback)
// }

// const createMessage = function(message, successCallback, erroCallback) {
//     reqObj.method = 'PUT'
//     reqObj.url = BASEURI + files.CONVERSATION + "/addmessage"
//     reqObj.data = JSON.stringify(message)
//     console.log(reqObj.url)
//     makeReq(reqObj, successCallback, erroCallback)
// }

// const makeOffer = function(offer, successCallback, erroCallback) {
//     reqObj.method = 'PUT'
//     reqObj.url = BASEURI + files.EVENT + "/offer"
//     reqObj.data = JSON.stringify(offer)
//     console.log(reqObj.url)
//     console.log(reqObj.data)
//     makeReq(reqObj, successCallback, erroCallback)
// }

// const acceptOffer = function(data, successCallback, erroCallback) {
//     reqObj.method = 'POST'
//     reqObj.url = BASEURI + files.EVENT + "/accept"
//     reqObj.data = JSON.stringify(data)
//     console.log(reqObj.url)
//     makeReq(reqObj, successCallback, erroCallback)
// }

// const denyOffer = function(data, successCallback, erroCallback) {
//     reqObj.method = 'POST'
//     reqObj.url = BASEURI + files.EVENT + "/reject"
//     reqObj.data = JSON.stringify(data)
//     console.log(reqObj.url)
//     makeReq(reqObj, successCallback, erroCallback)
// }

// const getAllEvents = function(userID, successCallback, erroCallback) {
//     reqObj.method = 'GET'
//     reqObj.url = BASEURI + files.EVENT + "/user/" + userID
//     console.log("get all events")
//     console.log(userID)
//     makeReq(reqObj, successCallback, erroCallback)
// }

// const getAvailableEvents = function(userID, successCallback, erroCallback) {
//     reqObj.method = 'GET'
//     reqObj.url = BASEURI + files.EVENT + "/event"
//     makeReq(reqObj, successCallback, erroCallback)
// }

// const createEvent = function(offer, successCallback, erroCallback) {
//     reqObj.method = 'PUT'
//     reqObj.url = BASEURI + files.EVENT + "/event"
//     reqObj.data = JSON.stringify(offer)
//     makeReq(reqObj, successCallback, erroCallback)
// }

// const uploadImage = function(offer, successCallback, erroCallback) {
//     reqObj.method = 'PUT'
//     reqObj.url = BASEURI + files.EVENT + "/event"
//     reqObj.data = JSON.stringify(offer)
//     makeReq(reqObj, successCallback, erroCallback)
// }

module.exports = {
    register: register,
    login: login,
    getProfile: getProfile,
    updateProfile: updateProfile
    // getPortfolio: getPortfolio,
    // addPortfolioItem: addPortfolioItem,
    // updatePortfolioItem: updatePortfolioItem,
    // deletePortfolioItem: deletePortfolioItem,
    // getAllConversations: getAllConversations,
    // createConversation: createConversation,
    // getAllMessages: getAllMessages,
    // createMessage: createMessage,
    // makeOffer: makeOffer,
    // acceptOffer: acceptOffer,
    // denyOffer: denyOffer,
    // getAllEvents: getAllEvents,
    // getAvailableEvents: getAvailableEvents,
    // createEvent: createEvent 
}