require('dotenv').config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const chatServiceSid = process.env.CHAT_SERVICE_SID;
const proxyServiceSid = process.env.PROXY_SERVICE_SID;
const flexFlowSid = process.env.FLEX_FLOW_SID;
const client = require('twilio')(accountSid, authToken);

const outboundSMS = async function () {
    console.log("outboundSMS");
    const channel =
        await client.flexApi.channel
            .create({
                target: '+16268985404',
                identity: 'sms_16268985404',
                chatUserFriendlyName: 'VincentClark',
                chatFriendlyName: 'Chat with Vincent with your mom',
                flexFlowSid: flexFlowSid
            })


    console.log("Starting Proxy Session", channel);
    const proxySession =
        await client.proxy.services(proxyServiceSid)
            .sessions
            .create({
                uniqueName: `${channel.sid}`,
                participants: [{
                    'identifier': `${channel.sid}`,
                    'proxyIdentifier': '+12183187412',
                    'friendlyName': 'Vincent Clark'
                }],
                mode: 'message-only'
            })
    console.log(proxySession.sid);

    const addCustomer =
        await client.proxy.services(proxyServiceSid)
            .sessions(proxySession.sid)
            .participants
            .create({
                friendlyName: 'Vincent Thomas',
                identifier: '+16268985404',
            })

    console.log("addCustomer.sid", addCustomer.sid);

    const chatAttributes =
        await client.chat.services(chatServiceSid)
            .channels(channel.sid)
            .fetch()

    console.log(chatAttributes.attributes);

    const sendMessage =
        await client.proxy.services(proxyServiceSid)
            .sessions(proxySession.sid)
            .participants(addCustomer.sid)
            .messageInteractions
            .create({
                body: 'this is a test message'
            })
    console.log('Message sent!');
}

outboundSMS();