import twilio from 'twilio';
require('dotenv').config();

const messaging_class = class {
    constructor(account_sid, auth_token, workspace_sid, messageflow_sid) {
        this.account_sid = process.env.TWILIO_ACCOUNT_SID;
        this.auth_token = process.env.TWILIO_AUTH_TOKEN;
        this.workspace_sid = workspace_sid;
        this.messageflow_sid = messageflow_sid;
        this.init();
    }

    //create init function
    create_messageflow(messageflow_sid) {
        const client = new twilio(this.account_sid, this.auth_token);
        client.taskrouter.v1.workspaces(this.workspace_sid).task_router_message_flows(messageflow_sid).create();
    }
    init() {
        //create a new Twilio client
        this.client = new twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
    }
}