const express = require('express');
const router = express.Router();
const path = require('path');


module.exports = (params) => {
    const { messaging } = params;
    router.get('/test', async (req, res) => {
        res.send(messaging.test_messageflow());
    });
    return (router);
}