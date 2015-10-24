'use strict';

var HoekBoom = require('hoek-boom'),
    config = require('../../config'),
    uuid = require('node-uuid'),
    geocoderProvider = 'google',
    httpAdapter = 'https',
    extra = {
        apiKey: 'AIzaSyAe_iyH8fsx7otLtQPF210LL7A00hWxDDw',
        formatter: null
    },
    geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

module.exports = function createDonation(request, reply) {
    var doc = { event_details: {} },
        response = {},
        input,
        self = this;

        input = request.payload;

        geocoder.geocode({address: input.address, zipcode: input.zip, country: 'US'}, function(err, res) {
            doc.event_details.name = input.name;
            doc.event_details.website = input.website;
            doc.event_details.description = input.description;
            doc.event_details.id = uuid.v4();
            doc.event_details.img_url = input.img_url;
            doc.event_details.location = {
                address: input.address,
                address2: input.address2,
                city: input.city,
                state: input.state,
                zip: input.zip,
                geo: {
                    lat: res[0].latitude,
                    lon: res[0].longitude
                }
            };
            doc.event_details.contact = {
                name: input.contact_name,
                phone: input.phone,
                email: input.email
            };
            doc.event_details.items_needed = input.items_needed;
            doc.event_details.date_start = input.date_start;
            doc.event_details.date_end = input.date_end;

            self.els.index({index: config.elsDonationsIndex, type: config.elsDonationsType, id: doc.event_details.id, body: doc}, function (err, resp) {
                if (err) {
                    console.log("error:", err);
                    return reply({status: 400, message: err});
                }

                return reply({status: 200, resp: resp});
            })
        });
};
