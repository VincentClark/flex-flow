import React from 'react';
import { SideLink, Actions } from '@twilio/flex-ui';

const NewsNavButton = ({ activeView }) => {
    function navigate() {
        Actions.invokeAction('NavigateToView', { viewName: 'news-view' });
    }

    return (
        <SideLink
            showLabel={true}
            icon="Analyze"
            iconActive="AnalyzeBold"
            isActive={activeView === 'news-view'}
            onClick={navigate}>
            Company News
        </SideLink>
    )
}

export default NewsNavButton;