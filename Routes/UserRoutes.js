const express = require('express');
const { getUsers } = require('../Controllers/UserController');
const Router = express.Router();

Router.route('/').get(getUsers);


module.exports = Router;