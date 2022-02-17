import React, { useState, useEffect } from 'react'
import { FlexContext, withTheme } from '@twilio/flex-ui';
import styled from 'react-emotion';
import FakeStoreThemeLight from './FakeStoreThemeLight';

import FakeStoreThemeDark from './FakeStoreThemeDark';
import WeatherDisplay from './WeatherDisplay';
const axios = require('axios');

// well you earned it, and while napping think of cool ways to integrate crypto into flex. 
// best to get a bottle of roses first. 
const TimeTheme = ({ key, manager, flex, config }) => {
    /*
   


    */
    const [sunShiftHour, setSunShiftHour] = useState(0);
    const [sunShiftMinute, setSunShiftMinute] = useState(0);
    const [apiSunRise, setApiSunRise] = useState(null);
    const [spoofLocation, setSpoofLocation] = useState(false);
    const [debugPannel, setDebugPannel] = useState('none');
    const [debugButton, setDebugButton] = useState('block');
    //Ann Arbor Mi - 42.2808, -83.7430
    //const [spoofCoordinates, setSpoofCoordinates] = useState([-42.2808, -83.7430]);

    //Melborne AU -37.813611, 144.963056
    //  const [spoofCoordinates, setSpoofCoordinates] = useState([-37.813611, 144.963056]);
    //York UK 53.958332, -1.080278
    //const [spoofCoordinates, setSpoofCoordinates] = useState([53.958332, -1.080278]);
    //Ankorage AK  61.2173,-149.863129
    //const [spoofCoordinates, setSpoofCoordinates] = useState([61.2173, -149.863129]);
    //Manila PH 14.583333, 120.984222
    //const [spoofCoordinates, setSpoofCoordinates] = useState([14.5982715, 120.989144]);
    //Athens GR 37.983333, 23.733333
    //const [spoofCoordinates, setSpoofCoordinates] = useState([37.983333, 23.733333]);
    //Tashkent UZ 41.316667, 69.25
    //const [spoofCoordinates, setSpoofCoordinates] = useState([41.316667, 69.25]);
    //San Jose Costa Rica 9.933333, -84.083333
    //const [spoofCoordinates, setSpoofCoordinates] = useState([9.933333, -84.083333]);
    //Rio de Janeiro BR -22.906847, -43.172896
    //const [spoofCoordinates, setSpoofCoordinates] = useState([-22.906847, -43.172896]);
    const [spoofCoordinates, setSpoofCoordinates] = useState([]);
    const [spoofCity, setSpoofCity] = useState('');
    const spoofableLocations =
        [
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
        ]



    //END spoof code


    //end new sunrise / sunset states
    const [favicon, setFavicon] = useState(`${config.icon}1.png`);
    const [siteTitle] = useState('FakeStore Flex');
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


    const [ctH, setCTH] = useState(26);
    const [ctS, setCTS] = useState(91);
    const [ctL, setCTL] = useState(55);
    const [csH, setCSH] = useState(280);
    const [csS, setCSS] = useState(16);
    const [csL, setCSL] = useState(93);
    const [cTangerineLight, setCTangerinLight] = useState('HSL(26, 91%, 23%)'); // lighter version of cTangerine
    const [cSolitude, setCSolitude] = useState('HSL(280, 16%, 93%)');
    const [sunsetDiff, setSunsetDiff] = useState(null);
    const [lightTheme, setLightTheme] = useState(true);
    const [debugDiff, setDebugDiff] = useState(0);
    //weather information
    const [weatherData, setWeatherData] = useState(null);

    //event handlers
    const handleDebug = (e) => {
        (debugPannel === "block") ? setDebugPannel("none") : setDebugPannel("block");
    }

    const handleSpoofLocations = (e) => {
        setSpoofLocation(!spoofLocation);
    }

    const handleSpoofCoordinates = (e) => {
        //get value of selected spoof location
        const spoofLocation = spoofableLocations.find(location => location.name === e.target.value);
        console.log("Debugger", spoofLocation);
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
                        `${config.logo}1.png`;
                    setFavicon(`${config.icon}1.png`);
                } else {
                    setIsDayTime(false);
                    manager.updateConfig({ colorTheme: FakeStoreThemeDark });
                    flex.MainHeader.defaultProps.logoUrl =
                        `${config.logo}2.png`;
                    setFavicon(`${config.logo}2.png`);
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
            console.log("Debugger", "triggerProcess");
            //console.log("DEBUG tempDate", tempDate);
            const adj = timeAdjustHour * 60 + timeAdjustMinute;
            setSunsetDiff(sunSetTime.getTime() - currentTime.getTime());
            // if (sunsetDiff <= 155285) {
            //     console.log("DEBUG sunsetDiff", msDiff(sunsetDiff));
            // }
            console.log("DEBUG DIF", sunSetTime.getTime() - currentTime.getTime())


            if (currentTime.getTime() < sunSetTime.getTime() && currentTime.getTime() > sunrise.getTime()) {
                setIsDayTime(true);
                console.log("DEBUG DAYTIME", isDayTime)
                manager.updateConfig({ colorTheme: FakeStoreThemeLight });
                flex.MainHeader.defaultProps.logoUrl =
                    `${config.logo}1.png`;
                setFavicon(`${config.icon}1.png`);

            } else {
                // weatherApi(location);
                console.log("DEBUG NOTDAYTIME", currentTime, sunSetTime)
                console.log("DEBUG NOTDAYTIME", isDayTime)
                manager.updateConfig({ colorTheme: FakeStoreThemeDark });
                flex.MainHeader.defaultProps.logoUrl =
                    `${config.logo}2.png`;
                //https://fsassets-9880.twil.io/fslogo-fstheme2.png
                setIsDayTime(false);
                setFavicon(`${config.icon}2.png`)
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
    function triggerProcessx() {

    }

    //geneating icon
    //favicon test
    function generateFavicon(icon) {
        //const favicon = document.querySelector('link[rel="icon"]');
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = favicon;
        document.title = siteTitle;
    }

    function showHidDebugButton() {
        setShowDebug(!showDebug);
    }

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
    }, [isDayTime])
    useEffect(() => {
    }, [ctS, ctH, ctL, csS, csH, csL])
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
                {generateFavicon()}
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