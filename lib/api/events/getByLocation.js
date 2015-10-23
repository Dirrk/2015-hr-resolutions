'use strict';

var HoekBoom = require('hoek-boom');

module.exports = function getByLocation(request, reply) {

    HoekBoom.assertBoom(request.query.lat && request.query.lng, 'lat/lng combo is required', 'badRequest');
    return reply('hello');
};
