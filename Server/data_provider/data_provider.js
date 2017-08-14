var foursquare = require('./foursquare');
var mongodb = require('./mongodb');

var writeHead = function (res, status) {
    console.log("data_provider.js: writeHead function start")
    if (status < 0)
        //res.writeHead(300, "Server error: see response body for more details.");
        res.set("Status", 300)
    else
        //res.writeHead(200, "OK");
        res.set("Status", 200)
    console.log("data_provider.js: status set")
}

var asyncResponse = function (res, responseData) {
    console.log("data_provider.js: asyncResponse function start")
    writeHead(res, responseData.statusCode);
    res.send(responseData)
    console.log("data_provider.js: response sent")
}

//general

var rate = function (id, placeId, rating, res) {
    if (rating > 2.5)
        mongodb.saveAsLike(id, placeId, rating, (responseData) => {
            asyncResponse(res, responseData);
            //foursquareLike(id, placeId);
        });
    else
        mongodb.saveAsDislike(id, placeId, rating, (responseData) => {
            asyncResponse(res, responseData);
            //foursquareDislike(id, placeId);
        });
}

/*
*
* For future use - it is not exported
*
*/
/*-------------------------------------------*/
var like = function (id, placeId, res) {
    res.send("like place")
}

var dislike = function (id, placeId, res) {
    res.send("dislike place")
}
/*-------------------------------------------*/

//foursquare

var getNearbyPlaces = function (lat, lng, radius, res) {
    foursquare.getNearbyPlaces(lat, lng, radius, (responseData) => {
        res.send(responseData)
    })
}

/*
*
* for future use
*
*/
/*-------------------------------------------*/
var foursquareLike = function (id, placeId) {
    
}

var foursquareDislike = function (id, placeId) {
    
}
/*-------------------------------------------*/

//mongodb

var register = function (userData, res) {
    
    var responseData = mongodb.createUser(userData, responseData => {
        console.log("register callback function - response data: " + responseData)
        asyncResponse(res, responseData)
    });
}

var login = function (email, password, res) {
    mongodb.getUserId(email, password, (responseData) => {
        asyncResponse(res, responseData);
    })
}

var getUserProfile = function (id, res) {
    mongodb.getUserById(id, (responseData) => {
        asyncResponse(res, responseData);
    })
}
//pack users so the one with specified id is the first
var getUsersByParameters = function (id, country, region, city, res) {
    mongodb.getUserById(id, (responseUser) => {
        if (responseUser.statusCode < 0)
            asyncResponse(res, responseUser);
        else {
            var affinities = responseUser.affinities;
            var age = responseUser.age;
            mongodb.getUsersByParameters(id, country, region, city, age, affinities, (response) => {
                console.log(response)
                if (response.statusCode > 0)
                    //console.log(response.repsonseData);
                    response.repsonseData.unshift(responseUser);
                asyncResponse(res, response);
            })
        }
    })
}

var updateUserProfile = function (userProfile, res) {
    mongodb.updateUserProfile(userProfile, (responseData) => {
        asyncResponse(res, responseData);
    })
}

var deleteUserProfile = function (id, res) {
    var responseData = mongodb.deleteUserProfile(id, (responseData) => {
        asyncResponse(res, responseData);
    })
}

var getPlacesById = function (id, res) {
    var responseData = mongodb.getPlaces(id, (responseData) => {
        asyncResponse(res, responseData);
    })
}

module.exports = {
    rate: rate,
    //foursquare functions
    getNearbyPlaces: getNearbyPlaces,
    //mongodb functions
    register: register,
    login: login,
    getUserProfile: getUserProfile,
    getUsersByParameters: getUsersByParameters,
    updateUserProfile: updateUserProfile,
    deleteUserProfile: deleteUserProfile,
    getPlacesById: getPlacesById
}