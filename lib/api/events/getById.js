'use strict';
var HoekBoom = require('hoek-boom'),
    Boom = HoekBoom.boom,
    elasticsearch = require('elasticsearch'),
    config = require('../../config'),
    elsClient;

//setup ELS client
elsClient = new elasticsearch.Client(config.elsClient);

module.exports = function getById(request, reply) {
    var id,
        response = {};

    HoekBoom.assertBoom(request.params.id, 'ID is required', 'badRequest');

    id = request.params.id;
    elsClient.get({index: config.elsEventsIndex, type: config.elsEventsType, id: id}, function(error, resp) {

        if (error && !resp.found) {
            return reply({status: 404, message: 'Not found'});
        }
        else if (error) {
            console.error(error);
            return reply({status: 400});
        }
        response.doc = resp._source.event_details;
        response.id = id;

        reply({
            status: 200,
            resp: response
        });
    });

    //TODO: get event by id
};
