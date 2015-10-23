'use strict';

var events = require('./api/events');

module.exports = [
    { method: 'GET', path: '/', handler: { file: function () { return 'public/views/index.html'; }}},
    { method: 'GET', path: '/views/{file?}', handler: { directory: { path: 'public/views/'}}},
    { method: 'GET', path: '/javascript/{file?}', handler: { directory: { path: 'public/javascript/'}}},
    { method: 'GET', path: '/css/{file?}', handler: { directory: { path: 'public/css'}}}

    //the money maker...
    { method: 'GET', path: '/api/events/id/{id?}', handler: events.getById },
    { method: 'GET', path: '/api/events/location', handler: events.getByLocation },
    { method: 'POST', path: '/api/events/', handler: events.createEvent },
    { method: 'POST', path: '/api/events/signup/{id?}', handler: events.signUp }
];
