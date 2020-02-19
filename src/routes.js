const handlers=require('./heandlers');
const Joi = require('@hapi/joi');
const userValidator=require('./userValidation');
module.exports=[{
    method: 'GET',
    path: '/',
    handler: handlers.main
},
{
    method: 'POST',
    path: '/register',
    handler: handlers.register,
    options:{
        validate:{
            payload: userValidator
        }
    }
},
{
    method: 'POST',
    path: '/login',
    handler: handlers.login
},
{
    method: 'GET',
    path: '/users',
    handler: handlers.users
},
{
    method: 'GET',
    path: '/administrator',
    handler: handlers.administrator
}]