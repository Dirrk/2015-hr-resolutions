'use strict';

var HoekBoom = require('hoek-boom'),
    Joi = require('joi');

module.exports = function getByLocation(request, reply) {

    var body,
        startAt = 0;

    HoekBoom.assertBoom(request.query.lat && request.query.lon, 'lat/lng combo is required', 'badRequest');

    body = {
        sort: [
            {
                _geo_distance: {
                    'event_details.location.geo': [request.query.lat, -request.query.lon],
                    order: 'asc',
                    unit: 'km'
                }
            }
        ]
    };

    if (request.query.page) {
        startAt = (request.query.page - 1) * 10;
    }

    if (request.query.search) {
        body.query = {
            multi_match: {
                query: request.query.search,
                fields: ['event_details.name', 'event_details.description', 'event_details.location.city']
            }
        };
    }

    this.els.search(
        {
            index: 'events',
            type: 'event',
            size: 10,
            from: startAt,
            analyzeWildcard: true,
            body: body
        }, function (err, resp) {
            if (err) {
                return reply({ status: 400, message: err.stack });
            }
            return reply(cleanResponse(resp));
        });
};


function cleanResponse(response) {
    return response;
}

module.exports.validation = {
    query: {
        lat: Joi.number().required(),
        lon: Joi.number().required(),
        search: Joi.string(),
        page: Joi.number().integer().default(1)
    },
};
