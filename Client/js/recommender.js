var math = require('mathjs');

//var placess = require('./testplaces');
var userss = require('../json/testusers');

const MEDIAN = 3;

//create matrixes and avg array

//ratings matrix of nxm rank where n is number of users and m is numper of items
//first row is always the current user's ratings
var ratingsMatrix = []
//average ratings for each item
var avg = [];
//similarities matrix
var similarities = [];

//the most similar user object
var theMostSimilarUser = {};
//the second the most similar user object
var secondTheMostSimilarUser = {};
//the most similar user's similarity coeficient
var similarityCoef = 0;
//the most similar user's similarity index
var index;
//the second the most similar user's similarity coeficient
var similarityCoef2 = 0;
//the second the most similar user's similarity index
var index2;

/*
* #region Private functions
*/

//initializes ratings matrix
var initializeRatingsMatrix = function (users, numberOfPlaces){
    users.forEach(function(users) {
        var rating = [];
        for (var index = 0; index < numberOfPlaces; index++) {
            rating.push(0);        
        }
        ratingsMatrix.push(rating);
    }, this);

    //initialize matrix
    for (var indexI = 0; indexI < users.length; indexI++) {
        var user = users[indexI];
        user.likes.forEach(function(like) {
            ratingsMatrix[indexI][like.id - 1] = like.rating;
        }, this);
        user.dislikes.forEach(function(dislike) {
            ratingsMatrix[indexI][dislike.id - 1] = dislike.rating;
        }, this);
    }
}

//calculates average ratings for each element and stores them in avg array
var calculateAvg = function (users, places) {
    for (var indexI = 0; indexI < places.length; indexI++) {
        var sum = 0;
        var num = 0;
        for (var indexJ = 0; indexJ < users.length; indexJ++) {
            var row = ratingsMatrix[indexJ];
            if (row[indexI] > 0) {
                sum = sum + row[indexI];
                num++;
            }
        }
        sum = sum / num;
        avg.push(sum);
    }
}

//calculates similarity matrix
var calculateSimilarities = function(users) {
    //create matrix
    for (var indexI = 0; indexI < users.length - 1; indexI++) {
        var row = [];
        for (var indexJ = 0; indexJ < users.length - 1; indexJ++) {
            row.push(0);        
        }
        similarities.push(row);
    }
    //calculate similarities
    for (var indexI = 0; indexI < users.length - 1; indexI++) {
        var userU = ratingsMatrix[indexI];
        for (var indexJ = indexI + 1; indexJ < users.length; indexJ++) {
            var userV = ratingsMatrix[indexJ];
            var similarity = simNHSM(userU, userV, avg);
            similarities[indexI][indexJ - 1] = similarity;
        }
    }
}

var simNHSM = function (u, v, avg){
    var jpss = simJPSS(u, v, avg);
    var urp = simURP(u, v);
    return jpss * urp;
};

var simJPSS = function (u, v, avg) {
    var pss = simPSS(u, v, avg)
    var jacard = simJaccard(u, v);
    return pss * jacard;
};

var simPSS = function (u, v, avg) {
    var sum = 0;
    for (var index = 0; index < avg.length; index++) {
        var avgp = avg[index];
        var pssValue = pss(u[index], v[index], avgp);
        sum = sum + pssValue;
    }
    return sum;
}

var pss = function (ru, rv, avgp) {
    var prox = proximity(ru, rv);
    var sign = significance(ru, rv);
    var sing = singularity(ru, rv, avgp);
    return prox * sign * sing;
}

var proximity = function (ru, rv) {
    return 1 - 1 / (1 + math.exp(-math.abs(ru - rv)));
}

var significance = function (ru, rv) {
    return 1 / (1 + math.exp(-math.abs(ru - MEDIAN) * math.abs(rv - MEDIAN)));
}

var singularity = function (ru, rv, avgp) {
    return 1 - 1 / (1 + math.exp(-math.abs((ru + rv) / 2 - avgp)));
}

var simJaccard = function (u, v) {
    var intersectionCardinality = 0;
    u.forEach(function(rating) {
        var index = contains.call(v, rating);
        if (index)
            intersectionCardinality++;
    }, this);
    var cardinalityU = 0;
    var cardinalityV = 0;
    u.forEach(function(rating) {
        if (rating > 0)
            cardinalityU++;
    }, this);
    v.forEach(function(rating) {
        if (rating > 0)
            cardinalityV++;
    }, this);
    return intersectionCardinality / cardinalityU * cardinalityV;
}

