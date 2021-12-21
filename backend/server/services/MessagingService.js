const twilio = require('twilio');

// customers name
// message sending
// message receiving

class MessagingService {
    //create init function
    constructor(config) {
        this.account_sid = config.TWILIO_ACCOUNT_SID;
        this.auth_token = config.TWILIO_AUTH_TOKEN;
        this.client = new twilio(this.account_sid, this.auth_token);
    }
    async createChannel(flexFlowSid = "FW52e45e3cf1dc35b681b2e0ff8d0c97c3", channelType = "sms", chatUserFriendlyName = "chatUserFriendlyName") {
        await this.client.flexApi.channel
            .create({
                flexFlowSid: flexFlowSid,
                identity: 'itentity',
                chatUserFriendlyName: chatUserFriendlyName,
                channelType: channelType,
                chatFriendlyName: 'chatFriendlyName'
            })
            .then(channel => console.log(channel.sid))
            .then(channel => { return JSON.stringify(channel) }
            )

    }
    test_messageflow() {
        console.log(this.client)
        return `channel sid ${this.create_messageflow(0)}`;
    }
}

module.exports = MessagingService