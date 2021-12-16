const express = require('express');
const router = express.Router();
const messagingRoute = require('./messaging');
module.exports = (params) => {
    router.use('/messaging', messagingRoute(params));
    return (router);
}