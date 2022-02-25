import React, { useState, useEffect } from 'react'
import { FlexContext, FLEX_LOCATION_CHANGE, withTheme } from '@twilio/flex-ui';
import styled from 'react-emotion';

const holdMusicSelection = (props) => {
    // console.log("Muisc", createHoldMusic)
    // if (!props.isOpen) {
    //     return null;
    // }
    console.log("props", props);
    console.log("flex-log", props.flex);
    console.log("flex-log-worker", props.holdMusicArray)

    const holdMusicArray = props.holdMusicArray;
    const holdMusicBase = "https://fsassets-9880.twil.io/";
    function HandleOptionChanged(event) {
        console.log("music hms", event.target.value);
        props.changeHoldMusic(`${event.target.value}`);
        props.createHoldMusic(event.target.value.split("|")[0]);
    }



    function createSelection(holdMusicArray) {
        const selection = holdMusicArray.map((holdMusic) => {
            const holdMusicName = holdMusic.split(":")[0];
            const holdMusicUrl = holdMusic.split(":")[1];
            if (holdMusicName === props.holdMusicName) {
                return (
                    <FlexOption key={holdMusicName} name={holdMusicName} value={`${holdMusicBase} ${holdMusicUrl}|${holdMusicName}`} select>{holdMusicName}</FlexOption>
                )
            } else {
                return (
                    <FlexOption key={holdMusicName} name={holdMusicName} value={`${holdMusicBase}${holdMusicUrl}|${holdMusicName}`}>{holdMusicName}</FlexOption>
                )
            }

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
                    `State Hold Music Name: ${props.currentHoldMusicName}`
                }
            </FlexInfo>
            <FlexInfo>
                {`Hold Music: ${props.currentHoldMusicUrl}`}
            </FlexInfo>
            <FlexSelectionLabel>Hold Music: </FlexSelectionLabel>
            <FlexSelection onChange={HandleOptionChanged}>

                {
                    createSelection(holdMusicArray)
                }
            </FlexSelection>
            <FlexInfo>
                <button onClick={(e) => handleOnClick(e)}>Test</button>
            </FlexInfo>
        </div>
    )
}
const FlexSelection = styled('select')`
background-color: ${props => props.theme.calculated.backgroundColor};
    color: black;
`;
const FlexSelectionLabel = styled('label')`
    color: ${props => props.theme.calculated.textColor};
    font-size: ${props => props.theme.calculated.fontSize};
`;
const FlexOption = styled('option')`

    color: black;
`;
const FlexInfo = styled('div')`
    color: ${props => props.theme.calculated.textColor};
    font-size: ${props => props.theme.calculated.fontSize};
`;

export default withTheme(holdMusicSelection);