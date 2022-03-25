require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const workSpaceSid = process.env.TWILIO_WORKSPACE_SID;

const client = require('twilio')(accountSid, authToken);


// Crete Worker
const newWorker = (workerFriendlyName) => {
    client.taskrouter.workspaces(workSpaceSid).workers.create({
        friendlyName: workerFriendlyName,
        attributes: '{"type":"worker"}'
    }).then(worker => {
        console.log(`Worker ${worker.sid} created`);
        return (`Worker ${worker.sid} created`);
    });
}

console.log("newWorker", newWorker());