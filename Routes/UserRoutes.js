const express = require('express');
const { getUsers, create } = require('../Controllers/UserController');
const Router = express.Router();

Router.route('/').get(getUsers);
Router.route('/create').post(create);

module.exports = Router;