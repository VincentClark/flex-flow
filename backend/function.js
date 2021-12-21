require('dotenv').config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const chatServiceSid = process.env.CHAT_SERVICE_SID;
// const proxyServiceSid = process.env.PROXY_SERVICE_SID;
const flexFlowSid = process.env.FLEX_FLOW_SID;
// //+13156602844

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
// console.log("account sid", accountSid);
client.flexApi.flexFlow.list({ limit: 20 })
    .then(flexFlow => flexFlow.forEach(f => console.log(f)))


// const flexFlow = () => client.flexApi.flexFlow;
// console.log("flex flow", flexFlow());


//console.log("flexChannels", flexChannels());


// const outboundSMS = async (flexFlowSid) => client.flexApi.channel.create(
//     {
//         channelType: 'sms',
//         chatFriendlyName: 'chatFriendlyName',
//         chatUserFriendlyName: 'chatUserFriendlyName',
//         flexFlowSid: "FO55859847e19e6152cfdf38cabe20e642",
//         identity: 'itentity'
//     }
// ).then(channel => console.log("channel sid", channel.sid))
//     .then(channel => { return JSON.stringify(channel) })
// console.log("flexChannels", outboundSMS(flexFlowSid))

// console.log("accountSid", accountSid);
// const outboundSMS = async function () {
//     console.log("outboundSMS");
//     try {
//         const channel =
//             await client.flexApi.channel
//                 .create({
//                     target: '+16268985404',
//                     identity: 'sms_18059537479',
//                     chatUserFriendlyName: 'VincentClark',
//                     chatFriendlyName: 'Chat with Vincent with your mom',
//                     flexFlowSid: flexFlowSid
//                 })
//                 .then(channel => console.log(channel))
//     } catch (err) {

//         console.log("ERROR");
//     }

//     const proxySession =
//         await client.proxy.services(proxyServiceSid)
//             .sessions
//             .create({
//                 uniqueName: `${channel.sid}`,
//                 participants: [{
//                     'identifier': `${channel.sid}`,
//                     'proxyIdentifier': '+18059537479',
//                     'friendlyName': 'Vincent'
//                 }],
//                 mode: 'message-only'
//             })
//     console.log(proxySession.sid);

//     const addCustomer =
//         await client.proxy.services(proxyServiceSid)
//             .sessions(proxySession.sid)
//             .participants
//             .create({
//                 friendlyName: 'Vincent',
//                 identifier: '+6268985404',
//             })

//     console.log(addCustomer.sid);

//     const chatAttributes =
//         await client.chat.services(chatServiceSid)
//             .channels(channel.sid)
//             .fetch()

//     console.log(chatAttributes.attributes);

//     const sendMessage =
//         await client.proxy.services(proxyServiceSid)
//             .sessions(proxySession.sid)
//             .participants(addCustomer.sid)
//             .messageInteractions
//             .create({
//                 body: 'this is a test message'
//             })
//     console.log('Message sent!');
// }

//outboundSMS();