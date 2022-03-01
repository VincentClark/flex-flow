import React, { useState, useEffect } from 'react'
import { FlexContext, FLEX_LOCATION_CHANGE, withTheme } from '@twilio/flex-ui';
import styled from 'react-emotion';

const holdMusicSelection = (props) => {
    // console.log("Muisc", createHoldMusic)
    // if (!props.isOpen) {
    //     return null;
    // }

    //Added from front of the pluggin for now, need to put in the correct place
    props.flex.Actions.addListener("afterAcceptTask", (payload, original) => {
        console.log("buggin", payload.task._task.attributes.holdMusic);
        props.setCustomerHoldMusic(payload.task._task.attributes.holdMusic, props.currentAd, props.createHoldMusic);
    });

    function updateHoldMusic(hold_url) {
        // props.createHoldMusic();
    }


    console.log("props", props);
    console.log("flex-log", props.flex);
    console.log("flex-log-worker", props.holdMusicArray)

    const holdMusicArray = props.holdMusicArray;
    const holdMusicBase = "https://phone-4798.twil.io/";
    function handleOptionChanged(event) {
        console.log("hold-music-change", event.target.value);
        props.changeAd(event.target.value);
        // props.changeHoldMusic(`${event.target.value}`);
        props.setCustomerHoldMusic(props.currentHoldMusicName, event.target.value, props.createHoldMusic);
        //props.createHoldMusic(event.target.value.split("|")[0]);
    }



    function createSelection(holdMusicArray) {
        console.log("hold-music-selection", holdMusicArray);
        const selection = holdMusicArray.map((holdMusic) => {
            console.log("hold-music-option", holdMusic);
            // const holdMusicName = holdMusic.split(":")[0];
            // const holdMusicUrl = holdMusic.split(":")[1];

            // if (holdMusicName === props.holdMusicName) {
            //     return (
            //         <FlexOption key={holdMusicName} name={holdMusicName} value={`${holdMusicBase} ${holdMusicUrl}|${holdMusicName}`} select>{holdMusicName}</FlexOption>
            //     )
            // } else {
            //     return (
            //         <FlexOption key={holdMusicName} name={holdMusicName} value={`${holdMusicBase}${holdMusicUrl}|${holdMusicName}`}>{holdMusicName}</FlexOption>
            //     )
            // }
            return (<FlexOption key={holdMusic} name={holdMusic} value={holdMusic}>{holdMusic}</FlexOption>)

        })
        return selection;
    }
    function applyHoldMusic(holdUrl) {
        props.flex.Actions.replaceAction("HoldCall", async (payload, original) => {
            //const holdMusicUrl = Manager.getInstance().workerClient.attributes.holdMusicUrl;
            await new Promise((resolve, reject) => {
                resolve();
            });
            original({
                ...payload,
                holdMusicUrl: holdUrl,
                holdMusicMethod: "POST",
            });
        });
    }
    // useEffect(() => {
    //     changeHoldMusic(currentHoldMusicUrl);
    // }, [currentHoldMusicUrl])
    function handleOnClick(e) {
        props.changeHoldMusic("one:done");
    }

    return (
        <div>
            <FlexInfo>
                {
                    `current hold music: ${props.currentHoldMusicName}`
                }
            </FlexInfo>
            <FlexInfo>
                {
                    `Customer Hold Music Name: ${props.customerHoldMusic}`
                }
            </FlexInfo>
            <FlexInfo>
                {
                    `Customer Ad Hold Music: ${props.customerAdHoldMusic}`
                }
            </FlexInfo>
            <FlexInfo>
                {
                    `Current Ad: ${props.currentAd}`
                }
            </FlexInfo>
            <FlexInfo>
                {`Hold Music: ${props.currentHoldMusicName}`}
            </FlexInfo>
            <FlexSelectionLabel>Hold Music: </FlexSelectionLabel>
            <FlexSelection onChange={handleOptionChanged}>
                <FlexOption key="none" value="none" name="none" selected disabled hidden>Select Option</FlexOption>

                {
                    createSelection(holdMusicArray)
                }
            </FlexSelection>
        </div>
    )
}
const FlexSelection = styled('select')`
background-color: gray;
    color: white;
`;
const FlexSelectionLabel = styled('label')`
padding:5px;
font-weight: bold;
color: ${props => props.theme.calculated.textColor};
font-size: 14px;
`;
const FlexOption = styled('option')`

    color: black;
`;
const FlexInfo = styled('div')`
    font-weight: bold;
    background-color: darkgrey;
    border:1px solid black;
    color: ${props => props.theme.calculated.textColor};
    font-size: 14px;
`;

export default withTheme(holdMusicSelection);