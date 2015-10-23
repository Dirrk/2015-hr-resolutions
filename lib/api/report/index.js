'use strict';

exports.createReport = function (request, reply) {
    reply({
        status: 200,
        tracking: '000000-00000-000000000'
    });
};

//get an event by id
exports.getById = function (request, reply) {
    console.log('hit the id endpoint');
    reply({
        status: 200,
    });
    //TODO: get event by id
};

//get an event by lat/lng
exports.getByLocation = function (request, reply) {
    console.log('hit the loc endpoint');
    reply({
        status: 200,
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
