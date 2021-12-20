const twilio = require('twilio');



class MessagingService {
    //create init function
    constructor(config) {
        this.account_sid = config.TWILIO_ACCOUNT_SID;
        this.auth_token = config.TWILIO_AUTH_TOKEN;
        this.client = new twilio(this.account_sid, this.auth_token);
    }
    createChannel(flexFlowSid) {
        this.client.flexApi.channel
            .create({
                flexFlowSid: flexFlowSid,
                identity: 'itentity',
                chatUserFriendlyName: 'chatUserFriendlyName',

            })
            .then(channel => console.log(channel.sid))
            .then(channel => { return channel.sid }
            )

    }
    test_messageflow() {
        console.log(this.client)
        return `channel sid ${this.create_messageflow(0)}`;
    }
}

module.exports = MessagingService