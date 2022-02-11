import React, { useState, useEffect } from 'react'
import { withTheme } from '@twilio/flex-ui';
import FeatherTheme from './FeatherCorpTheme';
import FeatherThemeDark from './FeatherCorpThemeDark';
import WeatherDisplay from './WeatherDisplay';
const axios = require('axios');

// well you earned it, and while napping think of cool ways to integrate crypto into flex. 
// best to get a bottle of roses first. 
const TimeTheme = ({ key, manager }) => {
    // const cTangerine = 'HSL(26, 91%, 55%)';
    // const cTangerineLight = 'HSL(26, 91%, 93%)'; // lighter version of cTangerine
    // const cSolitude = 'HSL(280, 16%, 93%)';
    //     const cTangerine = 'HSL(26, 91%, 5%)';
    // const cTangerineLight = 'HSL(26, 91%, 23%)'; // lighter version of cTangerine
    // const cSolitude = 'HSL(280, 16%, 93%)';
    //const adjust = 0;
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
    const [sunShiftHour, setSunShiftHour] = useState(0);
    const [sunShiftMinute, setSunShiftMinute] = useState(0);
    const [debugDiff, setDebugDiff] = useState(0);
    //weather information
    const [weatherData, setWeatherData] = useState(null);

    //get lattitude and longitude
    const getLocation = async () => {
        const response = await axios.get('https://ipapi.co/json/');
        console.log(response)
        setLocation(response.data);
        return response.data;
    }
    const weatherApi = async (local) => {
        //put api key into env variable and use it here
        // const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=83b93cfd8523492ca26194608220802&q=${local.latitude},${local.longitude}&appid=b1b15e88fa797225412429c1c50c122a1`);
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=83b93cfd8523492ca26194608220802&q=96815&appid=b1b15e88fa797225412429c1c50c122a1`);
        //Hawaii Test 96815
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
                    manager.updateConfig({ colorTheme: FeatherTheme });
                } else {
                    setIsDayTime(false);
                    manager.updateConfig({ colorTheme: FeatherThemeDark });
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
            let arby = (sunSetTime.getTime() - currentTime) / 10000000
            if (sunSetTime.getTime() - currentTime.getTime() <= 1000000) {
                console.log("DEBUG ARBY", arby);
                setDebugDiff(sunsetDiff / 1000000);

                //place mins here
                //need to wrap these in a second set of variables.
                let ctlPercent = 55 * debugDiff;
                let ctsPercent = 91 * debugDiff;
                let cssPercent = 16 * debugDiff;
                let clsPercent = 93 * debugDiff;
                (ctlPercent > 5) ? setCTL(ctlPercent) : setCTL(5);
                // if (ctsPercent > 45) setCTS(ctsPercent)
                //if (cssPercent > 16) setCSS(cssPercent)
                if (clsPercent > 80) setCSL(clsPercent)

                // setCTL(55 * debugDiff);
                // setCTS(91 * debugDiff);
                // // setCSH(csH * debugDiff);
                // setCSS(16 * debugDiff);
                // setCSL(93 * debugDiff);

                //need to not call this so much. Going to get worse with the API calls.
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
                                    background: `HSL(${ctH}, ${ctS}%, ${ctL}%)`,
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
            } else if (currentTime.getTime() < sunSetTime.getTime()) {
                setIsDayTime(true);
                console.log("DEBUG DAYTIME", isDayTime)
                manager.updateConfig({ colorTheme: FeatherTheme });

            } else {
                // weatherApi(location);
                console.log("DEBUG NOTDAYTIME", currentTime, sunSetTime)
                console.log("DEBUG NOTDAYTIME", isDayTime)
                manager.updateConfig({ colorTheme: FeatherThemeDark });
                setIsDayTime(false);
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
                manager.updateConfig({ colorTheme: FeatherThemeDark });
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

            <div>
                {weatherData ? <WeatherDisplay weather={weatherData} /> : "loading"}
            </div>
            <p>
                Sun Set Difference: {sunsetDiff ? sunsetDiff : "Loading"}
            </p>
            <p>
                {
                    location ? `Lattitude: ${location.latitude} || Longitude: ${location.longitude}` : null
                }
            </p>
            <p>
                //map through apiData
                {
                    apiData.results ? `Sunrise: ${sunrise}` : null
                }

            </p>
            <p>
                SunSet Date : {
                    sunSetTime ? `${sunSetTime.toLocaleTimeString()}` : null
                }
            </p>
            <p>
                {
                    apiData.results ? `Sunset: ${sunSetTime}` : null
                }
            </p>
            <p>
                dayLength: {dayLength}
            </p>
            <p>
                DEBUG {debug[0]} and {debug[1]} and sunset time
            </p>
            <p>
                Is Daylight:
                {
                    isDayTime ? "true" : "false"
                }
            </p>
            <p>
                {sunApiData.results ? `Sunrise: ${sunApiData.results.sunrise}` : null}

            </p>
            <p>
                {
                    currentTime ? `Current Time: ${currentTime}` : null
                }
            </p>
            <p>
                DEBUG DIFF {debugDiff ? debugDiff : "Loading"}
            </p>
            <p>
                CTL: {ctL ? ctL : null}
            </p>
            <div>
                <button onClick={() => { triggerProcessX() }}>TEST</button>
            </div>
        </div>
    )
}

export default withTheme(TimeTheme)