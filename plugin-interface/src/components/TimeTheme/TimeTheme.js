import React, { useState, useEffect } from 'react'
import { withTheme } from '@twilio/flex-ui';
import styled from 'react-emotion';
import FakeStoreThemeLight from './FakeStoreThemeLight';
import FeatherTheme from './FeatherCorpTheme';
import FakeStoreThemeDark from './FakeStoreThemeDark';
import WeatherDisplay from './WeatherDisplay';
const axios = require('axios');

// well you earned it, and while napping think of cool ways to integrate crypto into flex. 
// best to get a bottle of roses first. 
const TimeTheme = ({ key, manager, flex }) => {
    /*
   


    */
    const [sunShiftHour, setSunShiftHour] = useState(0);
    const [sunShiftMinute, setSunShiftMinute] = useState(0);
    const [spoofLocation, setSpoofLocation] = useState(false);
    const [debugPannel, setDebugPannel] = useState('none');
    //Ann Arbor Mi - 42.2808, -83.7430
    //const [spoofCordinates, setSpoofCordinates] = useState([-42.2808, -83.7430]);

    //Melborne AU -37.813611, 144.963056
    // const [spoofCordinates, setSpoofCordinates] = useState([-37.813611, 144.963056]);
    //York UK 53.958332, -1.080278
    //const [spoofCordinates, setSpoofCordinates] = useState([53.958332, -1.080278]);
    //Ankorage AK  61.2173,-149.863129
    //const [spoofCordinates, setSpoofCordinates] = useState([61.2173, -149.863129]);
    //Manila PH 14.583333, 120.984222
    //const [spoofCordinates, setSpoofCordinates] = useState([14.5982715, 120.989144]);
    //Athens GR 37.983333, 23.733333
    //const [spoofCordinates, setSpoofCordinates] = useState([37.983333, 23.733333]);
    //Tashkent UZ 41.316667, 69.25
    //const [spoofCordinates, setSpoofCordinates] = useState([41.316667, 69.25]);
    //San Jose Costa Rica 9.933333, -84.083333
    //const [spoofCordinates, setSpoofCordinates] = useState([9.933333, -84.083333]);
    //Rio de Janeiro BR -22.906847, -43.172896
    //const [spoofCordinates, setSpoofCordinates] = useState([-22.906847, -43.172896]);



    //END spoof code

    //New Sunrise / Sunset states
    const [nSunrise, setNSunrise] = useState(null);
    const [nSunset, setNSunset] = useState(null);
    const [astroData, setAstroData] = useState(null);
    //end new sunrise / sunset states

    const [favicon, setFavicon] = useState('https://fsassets-9880.twil.io/FSIcon_TH1.png');
    const [siteTitle] = useState('FakeStore');
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
    const [timeAdjustHour, setTimeAdjustHour] = useState(0);
    const [timeAdjustMinute, setTimeAdjustMinute] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [timeUntilSunset, setTimeUntilSunset] = useState(null);

    const [cTangerine, setCTangerin] = useState('HSL(26, 91, 5)');
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
    const handelDebug = (e) => {
        (debugPannel === "block") ? setDebugPannel("none") : setDebugPannel("block");
    }
    //get lattitude and longitude
    const getLocation = async () => {
        if (spoofLocation) {
            setLocation({
                latitude: spoofCordinates[0],
                longitude: spoofCordinates[1]
            });
            return ({
                latitude: spoofCordinates[0],
                longitude: spoofCordinates[1]
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
                        "https://fsassets-9880.twil.io/fslogo-fstheme1.png";
                    setFavicon('https://fsassets-9880.twil.io/FSIcon_TH1.png');
                } else {
                    setIsDayTime(false);
                    manager.updateConfig({ colorTheme: FakeStoreThemeDark });
                    flex.MainHeader.defaultProps.logoUrl =
                        "https://fsassets-9880.twil.io/fslogo-fstheme2.png";
                    setFavicon('https://fsassets-9880.twil.io/FSIcon_TH2.png')
                }
                //triggerProcess();
                return [response.data, local];
            }
            )
    }
    function processSunRise(timeSunRise) {
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
        setSunrise(sunDate);
        return sunDate.getTime();

    }
    function processDayLength(timeLength) {
        const timeLengthArray = timeLength.split(':');
        const hour = parseInt(timeLengthArray[0]);
        const minute = parseInt(timeLengthArray[1]);
        //combine hours and minutes to miliseconds
        const dayLength = (hour * 60 * 60 * 1000) + (minute * 60 * 1000);
        setDebug([dayLength, hour, minute]);
        setDayLength(dayLength);
        return dayLength;
    }
    function triggerProcess() {
        if (isLoaded) {
            console.log("DEBUG UseState", currentTime, sunSetTime);
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
                    "https://fsassets-9880.twil.io/fslogo-fstheme1.png"
                setFavicon('https://fsassets-9880.twil.io/FSIcon_TH1.png')

            } else {
                // weatherApi(location);
                console.log("DEBUG NOTDAYTIME", currentTime, sunSetTime)
                console.log("DEBUG NOTDAYTIME", isDayTime)
                manager.updateConfig({ colorTheme: FakeStoreThemeDark });
                flex.MainHeader.defaultProps.logoUrl =
                    "https://fsassets-9880.twil.io/fslogo-fstheme2.png"
                //https://fsassets-9880.twil.io/fslogo-fstheme2.png
                setIsDayTime(false);
                setFavicon('https://fsassets-9880.twil.io/FSIcon_TH2.png')
            }
        }
    }
    function triggerProcessX() {
        if (isLoaded) {
            //
            setIsDayTime(false);
            console.log("DEBUG UseState", currentTime, sunSetTime);
            //console.log("DEBUG tempDate", tempDate);
            const adj = timeAdjustHour * 60 + timeAdjustMinute;
            if (sunSetTime.getTime() - currentTime.getTime() < 273052 && ctL >= 30) {
                setCTL(ctL - 5);
                setCSH(csH - 10);
                setCSS(csS - 10);
                setCSL(csL - 10);

            }
            if (currentTime.getTime() < sunSetTime.getTime()) {
                setIsDayTime(true);
                console.log("DEBUG DAYTIME", isDayTime)
                console.log("DEBUG DIF", sunSetTime.getTime() - currentTime.getTime())
                console.log("DEBUG msToTime", msToTime(sunSetTime.getTime() - currentTime.getTime()))
                //273052 6 minutes
                manager.updateConfig({
                    colorTheme: {
                        light: lightTheme,
                        baseName: 'GreyLight',
                        // base theme colors
                        colors: {
                            tabSelectedColor: `HSL(${ctH}, ${ctS}%, ${ctL}%)`,
                            focusColor: `HSL(${ctH}, ${ctS}%, ${ctL}%)`,
                            completeTaskColor: `HSL(${ctH}, ${ctS}%, ${ctL}%)`,
                            defaultButtonColor: `HSL(${ctH}, ${ctS}%, ${ctL}%)`,
                            flexBlueColor: `HSL(${ctH}, ${ctS}%, ${ctL}%)`,
                        },

                        // component overrides
                        overrides: {

                            // top header
                            MainHeader: {
                                Container: {
                                    background: `HSL(${csH}, ${ctS}%, ${ctL}%)`,
                                    color: `HSL(${csH}, ${csS}%, ${csL}%)`,
                                }
                            },

                            // left sidebar
                            SideNav: {
                                Container: {
                                    background: `HSL(${csH}, ${csS}%, ${csL}%)`,
                                    color: `HSL(${ctH}, ${ctS}%, ${ctL}%)`,
                                },
                                Button: {
                                    background: `HSL(${csH}, ${csS}%, ${csL}%)`,
                                    color: `HSL(${ctH}, ${ctS}%, ${ctL}%)`,
                                    lightHover: !lightTheme
                                },
                                Icon: {
                                    color: `HSL(${ctH}, ${ctS}%, ${ctL}%)`,
                                }
                            },

                            // admin plugin
                            FlexAdmin: {
                                DashboardCard: {
                                    Icon: {
                                        backgroundColor: cTangerineLight
                                    }
                                }
                            }

                        }
                    }
                });
            } else {
                console.log("DEBUG NOTDAYTIME", currentTime, sunSetTime)
                manager.updateConfig({ colorTheme: FakeStoreThemeDark });
                setIsDayTime(false);
            }

        }
    }
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
                    <FlexButton onClick={(event) => handelDebug(event)}>Debug Pannel</FlexButton>
                </InfoBlock>

                <InfoBlock>
                    {weatherData ? <WeatherDisplay weather={weatherData} /> : "loading"}
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
                        DEBUG {debug[0]} and {debug[1]} and sunset time
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
                        DEBUG DIFF {debugDiff ? debugDiff : "Loading"}
                    </InfoBlock>
                    <InfoBlock>
                        CTL: {ctL ? ctL : null}
                    </InfoBlock>
                    <InfoBlock>
                        <FlexButton onClick={() => { triggerProcessX() }}>TEST</FlexButton>
                    </InfoBlock>
                </Debug>
            </Container>
        </div>
    )
}
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


export default withTheme(TimeTheme)