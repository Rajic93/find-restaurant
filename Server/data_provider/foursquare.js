
var CONFIG = {
  secrets : {
    clientId : 'AA45VB1PIN41K0HUKPXER2JYGKE2XWET43WBEQU1OISJ35R0',
    clientSecret : '5DBZPWT30CHEK1ONI3PPHNJC02BXJAFA2YGY3FVXQIIJLK4P',
    redirectUrl : 'http://localhost:8000/'
  }
}

var BASEURI = 'https://api.foursquare.com/v2/';
//------------------------------------------------
var PARAMSTEMPLATE = 'venues/search?ll=40.7,-74&radius=8&limit=2&categoryId=4d4b7105d754a06374d81259'
//------------------------------------------------

var FOODID = '4d4b7105d754a06374d81259'

var foursquare = require('node-foursquare')(CONFIG);

var getNearbyPlaces = function (lat, lng, radius, callback) {
    foursquare.Venues.search(lat, lng, null, {radius: radius, limit: 50, categodyId: FOODID}, null, function(err, response) {
        var responseData = parsePlaces(response.venues);
        callback(responseData);
    });   
};

var parsePlaces = function (placesArray) {
    var places = [];
    console.log(placesArray)
    placesArray.forEach(function(place) {
        var placeObj = {
            id: place.id,
            name: place.name,
            contact: place.contact,
            location: {
                formattedAddress: (Object.prototype.hasOwnProperty.call(place.location, "formattedAddress")) ? place.location.formattedAddress : null,
                distance: (Object.prototype.hasOwnProperty.call(place.location, "distance")) ? place.location.distance : null,
                lat: (Object.prototype.hasOwnProperty.call(place.location, "lat")) ? place.location.lat : null,
                lng: (Object.prototype.hasOwnProperty.call(place.location, "lng")) ? place.location.lng : null,
            },
            verified: place.verified,
            hours: (Object.prototype.hasOwnProperty.call(place, "hours")) ? place.hours : null,
            url: (Object.prototype.hasOwnProperty.call(place, "url")) ? place.url : null,
            menu: (Object.prototype.hasOwnProperty.call(place, "menu")) ? place.menu : null,
            price: (Object.prototype.hasOwnProperty.call(place, "price")) ? place.price : null,
            rating: (Object.prototype.hasOwnProperty.call(place, "rating")) ? place.rating : null,
            description: (Object.prototype.hasOwnProperty.call(place, "description")) ? place.description : null,
            tips: place.tips,
            photos: place.photos,
            categories: []
        };
        place.categories.forEach(function(category) {
            placeObj.categories.push({
                id: category.id,
                name: category.name
            });
        }, this);
        places.push(placeObj);
    }, this);
    return places;
}

module.exports = {
    getNearbyPlaces: getNearbyPlaces
}