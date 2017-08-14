var express = require('express');
var router = express.Router();
var data_provider = require('../data_provider/data_provider');

router.post('/register', function (req, res, next) {
  data_provider.register(req.body, res);
});

router.post('/login', function (req, res, next) {
  data_provider.login(req.body.email, req.body.password, res); 
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  data_provider.getUserProfile(id, res);
});

router.get('/:id/:country/:region/:city', function(req, res, next) {
  var id = req.params.id;
  var country = req.params.country;
  var region = req.params.region;
  var city = req.params.city;
  data_provider.getUsersByParameters(id, country, region, city, res);
});

router.put('/update', function(req, res, next){
  data_provider.updateUserProfile(req.body, res);
});

router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  data_provider.deleteUserProfile(id, res);
});

module.exports = router;
