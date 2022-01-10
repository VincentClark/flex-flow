const twilio = require('twilio');
const { FactorPage } = require('twilio/lib/rest/verify/v2/service/entity/factor');

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
        //this.flex_flow_sid = config.FLEX_FLOW_SID;
        this.flex_flow_sid_a = config.FLEX_FLOW_SID_A;
        this.flex_flow_sid_b = config.FLEX_FLOW_SID_B;
        this.twilio_phone_number = config.TWILIO_PHONE_NUMBER;
        this.workspace_sid = 'WS54668fb2d31f80c3ad5161fe58290536';
        this.workflow_sid = 'WWb108b0e85791675c1881b636b052f987';
        this.task_channel_sid = "TC325153b0957a5bb929be2885950817dc";
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
            console.log("service", taskSid);
            return (taskSid);
        }
        );
    }
    async create_messageflow(toNumber = "+16268985404", fromNumber = this.twilio_phone_number, friendlyName = "Valued Customer", message = "Hello World", createTask = 'false', fromAgent = "Friendly Agent") {
        console.log("create_messageflow");
        const flexFlowSid = this.flex_flow_sid_a;
        const channel = await this.client.flexApi.channel.create({
            target: toNumber,
            taskAttributes: JSON.stringify({
                to: toNumber,
                direction: 'outbound',
                name: friendlyName,
                from: `+${fromNumber}`,
                '1': '1',
                autoAnswer: 'true'
            }),
            identity: `sms_${fromNumber}`,
            chatFriendlyName: `chat user ${friendlyName}`,
            flexFlowSid: flexFlowSid,
            chatUserFriendlyName: 'Chat with Valued Customer',
        }).then(channel => {
            console.log("channel", channel);
            this.channel_sid = channel.sid;
            return (channel);
        }).catch(err => {
            console.log("ERROR", err)
        })
        return (channel);
    }


    async createChannel(toNumber = "+16268985404", fromNumber = this.twilio_phone_number, friendlyName = "Valued Customer", message = "Hello World", createTask = 'false', fromAgent = "Friendly Agent") {
        console.log("createChannel")
        const flexFlowSid = this.flex_flow_sid_a;
        const channel = await this.client.flexApi.channel.create({
            target: toNumber,
            taskAttributes: JSON.stringify({
                to: toNumber,
                direction: 'outbound',
                name: friendlyName,
                from: `+${fromNumber}`,
                '1': '1',
                autoAnswer: 'true'
            }),
            identity: `sms_${fromNumber}`,
            chatFriendlyName: `chat user ${friendlyName}`,
            flexFlowSid: flexFlowSid,
            chatUserFriendlyName: 'Valued Customer',
        }).then(channel => {
            console.log("channel", channel);
            this.channel_sid = channel.sid;
            return (channel.sid);
        }).catch(err => {
            console.log("ERROR", err)
        })

    }

    async strategyBOutboundSMS(toNumber = "+16268985404", fromNumber = this.twilio_phone_number, friendlyName = "Valued Customer", message = "Hello World", createTask = 'false', fromAgent = "Friendly Agent") {
        const flexFlowSid = this.flex_flow_sid_b;
        console.log("StratB")
        console.log("floxflow sid", this.flex_flow_sid_b);
        //stategy 1
        const channel =
            await this.client.flexApi.channel
                .create({
                    target: '+16268985404',
                    identity: 'sms_16268985404',
                    chatUserFriendlyName: 'VincentClark',
                    chatFriendlyName: 'Chat with VincentClark',
                    flexFlowSid: flexFlowSid
                })
        // for diagnotics        
        this.channel_sid = channel.sid;
        console.log("2-CHANNEL SID", channel.sid)
        //console.log("Starting Proxy Session", channel);
        // STATEGY 2
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

        console.log("5-ChatAttributes", chatAttributes);
        // SEND Message
        const sendMessage = await this.client.chat.services(this.chat_service_sid)
            .channels(channel.sid)
            .messages
            .create({
                body: message,
                from: `${fromNumber}`,
            })
            .then(message => console.log(message.sid))
            .catch(err => console.log("error message", err.message))
        console.log('5-Message sent!', sendMessage);
    }
    async strategyAOutboundSMS(toNumber = "+16268985404", fromNumber = '+14153389812', friendlyName = "Valued Customer", message = "Hello World", createTask = 'true', fromAgent = "Friendly Agent") {
        console.log("StratA")
        const flexFlowSid = this.flex_flow_sid_a;
        const taskAttributes = {
            to: `${toNumber}`,
            direction: 'outbound',
            name: 'Valued Customer John',
            from: `+${fromNumber}`,
            targetWorker: '1==1',
            autoAnswer: 'true',

        }
        const channel = await this.client.flexApi.channel.create({
            target: `+${fromNumber}`,
            taskAttributes: JSON.stringify(taskAttributes),
            identity: `sms_${fromNumber}`,
            chatFriendlyName: `chat user ${friendlyName}`,
            flexFlowSid: flexFlowSid,
            chatUserFriendlyName: `${toNumber}`,
        }).then(channel => {
            console.log("channel", channel);
            this.channel_sid = channel.sid;
            return (channel);
        }).catch(err => {
            console.log("ERROR", err)
        })
        // console.log("2-CHANNEL SID", channel.sid)
        // let chatTaskAttributes = channel.taskAttributes;
        // console.log("type of", typeof chatTaskAttributes);
        // console.log("chatTaskAttributes", chatTaskAttributes);
        // Stragegy 1
        const proxySession = await this.client.proxy.services(this.proxy_service_sid)
            .sessions
            .create({
                uniqueName: `${channel.sid}`,
                mode: 'message-only',
                participants: [{ 'Identifier': `${toNumber}` }]
            })
            .then(session => {
                console.log("session", session.sid);
                return (session);
            }
            )

        console.log("ProxySid-3", proxySession.sid);
        //console.log("chat sid", this.channel_sid);
        const addAgent =
            await this.client.proxy.services(this.proxy_service_sid)
                .sessions(proxySession.sid)
                .participants
                .create({
                    proxyIdentifier: `+${fromNumber}`,
                    friendlyName: `${toNumber}`,
                    identifier: channel.sid

                })

        // console.log("4-addAgent.sid", addAgent);
        taskAttributes['proxySession'] = proxySession.sid;

        //   console.log("taskAttributes", taskAttributes);
        // const chatAttributes =
        //     await this.client.chat.services(this.chat_service_sid)
        //         .channels(channel.sid)
        //         .update({
        //             attributes:
        //                 JSON.stringify(
        //                     {
        //                         to: `${toNumber}`,
        //                         direction: 'outbound',
        //                         name: 'Valued Customer John',
        //                         from: `${fromNumber}`,
        //                         targetWorker: '1==1',
        //                         vincent: 'true',
        //                         autoAnswer: 'true',
        //                         proxySession: proxySession.sid
        //                     }
        //                 )
        //         })
        //         .then(chatAttributes => {
        //             console.log("chatAttributes", chatAttributes);
        //             return (chatAttributes);
        //         })
        //         .catch(err => {
        //             console.log("error", err);
        //         })


        console.log("5-ChatAttributes", chatAttributes);
        console.log(channel)

        // const sendInitialMessage = this.client.proxy.services(this.proxy_service_sid)
        //     .sessions(proxySession.sid)
        //     .participants(addAgent.sid)
        //     .messageInteractions
        //     .create({
        //         body: 'Message from Twilio',
        //     })
        //     .then(message_interaction => console.log("message interaction", message_interaction))
        // console.log("channel", channel)
        // console.log("sendInitialMessage", sendInitialMessage);
        // console.log("proxySession", proxySession);
        // console.log("addCustomer", addCustomer);

        return (channel);
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