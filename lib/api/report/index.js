'use strict';
var HoekBoom = require('hoek-boom'),
    Boom = HoekBoom.boom,
    elasticsearch = require('elasticsearch'),
    config = require('../../config'),
    elsClient;

//setup ELS client
elsClient = new elasticsearch.Client(config.elsClient);

exports.createReport = function (request, reply) {
    reply({
        status: 200,
        tracking: '000000-00000-000000000'
    });
};

//get an event by lat/lng
exports.getByLocation = function (request, reply) {
    var lat,
        lng;

    HoekBoom.assertBoom(request.query.lat && request.query.lng, 'lat/lng combo is required', 'badRequest');

    lat = request.query.lat;
    lng = request.query.lng;

    reply({
        status: 200,
        lat: lat,
        lng: lng
    });
    //TODO: get event by lat/lng
};

//get an event by name/description
exports.getByName = function (request, reply) {
    var searchString;

    HoekBoom.assertBoom(request.query.search, 'search string is required', 'badRequest');

    searchString = request.query.search;

    reply({
        status: 200,
        searchString: searchString
    });
    //TODO: get event by lat/lng
};

//create an event
exports.createEvent = function (request, reply) {
    console.log('hit the create endpoint');
    reply({
        status: 200,
    });
    //TODO: create event
};

//signup for an event
exports.signup = function (request, reply) {
    console.log('hit the signup endpoint');
    reply({
        status: 200,
    });
    //TODO: signup for event
};
