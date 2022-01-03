require('dotenv').config();
const path = require('path');

module.exports = {
    development: {
        sitename: "FakeStore [Development]",
        data: {
            hold: "Hold",
        },
        database: {
            hold: "Hold",
        }
    },
    account: {
        TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
        TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
        CHAT_SERVICE_SID: process.env.CHAT_SERVICE_SID,
        PROXY_SERVICE_SID: process.env.PROXY_SERVICE_SID,
        FLEX_FLOW_SID: process.env.FLEX_FLOW_SID,
        TWILIO_WORKSPACE_SID: process.env.TWILIO_WORKSPACE_SID,
        TWILIO_WORFLOW_SID: process.env.TWILIO_WORFLOW_SID,

    }
}