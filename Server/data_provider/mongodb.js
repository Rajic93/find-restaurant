var mongoose = require('mongoose');
var STATUS_CODES = require('./status_codes');
var OPERATION_RESULT = require('./operation_result');

var SERVER = 'mongodb://localhost:27017/';
var DATABASE = 'users';

var path = SERVER + DATABASE;
mongoose.connect(path, (err) => {
    //console.log("mongodb.js: connection error: " + err)
});

var schema = mongoose.Schema;

var userSchema = new schema({
    email: {type: String, required: false},
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    age: {type: Number, required: false},
    nationality: {type: String, required: false},
    country: {type: String, required: false},
    region: {type: String, required: false},
    city: {type: String, required: false},
    affinities: [{
            affinity: {type: String, required: false}
        }],
    profession: {type: String, required: false},
    budget: {type: Number, required: false},
    alergies: [{
            alergy: {type: String, required: false}
        }],
    photo: {type: String, required: false},
    likes: [{
        id: {type: Number, required: false},
        rating: {type: Number, required: false}
    }],
    dislikes: [{
        id: {type: Number, required: false},
        rating: {type: Number, required: false}
    }]
}, {collection: 'users'});

var userDataModel = mongoose.model('User', userSchema);

//radi
var createUser = function (user, callback) {
    //console.log("mongodb.js: create user func start")
    userDataModel.find((err, doc) => {
        if(err) //server error
            callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.UNSUCCESSFULL_REGISTER_OR_LOGIN, err));
        else if(doc.length != 0) //existing user
            callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.UNSUCCESSFULL_REGISTER_OR_LOGIN, "User already exists."));
        else {
            var data = new userDataModel(user);
            //console.log("mongodb.js: data object created\n"+data)
            data.save((err, doc) => {
                //console.log("mongodb.js: save callback")
                if (!err)
                    callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.SUCCESSFULL_REGISTER_OR_LOGIN, doc._id));
                else
                    callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.UNSUCCESSFULL_REGISTER_OR_LOGIN, err));
            });
        }
    }).where('email').equals(user.email).exec();
    
}

//radi 
var getUserId = function (email, password, callback) {
    //console.log("mongodb.js: get user id func start")
    userDataModel.findOne().where('email').equals(email).then((doc) => {
    //console.log("mongodb.js: get user id func callback")
    if(doc.length != 0) 
        callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.SUCCESSFULL_SEARCH, doc._id));
    else
        callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.NO_RESULTS_FOUND, 0));
    });
}

//radi
var   getUserById = function (id, callback) {
    //console.log("mongodb.js: get user by id func start. ID provided: " + id)
    userDataModel.findById(id, (err, doc) => {
        //console.log("mongodb.js: get user by id callback. Document found:\n" + doc + "\nError: " + err)
        if(!err) 
            callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.SUCCESSFULL_SEARCH, doc));
        else
            callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.NO_RESULTS_FOUND, 0));
    });
}

//radi
var getUsersByParameters = function (id, country, region, city, age, affinities, callback) {
    userDataModel.find()
    .where('country').equals(country)
    .where('region').equals(region)
    .where('city').equals(city).exec((err, data) => {
    if (data.length <= 20) {
        var usersData = [];
        data.forEach(function(userData) {
            var id1 = userData.id.toString()
            var id2 = id.toString();
            if(id1 !== id2)
                usersData.push(userData);
        }, this);
        callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.SUCCESSFULL_SEARCH, usersData));
    } else {
        var refinedSearch = [];
        data.forEach(function(user) {
            if(user.id !== id && (user.age <= ag + 10 || user.age >= age - 10))
                refinedSearch.push(user);
        }, this);
        if (refinedSearch.length <= 20)
            callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.SUCCESSFULL_SEARCH, users));
        else {
            var moreRefinedSearch = [];
            refinedSearch.forEach(function(user) {
                if (user.id !== id) {
                    var similar = false;
                    try {
                        user.affinities.forEach(function(affinity) {
                            affinities.forEach(function(item) {
                                if (affinity.affinity == item) {
                                    similar = true;
                                    throw {};
                                }
                            }, this);
                        }, this);
                    } catch (e) {
                        
                    }
                    if (similar)
                        moreRefinedSearch.push(user);
                }
            }, this);
            callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.SUCCESSFULL_SEARCH, moreRefinedSearch));
        }
    }});
}

