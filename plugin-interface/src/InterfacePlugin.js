import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import FeatherTheme from './FeatherCorpTheme';
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
  //flex.AgentDesktopView.Panel1.Content.add(<CustomTaskListContainer key="FlextwoSmsoutboundPlugin-component" />, options);
  async init(flex, manager) {
    //this.registerReducers(manager);

    // config
    //https://fsassets-9880.twil.io/fakestore.png https://fsassets-9880.twil.io/fslogo.svg
    // const configuration = {
    //   colorTheme: {
    //     baseName: "FlexLight",
    //   }
    // };
    //flex.AgentDesktopView.Panel1.Content.add(<CustomTaskListContainer key="FlextwoSmsoutboundPlugin-component" />, options);

    flex.MainHeader.defaultProps.logoUrl =
      "https://tangerine-toad-5117.twil.io/assets/feathercorp-logo-white.svg"
    manager.updateConfig({ colorTheme: FeatherTheme });

    //remove interface compontents
    flex.NoTasksCanvas.Content.remove('first-line');
    flex.NoTasksCanvas.Content.remove('second-line');
    flex.NoTasksCanvas.Content.remove('hint');
    flex.NoTasksCanvas.Content.add(<QuoteComponent key="qotd" />, {
      sortOrder: -1
    });
    flex.NoTasksCanvas.Content.add(<TimeTheme key="timeTheme" />, {
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
