import React from 'react';
import { VERSION, View } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import ChatNavButton from './components/ChatNavButton';
import ChatComponent from './components/ChatComponent';
const PLUGIN_NAME = 'SmsFlow01Plugin';

export default class SmsFlow01Plugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }


  init(flex, manager) {
    flex.SideNav.Content.add(
      <ChatNavButton key="chat-sidenav-button" />
    );
    flex.ViewCollection.Content.add(
      <View name="chat-view" key="chat-view">
        <ChatComponent key="co-chat-view" flex={flex} />
      </View>
    );
    manager.strings.NoTasksTitle = "Awaiting incoming requests...";


  }
}
