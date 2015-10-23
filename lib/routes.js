'use strict';

var events = require('./api/events'),
    donations = require('./api/donations');

module.exports = [
    { method: 'GET', path: '/', handler: { file: function () { return 'public/views/index.html'; }}},
    { method: 'GET', path: '/img/{file?}', handler: { directory: { path: 'public/img/'}}},
    { method: 'GET', path: '/views/{file?}', handler: { directory: { path: 'public/views/'}}},
    { method: 'GET', path: '/javascript/{file?}', handler: { directory: { path: 'public/javascript/'}}},
    { method: 'GET', path: '/css/{file?}', handler: { directory: { path: 'public/css'}}},
    { method: 'GET', path: '/api/events/id/{id?}', handler: events.getById },
    { method: 'GET', path: '/api/events/location', handler: events.getByLocation, config: { validate: events.getByLocation.validation } },
    { method: 'POST', path: '/api/events/', handler: events.createEvent },
    { method: 'POST', path: '/api/events/signup/{id?}', handler: events.signUp },
    { method: 'GET', path: '/api/donations/id/{id?}', handler: donations.getById },
    { method: 'GET', path: '/api/donations/location', handler: donations.getByLocation, config: { validate: donations.getByLocation.validation } },
    { method: 'POST', path: '/api/donations/', handler: donations.createEvent }
];
