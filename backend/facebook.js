require('dotenv').config();

TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER
CHAT_SERVICE_SID = process.env.CHAT_SERVICE_SID
PROXY_SERVICE_SID = process.env.PROXY_SERVICE_SID
FLEX_FLOW_SID_ = process.env.FLEX_FLOW_SID_A
FLEX_FLOW_SID_B = process.env.FLEX_FLOW_SID_B
TWILIO_WORKSPACE_SID = process.env.TWILIO_WORKSPACE_SID
TWILIO_WORFLOW_SID = process.env.TWILIO_WORFLOW_SID
console.log(TWILIO_ACCOUNT_SID)
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const createFacebookAppChannel = async function () {
    const flexFlowSid = FLEX_FLOW_SID_B;
    const channel = await client.flexApi.flexFlow.create({
        channelType: "facebook",
        enabled: true,
        janitorEnabled: true,
        integrationType: "studio",
        contactIdentity: "messanger:2226028431058750",
        identity: "+14153389812",
        friendlyName: "Facebook Messanger Flow",
        "integration.flowSid": "FW97ae06f848fcdead3b95bae616242fed",
        chatServiceSid: "IS597deeeb66804aea8b33f23aed221bdc"
    })
        .then(channel => {
            console.log("channel", channel);
            this.channel_sid = channel.sid;
            return (channel.sid);
        }).catch(err => {
            console.log("ERROR", err)
        })
}

createWhatsAppChannel();

