'use strict';
var HoekBoom = require('hoek-boom'),
    config = require('../../config'),
    title = require('to-title-case');

module.exports = function getById(request, reply) {
    var id,
        response = {},
        doc,
        fullDate,
        date,
        day,
        month,
        hour,
        minute;

    HoekBoom.assertBoom(request.params.id, 'ID is required', 'badRequest');

    id = request.params.id;
    this.els.get({index: config.elsEventsIndex, type: config.elsEventsType, id: id}, function(error, resp) {

        if (error && !resp.found) {
            return reply({status: 404, message: 'Not found'});
        }
        else if (error) {
            console.error(error);
            return reply({status: 400});
        }
        doc = resp._source.event_details;
        response.id = id;

        fullDate = new Date(doc.date_start);
        month = fullDate.getMonth();
        day = fullDate.getDay();
        date = fullDate.getDate();
        hour = fullDate.getHours();
        minute = fullDate.getMinutes();

        response.name = title(doc.name);
        response.description = doc.description;
        response.img_url = doc.img_url;
        response.when = config.daysOfTheWeek[day] + ', ' + config.months[month] + ' ' + date + ' at ' + hour + ':' + (minute < 10 ? '0' : '') + minute;
        response.where = {
            address: title(doc.location.address),
            location: title(doc.location.city) + ', ' + doc.location.state.toUpperCase()
        };
        response.website = doc.website;
        response.volunteers = doc.volunteers_needed;
        response.volunteers.signed_up = 0;
        response.contact = doc.contact;

        if (resp._source.volunteers) {
            response.volunteers.signed_up = resp._source.volunteers.length;
        }

        reply({
            status: 200,
            resp: response
        });
    });
};
