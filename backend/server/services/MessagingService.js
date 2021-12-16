//import twilio from 'twilio';

class MessagingService {
    //create init function
    constructor(config) {
        this.account_sid = config.TWILIO_ACCOUNT_SID;
        this.auth_token = config.TWILIO_AUTH_TOKEN;
    }
    create_messageflow(messageflow_sid) {
        // const client = new twilio(account_sid, auth_token);
        // client.taskrouter.v1.workspaces(workspace_sid).task_router_message_flows(messageflow_sid).create();
        // const account_sid = config.TWILIO_ACCOUNT_SID;
    }
    test_messageflow() {
        return `test_messageflow ${this.account_sid}`;
    }
}

module.exports = MessagingService