'use strict';
var HoekBoom = require('hoek-boom'),
    Boom = HoekBoom.boom;

exports.createReport = function (request, reply) {
    reply({
        status: 200,
        tracking: '000000-00000-000000000'
    });
};

//get an event by id
exports.getById = function (request, reply) {
    var id;

    HoekBoom.assertBoom(request.params.id, 'ID is required', 'badRequest');

    id = request.params.id;

    reply({
        status: 200,
        id: id
    });
    //TODO: get event by id
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
