'use strict';

const Hapi = require('@hapi/hapi')
const routes=require('./src/routes')

require('dotenv').config()

const server = Hapi.server({
    port: process.env.PORT || "3000",
    host: process.env.LOCALHOST || 'localhost'
});

//routes
server.route([{
    method: 'GET',
    path: '/',
    handler: routes.main
},
{
    method: 'POST',
    path: '/register',
    handler: routes.register
},
{
    method: 'POST',
    path: '/login',
    handler: routes.login
}]);
const init = async () => {

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();