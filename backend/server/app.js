const express = require('express');
const path = require('path');
const createError = require('http-errors');

const twilio = require('twilio');
const { urlencoded } = require('body-parser');
const MessagingService = require('./services/MessagingService');
const routes = require('./routes');

module.exports = (config) => {
    const messaging = new MessagingService(config.account);
    const app = express();
    app.use('/', routes({ messaging }));
    app.use(urlencoded({ extended: false }));
    //functions to create
    app.use((err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        console.log(JSON.stringify(req.headers));
        const reqHeaders = JSON.stringify(req.headers);
        if (reqHeaders.indexOf("boundary") > -1) {
            console.log("boundary");
        } else {
            console.log("no boundry");
        }
        console.log('error', err);
        res.status(500).json({ message: "oops Something went wrong on app.use(..) [app.js]", err });
    });
    app.use((req, res, next) => {
        next(createError(404));
    });
    //test
    app.get('/test', (req, res) => {
        res.status(200).send("messaging.test_messageflow()");
    })
    return app;
}