var contains = function(value) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = value !== value;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(value) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === value) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }
    return indexOf.call(this, value) > -1;
};

var simURP = function (u,v ) {
    return 1-1/(1 + math.exp(-math.abs(meanRating(u) - meanRating(v)) * math.abs(standardVariance(u) - standardVariance(v))));
};

var meanRating = function (userRatings) {
    var sum = 0;
    var cardinality = 0;
    userRatings.forEach(function(rating) {
        if(rating > 0)
            cardinality++;
    }, this);
    userRatings.forEach(function(rating) {
        sum = sum + rating/cardinality;
    }, this);
    return sum;
}
var standardVariance = function (userRatings) {
    var sum = 0;
    var cardinality = 0;
    userRatings.forEach(function(rating) {
        if(rating > 0)
            cardinality++;
        sum = sum + rating;
    }, this);
    var avgRating = sum / cardinality;
    sum = 0;
    userRatings.forEach(function(rating) {
        var square = math.square(rating - avgRating);
        sum = sum + square / cardinality;
    }, this);
    return math.sqrt(sum);
}

//*********//
var getTheMostSimilarUsers = function (users) {
    for (var i = 0; i < similarities[0].length; i++) {
        var coef = similarities[0][i];
        if(coef > similarityCoef) {
            similarityCoef2 = similarityCoef;
            secondTheMostSimilarUser = theMostSimilarUser;
            similarityCoef = coef;
            theMostSimilarUser = users[i + 1];
        }
        else if(coef > similarityCoef2) {
            similarityCoef2 = coef;
            secondTheMostSimilarUser = users[i + 1];
        }
    }
    return [theMostSimilarUser, secondTheMostSimilarUser];
}

var extractPlaces = function (users) {
    var places = [];
    users.forEach(function(user) {
        try {
            user.likes.forEach(function(like) {
                var contains = false;
                try {
                    places.forEach(function(element) {
                        if (element.id === like.id) {
                            contains = true;
                            throw {};
                        }
                    }, this);
                } catch (err) {
                    //
                }
                if (!contains)
                    places.push(like);
            }, this);
        } catch (error) {
            //
        }
    }, this);
    return places;
}

//creates recommended items array from passed users array with specified number of recommended item
var packPlaces = function (recommendations, users, numOfRecommendations) {
    var user = users[0];
    try {
        user.likes.forEach(function(like) {
        if (recommendations.length < numOfRecommendations) {
            var contains = false;
            try {
                recommendations.forEach(function(place) {
                    if (place.id == like.id) {
                        contains = true;
                        throw {};
                    }
                }, this);
            } catch (e) {
                
            }
            if (!contains)
                recommendations.push(like);
        } else
            throw {};
    }, this);
    } catch (error) {
        
    }
    if (recommendations.length < numOfRecommendations) {
        users.shift();
        if (users.length > 0)
            packPlaces(recommendations, users, numOfRecommendations);
    }
}

var updateRatings = function (recommendations, places) {
    places.forEach(function(place) {
        try {
            recommendations.forEach(function(recommendation) {
                if (recommendation.id === place.id) {
                    recommendation.rating = place.rating;
                    throw {};
                }
            }, this);
        } catch (error) {
            
        }
    }, this);
}

var decreasingSort = function (x, y) {
    if (x.rating > y.rating)
        return -1;
    else if (x.rating < y.rating)
        return 1;
    else
        return 0; 
}

/*
* #region end
*/

/*
* #region Public functions
*/

var recommend = function (users, numOfRecommendations) {
    //preparation
    var places = extractPlaces(users);
    initializeRatingsMatrix(users, places.length);
    console.log(ratingsMatrix)
    calculateAvg(users, places);
    //similarity coefficients calculation
    calculateSimilarities(users);
    //var usersToIterate = Array.from(users);
    //recommendation
    var usersToIterate = getTheMostSimilarUsers(users);
    var recommendations = [];
    packPlaces(recommendations, usersToIterate, numOfRecommendations);
    updateRatings(recommendations, places);
    return recommendations;
}

/*
* #region end
*/

var numOfRecommendations = 5;
console.log(recommend(userss, numOfRecommendations).sort(decreasingSort));

module.exports = {
    recomment: recommend
}