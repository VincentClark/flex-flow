import React, { useState, useEffect } from 'react'
import { withTheme } from '@twilio/flex-ui';
import FeatherTheme from './FeatherCorpTheme';
const axios = require('axios');


const TimeTheme = ({ key, manager }) => {

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


    //get lattitude and longitude
    const getLocation = async () => {
        const response = await axios.get('https://ipapi.co/json/');
        console.log(response)
        setLocation(response.data);
        return response.data;
    }

    const sunSetSunRiseApi = async (local) => {
        const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${local.latitude}&lng=${local.longitude}&date=today`)
            .then(response => {
                console.log("DEBUGHIT", response.data);
                setSunApiData(response.data);
                const processedSunRise = processSunRise(response.data.results.sunrise)
                setDayLength(response.data.results.day_length);
                //https://api.sunrise-sunset.org/json?lat=34.1624&lng=-118.1275&date=today
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
                }
                //triggerProcess();
                return response.data;
            }
            )
        //  onlt really need *date
    }
    function triggerProcess() {
        console.log("DEBUG UseState", currentTime, sunSetTime);
        if (currentTime.getTime() < sunSetTime.getTime()) {
            setIsDayTime(true);
            console.log("DEBUG DAYTIME", isDayTime)

            manager.updateConfig({ colorTheme: FeatherTheme });
        } else {
            console.log("DEBUG NOTDAYTIME", currentTime, sunSetTime)
            setIsDayTime(false);
        }
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
        let sunDate = new Date(time.getFullYear(), time.getMonth(), time.getDate(), sunriseHour, sunriseMinute);
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
    //moment js

    useEffect(() => {
        getLocation()
            .then(local => {
                setApiData(sunSetSunRiseApi(local));
                console.log(apiData);
            })
    }, [])





    const myName = "Vincent"
    return (
        <div>
            <div>
                <button onClick={() => { triggerProcess() }}>TEST</button>
            </div>
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
        </div>
    )
}

export default withTheme(TimeTheme)