'use strict';

var report = require('./api/report');

module.exports = [
    { method: 'GET', path: '/', handler: { file: function () { return 'public/views/index.html'; }}},
    { method: 'GET', path: '/views/{file?}', handler: { directory: { path: 'public/views/'}}},
    { method: 'GET', path: '/javascript/{file?}', handler: { directory: { path: 'public/javascript/'}}},
    { method: 'POST', path: '/api/report', handler: report.createReport },

    //the money maker...
    { method: 'GET', path: '/api/events/id/{id?}', handler: report.getById },
    { method: 'GET', path: '/api/events/location', handler: report.getByLocation },
    { method: 'POST', path: '/api/events/create/{id?}', handler: report.createEvent },
    { method: 'POST', path: '/api/events/signup/{id?}', handler: report.signup }
];
