


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.flexApi.flexFlow
    .create({
        contactIdentity: '+12XXXXXXXXX',
        enabled: false,
        integrationType: 'task',
        'integration.workflowSid': 'WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'integration.workspaceSid': 'WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'integration.channel': 'TCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        friendlyName: 'Outbound SMS',
        chatServiceSid: 'ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNone',
        channelType: 'sms'
    })
    .then(flex_flow => console.log(flex_flow.sid));