'use strict';

// Setup hapi
var setup = require('./lib/setup');

setup(function (err) {
    if (err) {
        exit(err);
    } else {
        console.log('Setup server completed');
    }
    process.on('uncaughtException', exit);
    process.on('uncaughtRejection', exit);
    process.on('error', exit);
});


function exit(err) {
    if (err) {
        console.error(err);
    }
    process.exit(err ? 1 : 0);
}
