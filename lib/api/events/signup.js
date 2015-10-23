'use strict';

var HoekBoom = require('hoek-boom'),
    config = require('../../config');

module.exports = function signup(request, reply) {
    var id,
        volunteers,
        self = this,
        doc,
        userToAdd;

    HoekBoom.assertBoom(request.params.id, 'ID is required', 'badRequest');
    HoekBoom.assertBoom(request.payload.name, 'Name is required', 'badRequest');
    HoekBoom.assertBoom(request.payload.email, 'Email is required', 'badRequest');
    HoekBoom.assertBoom(request.payload.phone, 'Phone number is required', 'badRequest');

    id = request.params.id;
    userToAdd = request.payload;

    self.els.get({index: config.elsEventsIndex, type: config.elsEventsType, id: id}, function(error, resp) {
        if (error && !resp.found) {
            return reply({status: 404, message: 'Not found'});
        }
        else if (error) {
            console.error(error);
            return reply({status: 400});
        }

        doc = resp._source;
        volunteers = resp._source.volunteers || [];

        if (volunteers.length >= parseInt(doc.event_details.volunteers_needed.max)) {
            return reply({status: 400, message: 'This event has filled up'});
        }

        volunteers.push(userToAdd);
        doc.volunteers = volunteers;

        self.els.index({index: config.elsEventsIndex, type: config.elsEventsType, id: id, body: doc}, function (err, resp) {
            if (err) {
                console.log("error:", err);
                return reply({status: 400, message: err});
            }

            return reply({status: 200, resp: resp});
        });
    });
};
