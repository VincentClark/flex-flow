import React, { useState, useEffect } from 'react'
import { FlexContext, withTheme } from '@twilio/flex-ui';
import styled from 'react-emotion';
import FakeStoreThemeLight from './FakeStoreThemeLight';

import FakeStoreThemeDark from './FakeStoreThemeDark';
import WeatherDisplay from './WeatherDisplay';
const axios = require('axios');

// well you earned it, and while napping think of cool ways to integrate crypto into flex. 
// best to get a bottle of roses first. 
const TimeTheme = ({ key, manager, flex, config, response }) => {
    /*
   


    */

    const [resp, setResponse] = useState(response);
    console.log("resp", resp);
    // console.log("response", response);

    const [sunShiftHour, setSunShiftHour] = useState(0);
    const [sunShiftMinute, setSunShiftMinute] = useState(0);
    const [apiSunRise, setApiSunRise] = useState(null);
    const [spoofLocation, setSpoofLocation] = useState(false);
    const [debugPannel, setDebugPannel] = useState('none');
    const [debugButton, setDebugButton] = useState('none');
    const [spoofCoordinates, setSpoofCoordinates] = useState([]);
    const [spoofCity, setSpoofCity] = useState('');
    const spoofableLocations = response.spoof.spoofableLocations;
    // const spoofableLocations =
    //     [
    //         {
    //             name: '----',
    //             coordinates: [0, 0]
    //         },
    //         {
    //             name: 'Melbourne',
    //             latitude: -37.813611,
    //             longitude: 144.963056
    //         },
    //         {
    //             name: 'York',
    //             latitude: 53.958332,
    //             longitude: -1.080278
    //         },
    //         {
    //             name: 'Ankorage',
    //             latitude: 61.2173,
    //             longitude: -149.863129
    //         },
    //         {
    //             name: 'Manila',
    //             latitude: 14.583333,
    //             longitude: 120.984222
    //         },
    //         {
    //             name: 'Athens',
    //             latitude: 37.983333,
    //             longitude: 23.733333
    //         },
    //         {
    //             name: 'Tashkent',
    //             latitude: 41.316667,
    //             longitude: 69.25
    //         },
    //         {
    //             name: 'San Jose',
    //             latitude: 9.933333,
    //             longitude: -84.083333
    //         },
    //         {
    //             name: 'Rio de Janeiro',
    //             latitude: -22.906847,
    //             longitude: -43.172896
    //         },
    //         {
    //             name: 'Ann Arbor',
    //             latitude: 42.2808,
    //             longitude: -83.7430
    //         },
    //         {
    //             name: 'London',
    //             latitude: 51.509865,
    //             longitude: -0.118092
    //         },
    //     ]



    //END spoof code


    //end new sunrise / sunset states
    // const [favicon, setFavicon] = useState(`${resp.base_url}${resp.brand.favicon}_light.png`);
    const [favicon, setFavicon] = useState(`${resp.base_url}${resp.brand.favicon}_lite.png`);
    const [siteTitle] = useState(`${response.brand.title}`);
    const [location, setLocation] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [debug, setDebug] = useState([]);
    const [apiData, setApiData] = useState({});
    const [sunApiData, setSunApiData] = useState({});
    const [sunsetX, setSunsetX] = useState(null);
    const [sunrise, setSunrise] = useState(null);
    const [dayLength, setDayLength] = useState(null);
    const [sunSetTime, setSunSetTime] = useState(new Date());
    const [isDayTime, setIsDayTime] = useState(false);
    const [timeAdjustHour, setTimeAdjustHour] = useState();
    const [timeAdjustMinute, setTimeAdjustMinute] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [timeUntilSunset, setTimeUntilSunset] = useState(null);
    const [showDebug, setShowDebug] = useState(false);
    const [sunsetDiff, setSunsetDiff] = useState(null);
    //weather information
    const [weatherData, setWeatherData] = useState(null);

    //event handlers
    const handleDebug = (e) => {
        (debugPannel === "block") ? setDebugPannel("none") : setDebugPannel("block");
    }
    function generateFavicon(icon) {
        //const favicon = document.querySelector('link[rel="icon"]');
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        console.log("favicon", favicon);
        link.href = favicon;
        document.title = siteTitle;
    }
    const handleSpoofLocations = (e) => {
        setSpoofLocation(!spoofLocation);
    }

    const handleSpoofCoordinates = (e) => {
        //get value of selected spoof location
        const spoofLocation = spoofableLocations.find(location => location.name === e.target.value);
        setSpoofCoordinates([spoofLocation.latitude, spoofLocation.longitude]);
        setSpoofCity(spoofLocation.name);
        if (spoofLocation) {
            getLocation()
                .then(local => {
                    setApiData(sunSetSunRiseApi(local));
                    console.log("DEBUG location", apiData);
                    console.log("DEBUG", local);
                    return local
                })
                .then(local => {
                    let requestWeatherData = weatherApi(local);
                    console.log("DEBUG local", local);
                    console.log("DEBUG requestWeatherData", requestWeatherData);
                    // setWeatherData(weatherApi(local));
                    console.log("DEBUG Weather", weatherData);
                })
        }

    }
    const handleTimeAdjustment = (e) => {
        //setTimeAdjustHour(e.target.value);
        //Should be switch case statement
        switch (e) {
            case '+h':
                setSunShiftHour(sunShiftHour + 1);
                break;
            case '-h':
                setSunShiftHour(sunShiftHour - 1);
                break;
            case '+m':
                setSunShiftMinute(sunShiftMinute + 1);
                break;
            case '-m':
                setSunShiftMinute(sunShiftMinute - 1);
                break;
            case 'reset':
                setSunShiftHour(0);
                setSunShiftMinute(0);
                break;
            default:
                break;
        }
        console.log("Debugger", e);
        getLocation()
            .then(local => {
                setApiData(sunSetSunRiseApi(local));
                console.log("DEBUG location", apiData);
                console.log("DEBUG", local);
                return local
            })
            .then(local => {
                let requestWeatherData = weatherApi(local);
                console.log("DEBUG local", local);
                console.log("DEBUG requestWeatherData", requestWeatherData);
                // setWeatherData(weatherApi(local));
                console.log("DEBUG Weather", weatherData);
            })
    }
    //get lattitude and longitude
    const getLocation = async () => {
        if (spoofLocation) {
            setLocation({
                latitude: spoofCoordinates[0],
                longitude: spoofCoordinates[1]
            });
            return ({
                latitude: spoofCoordinates[0],
                longitude: spoofCoordinates[1]
            })
        } else {
            const response = await axios.get('https://ipapi.co/json/');
            console.log(response)
            setLocation(response.data);
            return response.data;
        }

    }
    const weatherApi = async (local) => {
        //put api key into env variable and use it here
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=83b93cfd8523492ca26194608220802&q=${local.latitude},${local.longitude}&appid=b1b15e88fa797225412429c1c50c122a1`);
        //const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=83b93cfd8523492ca26194608220802&q=48107&lang=en&units=m`);
        //https://api.weatherapi.com/v1/current.json?key=83b93cfd8523492ca26194608220802&q=34.1624,-118.1275&appid=b1b15e88fa797225412429c1c50c122a1
        console.log("DEBUG WEATHERAPI RESPONSE", response)
        //may be duplicate sets here. 
        setWeatherData(response.data);
        //return response.data;
    }
    console.log("response_data", `${resp.base_url}${resp.brand.favicon}_light.png`);
    const sunSetSunRiseApi = async (local) => {
        const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${local.latitude}&lng=${local.longitude}&date=today`)
            .then(response => {
                console.log("DEBUGHIT", response.data);
                setSunApiData(response.data);
                const processedSunRise = processSunRise(response.data.results.sunrise)
                setDayLength(response.data.results.day_length);
                //https://api.sunrise-sunset.org/json?lat=34.1624&lng=-118.1275&date=today
                //Michgan Latitude: 45.00109 | Longitude: -86.270685
                /*
 
                */
                //https://api.sunrise-sunset.org/json?lat=45.00109&lng=-45.00109&date=today
                // triggerProcess();
                const dayLength = processDayLength(response.data.results.day_length);
                const sunset = processedSunRise + dayLength;
                setSunsetX(sunset);
                let sunSetTime = new Date();
                sunSetTime.setTime(sunset);
                setSunSetTime(sunSetTime);
                console.log("debug", sunSetTime)
                if (currentTime.getTime() < sunSetTime.getTime()) {
                    setIsDayTime(true);
                    manager.updateConfig({ colorTheme: FakeStoreThemeLight });
                    flex.MainHeader.defaultProps.logoUrl =
                        `${resp.base_url}${resp.logo.logo_name}_light${resp.logo.logo_extension}`;
                    // setFavicon(`${resp.base_url}${resp.brand.favicon}_light.png`);
                    //  setFavicon(`${config.icon}1.png`);
                    setFavicon(`${resp.base_url}${resp.brand.favicon}_lite.png`);
                    generateFavicon();
                    console.log("fav-api", `${favicon}`);
                } else {
                    setIsDayTime(false);
                    generateFavicon();
                    manager.updateConfig({ colorTheme: FakeStoreThemeDark });
                    flex.MainHeader.defaultProps.logoUrl =
                        `${resp.base_url}${resp.logo.logo_name}_dark${resp.logo.logo_extension}`;
                    setFavicon(`${resp.base_url}${resp.brand.favicon}_dark.png`);
                }
                //triggerProcess();
                return [response.data, local];
            }
            )
    }
    function processSunRise(timeSunRise) {
        setApiSunRise(timeSunRise);
        let time = new Date();
        const sunriseTime = timeSunRise.split(':');
        let sunriseHour = parseInt(sunriseTime[0]);
        const sunriseMinute = parseInt(sunriseTime[1]);
        const meridian = timeSunRise.split(' ')[1];
        if (meridian === 'PM') {
            sunriseHour = sunriseHour + 12;
        }
        sunriseHour = sunriseHour - time.getTimezoneOffset() / 60;
        //ADD TESTING HERE TO SEE IF IT IS DAY OR NIGHT
        let sunDate = new Date(time.getFullYear(), time.getMonth(), time.getDate(), sunriseHour + sunShiftHour, sunriseMinute + sunShiftMinute, 0, 0);
        time.setTime(sunDate.getTime());
        console.log("Debugger", sunDate)
        setSunrise(sunDate);
        return sunDate.getTime();
    }

    function processDayLength(timeLength) {
        const timeLengthArray = timeLength.split(':');
        const hour = parseInt(timeLengthArray[0]);
        const minute = parseInt(timeLengthArray[1]);
        //combine hours and minutes to miliseconds
        const dayLength = (hour * 60 * 60 * 1000) + (minute * 60 * 1000);
        setDebug([msToTime(dayLength)]);
        setDayLength(dayLength);
        return dayLength;
    }
    function triggerProcess() {
        if (isLoaded) {
            console.log("Debug", "triggerProcess");
            console.log("DEBUG UseState", currentTime, sunSetTime);
            console.log("Debugger", "triggerProcess", isDayTime);
            //console.log("DEBUG tempDate", tempDate);
            const adj = timeAdjustHour * 60 + timeAdjustMinute;
            setSunsetDiff(sunSetTime.getTime() - currentTime.getTime());
            // if (sunsetDiff <= 155285) {
            //     console.log("DEBUG sunsetDiff", msDiff(sunsetDiff));
            // }
            console.log("DEBUG DIF", sunSetTime.getTime() - currentTime.getTime())


            if (currentTime.getTime() < sunSetTime.getTime() && currentTime.getTime() > sunrise.getTime() && isDayTime === false) {
                setIsDayTime(true);
                console.log("DEBUG DAYTIME Trigger Process", isDayTime)
                manager.updateConfig({ colorTheme: FakeStoreThemeLight });
                flex.MainHeader.defaultProps.logoUrl =
                    `${resp.base_url}${resp.logo.logo_name}_light${resp.logo.logo_extension}`;
                //  setFavicon(config.icon);


            } else if (currentTime.getTime() > sunSetTime.getTime() && isDayTime === true) {
                // weatherApi(location);
                setIsDayTime(false);
                console.log("DEBUG NOTDAYTIME", currentTime, sunSetTime)
                console.log("DEBUG NOTDAYTIME", isDayTime)
                manager.updateConfig({ colorTheme: FakeStoreThemeDark });
                flex.MainHeader.defaultProps.logoUrl =
                    `${resp.base_url}${resp.logo.logo_name}_light${resp.logo.logo_extension}`;
                //https://fsassets-9880.twil.io/fslogo-fstheme2.png
                setIsDayTime(false);
                //  setFavicon(`${resp.base_url}${resp.brand.favicon}_dark.png`);

            }
        }
    }
    //function is not working correctly as expected
    function msToTime(ms) {
        let seconds = (ms / 1000).toFixed(1);
        let minutes = (ms / (1000 * 60)).toFixed(1);
        let hours = (ms / (1000 * 60 * 60)).toFixed(1);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " Sec";
        else if (minutes < 60) return minutes + " Min";
        else if (hours < 24) return hours + " Hrs";
        else return days + " Days"
    }

    //geneating icon
    //favicon test


    function showHidDebugButton() {
        //   setShowDebug(true);
        if (debugButton === 'block') {
            setDebugButton('none');
        } else {
            setDebugButton('block');
        }

        console.log("zap", showDebug);
    }
    //twilio flex:plugins:deploy --major --changelog "Added Time based theme with weather display" --description "Time based theme plugin with quotes and weather display"
    //twilio flex:plugins:release --name "Time Theme" --description "Time based theme plugin with quotes and weather display" --plugin plugin-interface@1.0.0​

    //moment js
    useEffect(() => {
        setIsLoaded(true);
    }, [isLoaded])

    useEffect(() => {
        getLocation()
            .then(local => {
                setApiData(sunSetSunRiseApi(local));
                console.log("DEBUG location", apiData);
                console.log("DEBUG", local);
                return local
            })
            .then(local => {
                let requestWeatherData = weatherApi(local);
                console.log("DEBUG local", local);
                console.log("DEBUG requestWeatherData", requestWeatherData);
                // setWeatherData(weatherApi(local));
                console.log("DEBUG Weather", weatherData);
            })
    }, [isDayTime, spoofLocation, spoofCoordinates, sunShiftHour, sunShiftMinute])

    // have date increment by 1 every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
            triggerProcess();
        }, 1000);
        return () => clearInterval(interval);
    }, [currentTime]);


    return (
        <div>
            <Container>

                <InfoBlock>
                    {weatherData ? <WeatherDisplay weather={weatherData} showHidDebugButton={showHidDebugButton} /> : "loading"}
                </InfoBlock>
                <InfoBlock style={{ display: debugButton }}>
                    <FlexButton onClick={(event) => handleDebug(event)}>Debug Pannel</FlexButton>
                </InfoBlock>


                <Debug style={{ display: debugPannel }}>
                    <InfoBlock>
                        Sun Set Difference: {sunsetDiff ? sunsetDiff : "Loading"}
                    </InfoBlock>
                    <InfoBlock>
                        {
                            location ? `Lattitude: ${location.latitude} || Longitude: ${location.longitude}` : null
                        }
                    </InfoBlock>
                    <InfoBlock>
                //map through apiData
                        {
                            apiData.results ? `Sunrise: ${sunrise}` : null
                        }

                    </InfoBlock>
                    <InfoBlock>
                        SunSet Date : {
                            sunSetTime ? `${sunSetTime.toLocaleTimeString()}` : null
                        }
                    </InfoBlock>
                    <InfoBlock>
                        {
                            apiData.results ? `Sunset: ${sunSetTime}` : null
                        }
                    </InfoBlock>
                    <InfoBlock>
                        dayLength: {dayLength}
                    </InfoBlock>
                    <InfoBlock>
                        DEBUG {debug[0]}
                    </InfoBlock>
                    <InfoBlock>
                        Is Daylight:
                        {
                            isDayTime ? "true" : "false"
                        }
                    </InfoBlock>
                    <InfoBlock>
                        {sunApiData.results ? `Sunrise: ${sunApiData.results.sunrise}` : null}

                    </InfoBlock>
                    <InfoBlock>
                        {
                            currentTime ? `Current Time: ${currentTime}` : null
                        }
                    </InfoBlock>
                    <InfoBlock>
                        {
                            `Spoof Location: ${spoofLocation}`
                        }
                    </InfoBlock>
                    <InfoBlock>

                    </InfoBlock>


                    <DemoBlock>

                        <InfoBlock>
                            Hours <FlexButton onClick={(e) => handleTimeAdjustment('+h')}>+</FlexButton><FlexButton onClick={(e) => handleTimeAdjustment('-h')}>-</FlexButton>&nbsp;&nbsp;
                            Minutes <FlexButton onClick={(e) => handleTimeAdjustment('+m')}>+</FlexButton> <FlexButton onClick={(e) => handleTimeAdjustment('-m')}>-</FlexButton>
                        </InfoBlock>
                        <InfoBlock>
                            <FlexButton onClick={(e) => handleTimeAdjustment('reset')}>Reset</FlexButton>
                        </InfoBlock>
                    </DemoBlock>
                    <DemoBlock>
                        <InfoBlock>
                            <SelectSpoofLocation onChange={(e) => handleSpoofCoordinates(e)}>
                                {
                                    spoofableLocations.map((element) => {
                                        return (<option key={element.name} value={element.name}>{element.name}</option>);
                                    })
                                }
                            </SelectSpoofLocation>
                            <SpanContainer>
                                {
                                    `Spoof Location: ${spoofCoordinates[0]}, ${spoofCoordinates[1]}`
                                }
                            </SpanContainer>
                        </InfoBlock>
                        <InfoBlock>
                            <FlexButton onClick={(e) => handleSpoofLocations(e)}>Spoof Location</FlexButton>
                        </InfoBlock>
                    </DemoBlock>
                </Debug>
            </Container>
        </div>
    )
}
const SpanContainer = styled("span")`
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};
    `
const Container = styled("div")`
    display: block;
    color: ${props => props.theme.calculated.textColor};

    `
const Debug = styled("div")`
    
    `
const InfoBlock = styled("div")`
    display: block;
    font-size: 12px; 
    padding:2px;
    color: ${props => props.theme.calculated.textColor};
    `
const FlexButton = styled("button")`
background-color: ${props => props.theme.calculated.backgroundColor};

`
const DemoBlock = styled("div")`
    display: block;
    border:1px solid ${props => props.theme.calculated.backgroundColor};
    `
const SelectSpoofLocation = styled("select")`
    display: block;
    `

export default withTheme(TimeTheme)