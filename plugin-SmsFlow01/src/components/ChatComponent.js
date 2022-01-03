import React, { useState, useEffect } from 'react'
import { withTheme } from '@twilio/flex-ui';

import styled from 'react-emotion';
import qs from 'qs';
const axios = require('axios');
// const { fromNumber, toNumber, message, createTask } = req.body;

const ChatComponent = () => {
    const [message, setMessage] = useState(null);
    const [toNumber, setToNumber] = useState(null);
    const [fromNumber, setFromNumber] = useState(null);
    const [createTask, setCreateTask] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [didSend, setDidSend] = useState("none");
    const [sendMessage, setSendMessage] = useState("");

    // Handlers

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    const handleToNumberChange = (e) => {
        setToNumber(e.target.value);
    }
    const handleFromNumberChange = (e) => {
        setFromNumber(e.target.value);
    }
    const handleCreateTaskChange = (e) => {
        setCreateTask(e.target.checked);
    }
    const handleFriendlyNameChange = (e) => {
        setFromNumber(e.target.value);
    }
    // const handleSendMessage = () => {
    //     setIsLoading(true);
    //     setDidSend("none");
    //     setSendMessage("");
    //     setTimeout(() => {
    //         setIsLoading(false);
    //         setDidSend("block");
    //         setSendMessage("Message Sent!");
    //     }, 2000);
    // }
    const handleSubmission = () => {
        // console.log("Response Submitting");
        // const formData = new FormData();
        // formData.append('fromNumber', fromNumber);
        // formData.append("toNumber", "+17342803463");
        //formData.append('message', message);
        // formData.append('createTask', createTask);
        // console.log("response form data-", formData);
        try {

            axios({
                method: 'post',
                url: 'http://localhost:8000/messaging/sms-service',
                data: `toNumber=${toNumber}&message=${message}&createTask=${createTask}`,
                headers: { 'content-type': 'application/x-www-form-urlencoded' }

            }).then((response) => {
                console.log("response header", axios.headers);
                console.log("response good", response);
            }).catch((error) => {
                console.log("response error", error);
            }
            )
        } catch (err) {
            console.log("Response Error", err);
        }

    }

    return (
        <Canvas>
            <Container>
                <HeaderMain>
                    <Header>
                        Here Is Chat
                    </Header>
                </HeaderMain>
                <ChatBody>
                    <ChatBox>
                        <ChatLabel>To Number:</ChatLabel>
                        <ChatDiv><ChatInput type="textfield" name="to_number" id="to_number" onChange={(event) => handleToNumberChange(event)} /></ChatDiv>
                    </ChatBox>
                    <ChatBox>
                        <ChatLabel>From Number:</ChatLabel>
                        <ChatDiv><ChatInput type="textfield" name="from_number" id="from_number" onChange={(event) => handleFromNumberChange(event)} /></ChatDiv>
                    </ChatBox>
                    <ChatBox>
                        <ChatLabel>Friendly Name:</ChatLabel>
                        <ChatDiv><ChatInput type="textfield" name="to_friendly" id="to_friendly" onChange={(event) => handleFriendlyNameChange(event)} /></ChatDiv>
                    </ChatBox>
                    <ChatBox>
                        <ChatLabel>Task Sid:</ChatLabel>
                        <ChatDiv><ChatInput type="textfield" name="task_sid" id="task_sid" onChange={(event) => handleFriendlyNameChange(event)} /></ChatDiv>
                    </ChatBox>
                    <ChatBox>
                        <ChatLabel>Message</ChatLabel>
                        <ChatDiv><ChatTextArea name="message" id="meassage" onChange={(event) => handleMessageChange(event)}></ChatTextArea></ChatDiv>
                    </ChatBox>
                    <ChatBox>
                        <ChatCheckBoxLabel>Create Task</ChatCheckBoxLabel>
                        <ChatCreateTask type="checkbox" name="createTask" id="createTask" onChange={(event) => handleCreateTaskChange(event)} />
                    </ChatBox>
                    <ChatBox>
                        <ChatDiv><ChatButton onClick={() => handleSubmission()}>Send</ChatButton></ChatDiv>
                    </ChatBox>
                    <ChatBox style={{ display: { didSend } }} id="didSend">{sendMessage}</ChatBox>

                </ChatBody>
            </Container>
        </Canvas>
    )
}
const Canvas = styled("div")`
                display: flex;
                flex-direction: row;
                flex-grow: 1;
                align-items: center;
                background-color: ${props => props.theme.colors.base3};
                `;

const Container = styled("div")`
                color: ${props => props.theme.calculated.textColor};
                align-items: center;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                max-width: 100%;
                `;

const HeaderMain = styled("div")`
                border-style: solid;
                border-width: 0px 0px 4px;
                border-color: ${props => props.theme.colors.defaultButtonColor};
                margin-bottom: 1.5em;
                font-size: 2em;
                `;
const Header = styled("div")`
                font-size: 10px;
                font-weight: bold;
                color: ${props => props.theme.SideNav.Container.background};
                letter-spacing: 2px;
                margin: 0 2em;
                font-size: 2.5em;
                font-family: serif;
                `;
const ChatBox = styled("div")`
            padding: .5 em;
            `;
const ChatLabel = styled("div")`
            padding: 5px;
            `;
const ChatButton = styled("button")`
            background-color: ${props => props.theme.colors.defaultButtonColor};
            `;
const ChatBody = styled("div")`
                margin: 0.75em 6em 4em 6em;
                text-align: justify;
                font-size: 14px;
                letter-spacing: 1px;
                max-width: 800px;
                color: ${props => props.theme.colors.base9};
                `;
const ChatInput = styled("input")`
                background-color: ${props => props.theme.colors.base3};
                border-style: solid;
                color: ${props => props.theme.colors.base9};
                `;
const ChatDiv = styled("div")`
                background-color: ${props => props.theme.colors.base3};
                `;
const ChatTextArea = styled("textarea")`
                background-color: ${props => props.theme.colors.base3};
                border-style: solid;
                color: ${props => props.theme.colors.base9};
                `;
const ChatCreateTask = styled("input")`
                background-color: ${props => props.theme.colors.base3};
                `;
const ChatCheckBoxLabel = styled("label")`
                background-color: ${props => props.theme.colors.base3};
                `;
export default withTheme(ChatComponent);
