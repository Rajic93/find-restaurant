var express = require('express');
var router = express.Router();
var dataProvider = require('../data_provider/data_provider');

//get nearby places - not working with uknown number of parameters
router.get('/:lat/:lng/:radius', function (req, res, next) {
    dataProvider.getNearbyPlaces(req.params.lat, req.params.lng, req.params.radius, res);
});

//get places from similar user
router.get('/:id', function (req, res, next) {
    dataProvider.getPlacesById(req.params.id, res);
});

//there is no endpoint for this since users still can't rate place with number but it is calculated in the four square system
//based on the rating server will save it to liked or disliked places with the rating
router.put('/rate', function (req, res, next) {
    dataProvider.rate(req.params.id, req.params.placeId, req.params.rating, res);
});

//just like without rating
router.put('/like', function (req, res, next) {
    dataProvider.like(req.params.id, req.params.placeId, res);
});

//just dislike without rating
router.put('/dislike', function (req, res, next) {
    dataProvider.dislike(req.params.id, req.params.placeId, res);
});

module.exports = router;