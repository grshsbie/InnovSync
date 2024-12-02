const express = require('express');
const router = express.Router();


const routes = require('../config/routesConfig');
const registerRoutes = require('../config/registerRoutesConfig');
registerRoutes(router, routes);

module.exports = router;
