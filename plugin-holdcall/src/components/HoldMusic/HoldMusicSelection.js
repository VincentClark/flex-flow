import React, { useState, useEffect } from 'react'
import { FlexContext, FLEX_LOCATION_CHANGE, withTheme } from '@twilio/flex-ui';
import styled from 'react-emotion';

const HoldMusicSelection = (props, { flexInstance, flex, createHoldMusic }) => {
    console.log("Muisc", createHoldMusic)
    // if (!props.isOpen) {
    //     return null;
    // }
    console.log("props", props);

    const holdMusicString = "Duel of Fates 02:Duel_of_Fates_02.wav,Star Wars 01:StarWars_01.wav, Your Welcome 05:YourWelcome_05.wav, Your Welcome 02:YourWelcome_02.wav,YourWelecome 04:YourWelcome_04.wav, SmoothJazz:SmoothJazz.wav, Your Welcome 01:YourWelcome_01.wav";
    const holdMusicArray = holdMusicString.split(",");
    const holdMusicBase = "https://fsassets-9880.twil.io/";
    const [currentHoldMusicUrl, setCurrentHoldMusicUrl] = useState(holdMusicBase + holdMusicArray[0].split(":")[1]);
    const [currentHoldMusicName, setCurrentHoldMusicName] = useState(holdMusicArray[0].split(":")[0]);
    function HandleOptionChanged(event) {
        setCurrentHoldMusicUrl(event.target.value);
        setCurrentHoldMusicName(event.target.name);
        console.log("music", createHoldMusic)
        // changeHoldMusic(event.target.value);
        createHoldMusic(event.target.value);
    }



    function createSelection(holdMusicArray) {
        const selection = holdMusicArray.map((holdMusic) => {
            const holdMusicName = holdMusic.split(":")[0];
            const holdMusicUrl = holdMusic.split(":")[1];
            if (holdMusicName === currentHoldMusicName) {
                return (
                    <FlexOption key={holdMusicName} value={holdMusicBase + holdMusicUrl} selected>{holdMusicName}</FlexOption>
                )
            } else {
                return (
                    <FlexOption key={holdMusicName} value={holdMusicBase + holdMusicUrl}>{holdMusicName}</FlexOption>
                )
            }

        })
        return selection;
    }
    function changeHoldMusic(hold_url) {
        // flex.Actions.replaceAction("HoldCall", async (payload, original) => {

        //     //const holdMusicUrl = Manager.getInstance().workerClient.attributes.holdMusicUrl;
        //     console.log("music", hold_url);
        //     await new Promise((resolve, reject) => {
        //         resolve();
        //     });
        //     original({
        //         ...payload,
        //         holdMusicUrl: hold_url,
        //         holdMusicMethod: "POST",
        //     });
        // });
    }
    // useEffect(() => {
    //     changeHoldMusic(currentHoldMusicUrl);
    // }, [currentHoldMusicUrl])

    return (
        <div>
            <FlexInfo>
                {`Hold Music: ${currentHoldMusicUrl}`}
            </FlexInfo>
            <FlexSelectionLabel>Hold Music: </FlexSelectionLabel>
            <FlexSelection onChange={HandleOptionChanged}>

                {
                    createSelection(holdMusicArray)
                }
            </FlexSelection>
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

export default withTheme(HoldMusicSelection);