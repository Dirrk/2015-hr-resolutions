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
    var ret = {
        status: 200,
        total: response.hits.total,
        result: []
    };
    if (response.hits.total > 0) {
        response.hits.hits.forEach(function (hit) {
            var event = hit._source.event_details;
            event.id = hit._id;
            event.volunteers = (hit._source.volunteers) ?  hit._source.volunteers.length : 0;
            ret.result.push(event);
        });
    }
    return ret;
}

module.exports.validation = {
    query: {
        lat: Joi.number().required(),
        lon: Joi.number().required(),
        search: Joi.string(),
        page: Joi.number().integer().default(1)
    },
};
