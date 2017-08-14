import axios from 'axios';

const BASEURI = "http://makemyday.x10host.com/";

var reqObj = {
    method: '',  
    url: "",
    responseType:'json',
    data: {}
}

var files = {
    USER: "userdb.php",
    CONVERSATION: "conversationdb.php",
    EVENT: "eventdb.php"
}

var makeReq = function(req, successCallback, errorCallback) {
    axios(req)
    .then(function(response) {
        successCallback(response)
    })
    .catch(function (error) {
        errorCallback(error);
    })
}

var register = function(data, successCallback, erroCallback) {
    reqObj.method = 'PUT'
    reqObj.url = BASEURI + files.USER
    reqObj.data = JSON.stringify(data)
    makeReq(reqObj, successCallback, erroCallback)
}

var login = function(data, successCallback, erroCallback) {
    reqObj.method = 'POST'
    reqObj.url = BASEURI + files.USER + "/login"
    reqObj.data = JSON.stringify(data)
    makeReq(reqObj, successCallback, erroCallback)
}

var getProfile = function(id, successCallback, erroCallback) {
    reqObj.method = 'GET'
    reqObj.url = BASEURI + files.USER + "/user/" + id
    makeReq(reqObj, successCallback, erroCallback)
}

var updateProfile = function(userProfile, successCallback, erroCallback) {
    reqObj.method = 'POST'
    reqObj.url = BASEURI + files.USER + "/update"
    reqObj.data = JSON.stringify(userProfile)
    console.log(reqObj)
    makeReq(reqObj, successCallback, erroCallback)
}

var getPortfolio = function(userID, successCallback, erroCallback) {

}

//add new portfolio item
var addPortfolioItem = function(portfolioItem, successCallback, erroCallback) {

}

var updatePortfolioItem = function(portfolioItem, successCallback, erroCallback) {

}

var deletePortfolioItem = function(portfolioID, successCallback, erroCallback) {

}

var getAllConversations = function(userID, successCallback, erroCallback) {
    reqObj.method = 'GET'
    reqObj.url = BASEURI + files.CONVERSATION + "/conversation/" + userID
    makeReq(reqObj, successCallback, erroCallback)
}

var createConversation = function(conversation, successCallback, erroCallback) {
    reqObj.method = 'PUT'
    reqObj.url = BASEURI + files.CONVERSATION + "/addconversation"
    reqObj.data = JSON.stringify(conversation)
    console.log(reqObj.url)
    makeReq(reqObj, successCallback, erroCallback)
}

var getAllMessages = function(conversationID, successCallback, erroCallback) {
    reqObj.method = 'GET'
    reqObj.url = BASEURI + files.CONVERSATION + "/messages/" + conversationID
    console.log(reqObj.url)
    makeReq(reqObj, successCallback, erroCallback)
}

var createMessage = function(message, successCallback, erroCallback) {
    reqObj.method = 'PUT'
    reqObj.url = BASEURI + files.CONVERSATION + "/addmessage"
    reqObj.data = JSON.stringify(message)
    console.log(reqObj.url)
    makeReq(reqObj, successCallback, erroCallback)
}

var makeOffer = function(offer, successCallback, erroCallback) {
    reqObj.method = 'PUT'
    reqObj.url = BASEURI + files.EVENT + "/offer"
    reqObj.data = JSON.stringify(offer)
    console.log(reqObj.url)
    console.log(reqObj.data)
    makeReq(reqObj, successCallback, erroCallback)
}

var acceptOffer = function(data, successCallback, erroCallback) {
    reqObj.method = 'POST'
    reqObj.url = BASEURI + files.EVENT + "/accept"
    reqObj.data = JSON.stringify(data)
    console.log(reqObj.url)
    makeReq(reqObj, successCallback, erroCallback)
}

var denyOffer = function(data, successCallback, erroCallback) {
    reqObj.method = 'POST'
    reqObj.url = BASEURI + files.EVENT + "/reject"
    reqObj.data = JSON.stringify(data)
    console.log(reqObj.url)
    makeReq(reqObj, successCallback, erroCallback)
}

var getAllEvents = function(userID, successCallback, erroCallback) {
    reqObj.method = 'GET'
    reqObj.url = BASEURI + files.EVENT + "/user/" + userID
    console.log("get all events")
    console.log(userID)
    makeReq(reqObj, successCallback, erroCallback)
}

var getAvailableEvents = function(userID, successCallback, erroCallback) {
    reqObj.method = 'GET'
    reqObj.url = BASEURI + files.EVENT + "/event"
    makeReq(reqObj, successCallback, erroCallback)
}

var createEvent = function(offer, successCallback, erroCallback) {
    reqObj.method = 'PUT'
    reqObj.url = BASEURI + files.EVENT + "/event"
    reqObj.data = JSON.stringify(offer)
    makeReq(reqObj, successCallback, erroCallback)
}

var uploadImage = function(offer, successCallback, erroCallback) {
    reqObj.method = 'PUT'
    reqObj.url = BASEURI + files.EVENT + "/event"
    reqObj.data = JSON.stringify(offer)
    makeReq(reqObj, successCallback, erroCallback)
}

module.exports = {
    register: register,
    login: login,
    getProfile: getProfile,
    updateProfile: updateProfile,
    getPortfolio: getPortfolio,
    addPortfolioItem: addPortfolioItem,
    updatePortfolioItem: updatePortfolioItem,
    deletePortfolioItem: deletePortfolioItem,
    getAllConversations: getAllConversations,
    createConversation: createConversation,
    getAllMessages: getAllMessages,
    createMessage: createMessage,
    makeOffer: makeOffer,
    acceptOffer: acceptOffer,
    denyOffer: denyOffer,
    getAllEvents: getAllEvents,
    getAvailableEvents: getAvailableEvents,
    createEvent: createEvent 
}