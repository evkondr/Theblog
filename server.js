'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./src/routes');
const mongoose = require('mongoose');
const DB = require('./src/db/connection');
const AuthBearer = require('hapi-auth-bearer-token');
const adminAuth=require('./src/auth/adminAuth')

require('dotenv').config()

const server = Hapi.server({
    port: process.env.PORT || "3000",
    host: process.env.LOCALHOST || 'localhost'
});

//routes 
server.route(routes);

const init = async () => {
    await server.register([AuthBearer])
    //Auth strategy
    server.auth.strategy('admin', 'bearer-access-token',adminAuth)
    server.auth.default('admin');
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();