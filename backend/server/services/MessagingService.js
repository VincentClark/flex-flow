const twilio = require('twilio');

// customers name
// message sending
// message receiving

class MessagingService {
    //create init function
    constructor(config) {
        this.account_sid = config.TWILIO_ACCOUNT_SID;
        this.auth_token = config.TWILIO_AUTH_TOKEN;

        this.chat_service_sid = config.CHAT_SERVICE_SID;
        this.proxy_service_sid = config.PROXY_SERVICE_SID;
        this.flex_flow_sid = config.FLEX_FLOW_SID;
        this.twilio_phone_number = config.TWILIO_PHONE_NUMBER;
        this.workspace_sid = config.TWILIO_WORKSPACE_SID;
        this.workflow_sid = config.TWILIO_WORFLOW_SID;
        this.channel_sid = "";
        this.task_sid = "";
        this.client = new twilio(this.account_sid, this.auth_token, this.workspace_sid, this.workflow_sid);
        console.log(config);
    }
    async createTask() {
        const taskSid = await this.client.taskrouter.workspaces(this.workspace_sid).tasks.create({
            workflowSid: this.workflow_sid,
            attributes: JSON.stringify({
                '1': '1',
            })
        }).then(taskSid => {
            console.log(taskSid);
            return (taskSid);
        }
        );
    }
    async outboundSMS(toNumber = "+16268985404", fromNumber = this.twilio_phone_number, friendlyName = "Valued Customer", message = "Hello World", taskcreated = false, taskSid = "") {

        const flexFlowSid = this.flex_flow_sid;
        console.log("FLEX_FLOW_SID", this.flex_flow_sid)
        // create task sid
        if (taskcreated == false) {
            this.task_sid = await this.createTask();
            console.log("task_sid", this.task_sid);
        }

        const channel =
            await this.client.flexApi.channel
                .create({
                    target: toNumber,
                    identity: `sms_${fromNumber}`,
                    chatUserFriendlyName: friendlyName,
                    chatFriendlyName: `Chat With ${friendlyName}`,
                    flexFlowSid: flexFlowSid,
                    taskSid: this.task_sid,
                })

        this.channel_sid = channel.sid;
        console.log("2-CHANNEL SID", this.channel_sid)
        console.log("Starting Proxy Session", channel);
        const proxySession =
            await this.client.proxy.services(this.proxy_service_sid)
                .sessions
                .create({
                    uniqueName: `${channel.sid}`,
                    participants: [{
                        'identifier': `${channel.sid}`,
                        'proxyIdentifier': `+${fromNumber}`,
                        'friendlyName': friendlyName
                    }],
                    mode: 'message-only'
                })
        console.log("ProxySid-3", proxySession.sid);
        const addCustomer =
            await this.client.proxy.services(this.proxy_service_sid)
                .sessions(proxySession.sid)
                .participants
                .create({
                    friendlyName: friendlyName,
                    identifier: toNumber
                })

        console.log("4-addCustomer.sid", addCustomer);

        const chatAttributes =
            await this.client.chat.services(this.chat_service_sid)
                .channels(channel.sid)
                .fetch()

        console.log("5-ChatAttributes", chatAttributes.attributes);

        const sendMessage =
            await this.client.proxy.services(this.proxy_service_sid)
                .sessions(proxySession.sid)
                .participants(addCustomer.sid)
                .messageInteractions
                .create({
                    body: message
                })
        console.log('5-Message sent!', sendMessage);
    }
    test_messageflow() {
        console.log(this.client)
        return `channel sid ${this.create_messageflow(0)}`;
    }
    getChattAttributes() {
        console.log("channel sid", this.channel_sid)
        return this.channel_sid;
    }

}

module.exports = MessagingService