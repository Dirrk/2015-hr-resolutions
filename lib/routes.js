'use strict';

var report = require('./api/report');

module.exports = [
    { method: 'GET', path: '/', handler: { file: function () { return 'public/index.html'; }}},
    { method: 'GET', path: '/javascript/{file?}', handler: { directory: { path: 'public/javascript/'}}},
    { method: 'POST', path: '/api/report', handler: report.createReport }
];
