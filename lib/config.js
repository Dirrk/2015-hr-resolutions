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
    elsDonationsType: 'donation',
    daysOfTheWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

module.exports = Object.freeze(constants);