/*
*
*/
var updateUserProfile = function (userProfile, callback) {
    userDataModel.findById(userProfile._id, (error, doc) => {
        //console.log("mongodb.js: update's find by id callback")
        if (error) {
            callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.UNSUCCESS_UPDATE, error));
        } else {
            //set attributes
            doc.email = userProfile.email;
            doc.firstName = userProfile.firstName;
            doc.lastName = userProfile.lastName;
            doc.age = userProfile.age;
            doc.nationality = userProfile.nationality;
            doc.country = userProfile.country;
            doc.region = userProfile.region;
            doc.city = userProfile.city;
            doc.affinities = userProfile.affinities;
            doc.profession = userProfile.profession;
            doc.budget = userProfile.budget;
            doc.alergies = userProfile.alergies;
            doc.photo = userProfile.photo;
            doc.likes = userProfile.likes;
            doc.dislikes = userProfile.dislikes;
            //console.log(doc)
            doc.save((err, updatedDoc) => {
                //--------------------------------------------------
                //console.log("mongodb.js: update's save callback")
                //console.log(updatedDoc)
                //console.log(err)
                //--------------------------------------------------
                if (!err)
                    callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.SUCCESS_UPDATE, 1));
                else
                    callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.UNSUCCESS_UPDATE, err));
            });
        }
    })
}

/*
* Delete user with the specified ID
*/
var deleteUserProfile = function (id, callback) {
    var res = userDataModel.findByIdAndRemove(id, (err, res) => {
        if (!err)
            callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.SUCCESS_DELETE, id));
        else
            callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.UNSUCCESS_DELETE, err));
    }).exec();
}

/*
* Get liked places of an user with specified ID 
*/
var getPlaces = function(id, callback) {
    userDataModel.findById(id, (err, doc) => {
        //console.log("mongodb.js: get user by id callback. Document found:\n" + doc + "\nError: " + err)
        if(!err) 
            callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.SUCCESSFULL_SEARCH, doc.likes));
        else
            callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.NO_RESULTS_FOUND, 0));
    });
}

var saveAsLike = function (id, placeId, rating, callback) {
    userDataModel.findById(id, (err, res) => {
        if(err)
            callback(err) //notify that there is an error
        else {
            console.log(res);
            res.likes.push({
                id: placeId,
                rating: rating
            });
            res.save((saveErr, res) => {
                if (!saveErr)
                    callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.SUCCESS_UPDATE, 1));
                else
                    callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.UNSUCCESS_UPDATE, err));
            });
            console.log(res);
        }
    });
}

var saveAsDislike = function (id, placeId, rating, callback) {
    userDataModel.findById(id, (err, res) => {
        if(err)
            callback(err) //notify that there is an error
        else {
            console.log(res);
            res.dislikes.push({
                id: placeId,
                rating: rating
            });
            res.save((saveErr, res) => {
                if (!saveErr)
                    callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.SUCCESS_UPDATE, 1));
                else
                    callback(OPERATION_RESULT.createResponseObject(STATUS_CODES.UNSUCCESS_UPDATE, err));
            });
            console.log(res);
        }
    });
}

module.exports = {
    createUser: createUser,
    getUserId: getUserId,
    getUserById: getUserById,
    getUsersByParameters: getUsersByParameters,
    updateUserProfile: updateUserProfile,
    deleteUserProfile: deleteUserProfile,
    getPlaces: getPlaces,
    saveAsLike: saveAsLike,
    saveAsDislike: saveAsDislike
}