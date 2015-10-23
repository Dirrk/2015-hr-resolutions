'use strict';

var constants = {
    server: {
        port: process.env.PORT || 3000
    },
    elsClient: {
        host: 'https://hvjryrh8:acx6zdmdzh2jl009@pine-2124490.us-east-1.bonsai.io/',
        log: 'trace'
    },
    elsEventsIndex: 'events',
    elsEventsType: 'event',
    elsDonationsIndex: 'events',
    elsDonationsType: 'donation'
};

module.exports = Object.freeze(constants);
