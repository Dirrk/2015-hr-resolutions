'use strict';

var Hapi = require('hapi'),
    config = require('./config'),
    elasticsearch = require('elasticsearch'),
    config = require('./config'),
    elsClient;

elsClient = new elasticsearch.Client(config.elsClient);

module.exports = function (next) {
    var server = new Hapi.Server();

    server.connection(config.server);
    server.bind({
        els: elsClient
    });
    server.start(function (err) {
        if (err) {
            return next(err);
        }
        console.log('Server listening on ', server.info.uri);
        setupRoutes(server, next);
    });
};

function setupRoutes(server, next) {
    var routes = require('./routes');

    routes.forEach(function (route) {
        server.route(route);
    });
    next();
}
