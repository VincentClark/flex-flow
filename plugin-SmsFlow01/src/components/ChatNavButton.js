import React from 'react'
import { SideLink, Actions } from '@twilio/flex-ui';

const ChatNavButton = ({ activeView }) => {
    function navigate() {
        Actions.invokeAction('NavigateToView',
            { viewName: 'chat-view' });
    }
    return (
        <SideLink
            showLable={true}
            icon="Analyze"
            iconActive="AnalyzeBold"
            isActive={activeView === 'chat-view'}
            onClick={navigate}>
            Chat
        </SideLink>
    )
}

export default ChatNavButton
