const routes = require('express').Router();
const users = require('../controllers/users_controller');

routes.post('/users', users.create); 

module.exports = routes; 