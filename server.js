'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./src/routes');
const mongoose = require('mongoose');
const DB = require('./src/db/connection');



require('dotenv').config()

const server = Hapi.server({
    port: process.env.PORT || "3000",
    host: process.env.LOCALHOST || 'localhost'
});

//routes 
server.route(routes);

const init = async () => {
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();