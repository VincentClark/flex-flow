# Your custom Twilio Flex Plugin

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd 

# If you use npm
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex@beta
```

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

# About Plugin
The goal of this plugin is to display a light them during the day and a dark theme at night. In adition to toggling dark/light theme the plugin makes use of the weatherapi. 

## Notes
rename "sample_config.json" to "config.json
currently I have my hosted assets as an example. This should work without issue. I will host sample assets in the future. 

## How it works
There are currently 2 themes, light and dark in the .src/components/TimeTheme/themes/FakeStoreTheme{Dark||Light}
The location api is obtained by calling "https://ipapi.co/json/" The latitude and longitude coordinates is based upon your IP address. 
The location api supplies latitude and longitude for the sunrise and sunset api from https://api.sunrise-sunset.org.
The application makes use of the sunrise and length of day in order to caluclate the time to sunset. The reason why we are not using the sunsset value is that the data is returned in UTC and occurs on two different days for Pacfic Time. 
*Curently Changing on Sunrise is not working 3/4/2022*
When dark theme is enabled a dark version of the logo and fav icon is changed to their dark conterparts. 
Configuring the assets is at ./src/config.json 
1. base_url (location of your assets)
1. weather_api_key (your weatherapi key) (temp solution)
1. logo
    1. logo name *logo assets in your asset folder must have the "_light", "_dark" at the end of the name and before the file extension. example: mylogo_dark.png*
    1. logo extension (png, jpg, svg, gif)
1. brand
    1. favicon (image assets must have "lite.png" or "dark.png")
    1. site title
1. spoof
    1. spoofableLocations
        1. name
        1. lattitude
        1. longitude


## Weather API Key 
You will need to get a weather api key at https://weatherapi.com. It is free for developers. ~~Place the key in your .env file as FLEX_WEATHER_API_KEY~~ In the config.json

# Debug Pannel 
To toggle the debug pannel click on the weather icon above the "Quote of the Day" 
This will show the "Debug Pannel" button. Click on the pannel in order to change time and location values. 
### Testing Dark / Light Theme. 
The sunset time is calculated by the sunrise time + the length of the day. In order to make the sunrise sooner, subtract from sunrise by hours and minutes. To increase the length of the say add hours and minutes.
*note: changing the time will not change the weather icon. The weather api is based on the current date and time. 

### Testing Locations.
Select a location you would like to spoof from the drop down. Click "Enable Spoof Locations" and the weather and time of the new location will be reflected. 
*You can add or subtract additional locations in the config.json*