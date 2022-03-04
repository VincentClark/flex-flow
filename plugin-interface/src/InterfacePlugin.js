import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import QuoteComponent from './components/Quote/Quote';
import reducers, { namespace } from './states';
import TimeTheme from './components/TimeTheme/TimeTheme';
import config from './config.json';
import axios from 'axios';

// "https://phone-4798.twil.io/"
//https://fsassets-9880.twil.io/

const responseString = JSON.stringify(config);
const localResponse = JSON.parse(responseString);
console.log("xxxconf", "json", localResponse);
const responsex = {
  "base_url": "https://fsassets-9880.twil.io/",
  "logo": {
    "logo_name": "fslogo-fstheme",
    "logo_extension": ".png",
  },
  "brand": {
    "favicon": "FSIcon_TH",
    "title": "Fake Store",
  },
  "spoof": {
    "spoofableLocations": [

      {
        name: '----',
        coordinates: [0, 0]
      },
      {
        name: 'Melbourne',
        latitude: -37.813611,
        longitude: 144.963056
      },
      {
        name: 'York',
        latitude: 53.958332,
        longitude: -1.080278
      },
      {
        name: 'Ankorage',
        latitude: 61.2173,
        longitude: -149.863129
      },
      {
        name: 'Manila',
        latitude: 14.583333,
        longitude: 120.984222
      },
      {
        name: 'Athens',
        latitude: 37.983333,
        longitude: 23.733333
      },
      {
        name: 'Tashkent',
        latitude: 41.316667,
        longitude: 69.25
      },
      {
        name: 'San Jose',
        latitude: 9.933333,
        longitude: -84.083333
      },
      {
        name: 'Rio de Janeiro',
        latitude: -22.906847,
        longitude: -43.172896
      },
      {
        name: 'Ann Arbor',
        latitude: 42.2808,
        longitude: -83.7430
      },
      {
        name: 'London',
        latitude: 51.509865,
        longitude: -0.118092
      },
    ],
  },

}

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
    console.log("xxxconf", config);
    const configuration = {
      icon: 'https://fsassets-9880.twil.io/FSIcon_TH',
      logo: 'https://fsassets-9880.twil.io/fslogo-fstheme',
      title: 'Fake Store Flex'
    }
    try {
      const responseAxios = async () => {
        const axiosResponse = await axios.get('https://configdata-6860.twil.io/config.json')
          .then((axiosResponse) => {
            const remoteResponseString = JSON.stringify(axiosResponse.data);
            const remoteResponse = JSON.parse(remoteResponseString);
            console.log("xxxconf", "remote", remoteResponse);
            return remoteResponse
          })
          .then((remoteResponse) => {
            flex.NoTasksCanvas.Content.add(<TimeTheme key="timeTheme" manager={manager} flex={flex} config={configuration} response={remoteResponse} />, {
              sortOrder: -1
            });


            flex.NoTasksCanvas.Content.add(<QuoteComponent key="qotd" />, {
              sortOrder: -1
            });
            return remoteResponse;
          })

          .catch((error) => {
            console.log("xxxconf", "error", error);
            return localResponse;
          }
          );
        return responseAxios;
      }
      const response = responseAxios();
      console.log("xxxconf", "response", response);
    } catch (error) {
      console.log("xxxconf", "error", error);
      return localResponse;
    }





    //remove interface compontents
    flex.NoTasksCanvas.Content.remove('first-line');
    flex.NoTasksCanvas.Content.remove('second-line');
    flex.NoTasksCanvas.Content.remove('hint');




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
