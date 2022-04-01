import React from 'react';
import PropTypes from 'prop-types';
import { FlexContext, FLEX_LOCATION_CHANGE, withTheme } from '@twilio/flex-ui';
import styled from 'react-emotion';
//import { CustomTaskListComponentStyles } from './CustomTaskList.Styles';

// It is recommended to keep components stateless and use redux for managing states
const CustomInsight = (props) => {

    function myInfo(append, elid) {
        const textNode = document.createTextNode(append);
        const element = document.getElementById(elid);
        element.appendChild(textNode);
    }
    //listeners
    //conversation_label_1
    // conversation_label_1

    props.flex.Actions.addListener("beforeAcceptTask", (payload, abortFunction) => {
        //  const insightsInstance = props.flex.Manager.getInstance().insightsClient;
        //  const twilisock = insightsInstance.twilisock;
        //  console.log("buggin before", props.flex)
        // console.log("buggin late", payload.task._task.attributes)
        // payload.task._task.attributes.conversation_lable_1 = "test";
        // alert("Triggered before event AcceptTask");
        // if (!window.confirm("Are you sure you want to accept the task?")) {
        //   abortFunction();
        // }
        // myInfo(payload.task._task.attributes.call_sid, "flexNotes");
        // console.log("buggin", payload);
        // Manager.getInstance().workerClient.attributes
        // console.log("buggin - task", props.flex.Manager.getInstance().workerClient)
        //console.log("buggin insights", insightsInstance);

    });


    //end listeners



    return (
        <FlexContainer>
            Custome Insight Container
            <FlexContainer id="flexNotes">

            </FlexContainer>

        </FlexContainer>
    );
};

const FlexContainer = styled('div')`
    display: flex;
    border:1px solid black;
    background-color: lightgray;
`;

// CustomTaskList.displayName = 'CustomInsight';

// CustomTaskList.propTypes = {
//     isOpen: PropTypes.bool.isRequired,
//     dismissBar: PropTypes.func.isRequired,
// };

export default withTheme(CustomInsight);
