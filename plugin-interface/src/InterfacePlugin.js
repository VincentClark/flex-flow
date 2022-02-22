import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import FeatherTheme from './components/TimeTheme/FeatherCorpTheme';
import FakeStoreThemeDark from './components/TimeTheme/FakeStoreThemeDark';
import QuoteComponent from './components/Quote/Quote';
import reducers, { namespace } from './states';
import TimeTheme from './components/TimeTheme/TimeTheme';

const PLUGIN_NAME = 'InterfacePlugin';

export default class InterfacePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */

  async init(flex, manager) {
    //migrate to json file.
    const configuration = {
      icon: 'https://fsassets-9880.twil.io/FSIcon_TH',
      logo: 'https://fsassets-9880.twil.io/fslogo-fstheme',
      title: 'Fake Store Flex'
    }
    // flex.Actions.addListener("beforeAcceptTask", (payload, abortFunction) => {
    //   alert("Triggered before event AcceptTask");
    //   if (!window.confirm("Are you sure you want to accept the task?")) {
    //     abortFunction();
    //   }
    // });

    // Extract this into new plugin when it is time. 
    // flex.Actions.replaceAction("WrapupTask", (payload, original) => {
    //   // Only alter chat tasks:
    //   if (payload.task.taskChannelUniqueName !== "chat") {
    //     original(payload);
    //     console.log("Debuger wtf? this is no chat.", payload);
    //     console.log("Debuger", payload.task.taskChannelUniqueName)
    //   } else {
    //     return new Promise(function (resolve, reject) {
    //       // Send the message:
    //       flex.Actions.invokeAction("SendMessage", {
    //         body: 'Thanks for chatting. Your session is now closed.',
    //         channelSid: payload.task.attributes.channelSid
    //       })
    //         .then(response => {
    //           // Wait until the message is sent to wrap-up the task:
    //           resolve(original(payload));
    //         });
    //     });
    //   }
    // });



    // flex.MainHeader.defaultProps.logoUrl =
    //   "https://fsassets-9880.twil.io/fslogo-fstheme1.png"
    //https://fsassets-9880.twil.io/dave-chappelle-show-wrap-it-up.gif
    //manager.updateConfig({ colorTheme: FeatherTheme });

    //remove interface compontents
    flex.NoTasksCanvas.Content.remove('first-line');
    flex.NoTasksCanvas.Content.remove('second-line');
    flex.NoTasksCanvas.Content.remove('hint');

    flex.NoTasksCanvas.Content.add(<TimeTheme key="timeTheme" manager={manager} flex={flex} config={configuration} />, {
      sortOrder: -1
    });


    flex.NoTasksCanvas.Content.add(<QuoteComponent key="qotd" />, {
      sortOrder: -1
    });


  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
