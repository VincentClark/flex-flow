const express = require('express');
const path = require('path');
const createError = require('http-errors');

const twilio = require('twilio');
const { urlencoded } = require('body-parser');
const { json } = require('body-parser');
const MessagingService = require('./services/MessagingService');
const routes = require('./routes');

module.exports = (config) => {
    const messaging = new MessagingService(config.account);
    const app = express();
    app.use('/', routes({ messaging }));
    //app.use(urlencoded({ extended: false }));
    //app.use(urlencoded({ extended: true }));
    //  app.use(urlencoded({ extended: true }));

    //app.use(json());
    //     app.use(bodyParser.json()); // support json encoded bodies
    // app.use(bodyParser.urlencoded({ extended: true })); 
    //functions to create
    app.use((err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // console.log(JSON.stringify(req.headers));
        //const reqHeaders = JSON.stringify(req.headers);
        if (reqHeaders.indexOf("boundary") > -1) {
            console.log("boundary");
        } else {
            console.log("no boundry");
        }
        console.log('error', err);
        res.status(500).json({ message: "oops Something went wrong on app.use(..) [app.js]", err });
    });
    // app.use(express.json);
    app.use((req, res, next) => {
        next(createError(404));
    });

    return app;
}