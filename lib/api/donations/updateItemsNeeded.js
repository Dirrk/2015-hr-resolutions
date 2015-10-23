'use strict';

var HoekBoom = require('hoek-boom'),
    config = require('../../config');

module.exports = function signup(request, reply) {
    var id,
        self = this,
        doc,
        itemToAdd;

    HoekBoom.assertBoom(request.params.id, 'ID is required', 'badRequest');
    HoekBoom.assertBoom(request.payload.name, 'Item name is required', 'badRequest');
    HoekBoom.assertBoom(request.payload.description, 'Item description is required', 'badRequest');
    HoekBoom.assertBoom(request.payload.quantity, 'Item quantity is required', 'badRequest');

    id = request.params.id;
    itemToAdd = request.payload;

    self.els.get({index: config.elsDonationsIndex, type: config.elsDonationsType, id: id}, function(error, resp) {
        if (error && !resp.found) {
            return reply({status: 404, message: 'Not found'});
        }
        else if (error) {
            console.error(error);
            return reply({status: 400});
        }

        doc = resp._source;
        doc.event_details.items_needed.push(itemToAdd);

        self.els.index({index: config.elsDonationsIndex, type: config.elsDonationsType, id: id, body: doc}, function (err, resp) {
            if (err) {
                console.log("error:", err);
                return reply({status: 400, message: err});
            }

            return reply({status: 200, resp: resp});
        });
    });
};
