const express = require('express');
const router = express.Router();
const path = require('path');
const cors = require('cors');



module.exports = (params) => {
    //console.log(params)
    const corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200
    }
    router.use(cors(corsOptions));
    const { urlencoded } = require('body-parser');
    router.use(urlencoded({ extended: true }));
    const { messaging } = params;

    const client = messaging.client;
    router.get('/channelcheck', (req, res) => {
        const messagingInfo = messaging.getChattAttributes();
        console.log("messagingInfo", messagingInfo)
        res.status(200).json({ 'messagingInfo': messagingInfo });
    })

    router.post('/createTask', async (req, res) => {
        const task = messaging.createTask();
        console.log("task", task)
        res.status(200).json({ 'task': task });
    })
    router.post('/sms-service', (req, res) => {

        try {
            const { fromNumber, toNumber, friendlyName, message, createTask, fromAgent } = req.body;
            console.log("ReqBody", req.body);
            if (createTask === 'true') {
                const myMessage = messaging.strategyAOutboundSMS(toNumber, fromNumber, friendlyName, message, createTask, fromAgent);
            } else {
                const myMessage = messaging.strategyBOutboundSMS(toNumber, fromNumber, friendlyName, message, createTask, fromAgent);
            }
            res.status(200).json({
                message: "SMS-Sent",
                details: "myMessage"
            });
        } catch (err) {
            res.status(500).json({ message: "oops Something went wrong on router.post(/sms-service)", err });
        }
    });
    router.post('/sms', async (req, res) => {
        console.log("BODY", req.body);
        const twiml = new MessagingResponse();
        const message = client.incomingPhoneNumbers(req.body.From);
        console.log("MESSAGE", message);

        twiml.message('The Robots are coming! Head for the hills!');

        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    });
    router.post('/sms-callback', async (req, res) => {
        console.log("BODY", req.body);
    });
    return (router);
}