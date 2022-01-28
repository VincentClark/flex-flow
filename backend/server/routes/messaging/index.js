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
    router.get('/create-flow', (req, res) => {
        const messagingInfo = messaging.flexFlow();
        console.log("messagingInfo", messagingInfo)
        res.status(200).json({ 'messagingInfo': messagingInfo });
    })
    router.get('/create-whatsapp-channel', (req, res) => {
        const messagingInfo = messaging.createWhatsAppChannel();
        console.log("messagingInfo", messagingInfo)
    })
    router.post('/create-task', async (req, res) => {
        const { fromNumber, toNumber, friendlyName, message } = req.body;
        console.log('create-task');
        const task = await messaging.create_messageflow(fromNumber, toNumber, friendlyName, message);
        console.log('task', task);
        res.status(200).json({ 'message': 'create-task' });
    })
    router.post('/createTask', async (req, res) => {
        const task = messaging.createChannel();
        console.log("task", task)
        res.status(200).json({ 'task': task });
    })
    router.post('/sms-service', (req, res) => {

        try {
            const { fromNumber, toNumber, friendlyName, message, createTask, fromAgent } = req.body;
            console.log("ReqBody", req.body);
            const myMessage = async (create_task) => {
                if (create_task === 'true') {
                    const myMessage = await messaging.strategyAOutboundSMS(toNumber, fromNumber, friendlyName, message, create_task, fromAgent);
                } else {
                    const myMessage = await messaging.strategyBOutboundSMS(toNumber, fromNumber, friendlyName, message, create_task, fromAgent);
                }
            }
            const details = myMessage(createTask).
                then(message => {
                    console.log("message", message);
                    res.status(200).json({
                        'message': 'success',
                        'details': message
                    });
                }).catch(err => {
                    console.log("err", err);
                    res.status(500).json({
                        'message': 'error',
                        'details': err
                    });
                })
            console.log("details", details);


        } catch (err) {
            res.status(500).json({ message: "oops Something went wrong on router.post(/sms-service)", err });
        }
    });
    router.post('/callback', (req, res) => {
        //console.log("callback", req.body);
        res.status(200).json({ 'message': 'callback' });
    })
    router.post('/whatsapp-service', (req, res) => {
        //console.log("whatsapp-service", req.body);
        const whatsapp = messaging.whatsapp_webhook(req.body)
            .then(message => {
                console.log("message", message);
                res.status(200).send(message);
            }).catch(err => {
                console.log("err", err);
                res.status(500).send(err);
            })
    })
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