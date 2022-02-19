import React from 'react';
import { Manager, VERSION } from '@twilio/flex-ui';

import { FlexPlugin } from 'flex-plugin';
import HoldMusicSelection from './components/HoldMusicSelection';
import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'HoldcallPlugin';

export default class HoldcallPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /*
      https://fsassets-9880.twil.io/
      Dual_of_Fates_02.wav
      YourWelcome_02.wav
      StarWars_01.wav
      YourWelcome_05.wav
      YourWelcome_02.wav
      StarWars_01.wav
      YourWelcome_04.wav
      SmoothJazz.wav
      YourWelcome_01.wav
      SmoothJaze3_01
    holdMusic = "Duel of Fates 02:Duel_of_Fates_02.wav, Your Welcome 02:YourWelcome_02.wav, Star Wars 01:StarWars_01.wav, Your Welcome 05:YourWelcome_05.wav, Your Welcome 02:YourWelcome_02.wav,YourWelecome 04:YourWelcome_04.wav, SmoothJazz:SmoothJazz.wav, Your Welcome 01:YourWelcome_01.wav, "SmoothJazz 301:SmoothJaze3_01.wav"


  */
  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);
    this.registerReducers(manager);
    function createHoldMusic(hold_url) {
      flex.Actions.replaceAction("HoldCall", async (payload, original) => {

        //const holdMusicUrl = Manager.getInstance().workerClient.attributes.holdMusicUrl;
        console.log("music", hold_url);
        await new Promise((resolve, reject) => {
          resolve();
        });
        original({
          ...payload,
          holdMusicUrl: hold_url,
          holdMusicMethod: "POST",
        });
      });
    }
    flex.NoTasksCanvas.Content.add(<HoldMusicSelection key="HoldMusic" flexInstance={Manager.getInstance()} flex={flex} createHoldMusic={createHoldMusic} />, {
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
