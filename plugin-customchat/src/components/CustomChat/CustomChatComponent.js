import React from 'react';
import PropTypes from 'prop-types';
import { FlexContext, FLEX_LOCATION_CHANGE, withTheme } from '@twilio/flex-ui';

//import { CustomTaskListComponentStyles } from './CustomTaskList.Styles';

// It is recommended to keep components stateless and use redux for managing states
/*
    flex.Actions.addListener("beforeAcceptTask", (payload, abortFunction) => {
      alert("Triggered before event AcceptTask");
      if (!window.confirm("Are you sure you want to accept the task?")) {
        abortFunction();
      }
    });

    Extract this into new plugin when it is time. 
    flex.Actions.replaceAction("WrapupTask", (payload, original) => {
      // Only alter chat tasks:
      if (payload.task.taskChannelUniqueName !== "chat") {
        original(payload);
        console.log("Debuger wtf? this is no chat.", payload);
        console.log("Debuger", payload.task.taskChannelUniqueName)
      } else {
        return new Promise(function (resolve, reject) {
          // Send the message:
          flex.Actions.invokeAction("SendMessage", {
            body: 'Thanks for chatting. Your session is now closed.',
            channelSid: payload.task.attributes.channelSid
          })
            .then(response => {
              // Wait until the message is sent to wrap-up the task:
              resolve(original(payload));
            });
        });
      }
    });
    */

// It is recommended to keep components stateless and use redux for managing states
const CustomChatComponent = (props) => {



  return (
    <>
      CustomChatComponent
    </>
  );
};

export default CustomChatComponent;