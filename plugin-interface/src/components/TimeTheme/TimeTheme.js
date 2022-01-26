import React, { useState, useEffect } from 'react'
import { withTheme } from '@twilio/flex-ui';
import FeatherTheme from './FeatherCorpTheme';
const axios = require('axios');


const TimeTheme = ({ key, manager }) => {
    const [time, setTime] = useState(new Date());
    const [location, setLocation] = useState(null);
    const [sunset, setSunset] = useState(null);
    const [sunsetDate, setSunsetDate] = useState(new Date());
    const [sunsetHour, setSunsetHour] = useState(null);
    const [sunsetMinute, setSunsetMinute] = useState(null);
    const [sunrise, setSunrise] = useState(null);
    const [sunriseDate, setSunriseDate] = useState(new Date());
    const [isItSunset, setIsItSunset] = useState(false);
    const [deBug, setDeBug] = useState([]);
    const [deBugRise, setDeBugRise] = useState([]);
    const [isItSunrise, setIsItSunrise] = useState(false);
    const [isItDay, setIsItDay] = useState(false);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const offset = time.getTimezoneOffset() / 60;
    const adjust = time.getTime() + (8 * 60 * 60 * 1000);
    //const adjust = 0;


    //get lattitude and longitude
    const getLocation = async () => {
        const response = await axios.get('https://ipapi.co/json/');
        console.log(response)
        setLocation(response.data);
        return response.data;
    }
    const findSunset = (sunny) => {
        const sunsetTime = sunny.results.sunset.split(':');
        const sunsetHour = parseInt(sunsetTime[0]);
        const sunsetMinute = parseInt(sunsetTime[1]);
        const sunsetOffset = sunsetHour - offset;
        const sunsetDate = new Date(time.getFullYear(), time.getMonth(), time.getDate(), sunsetOffset, sunsetMinute);
        if (sunsetDate.getTime() >= time.getTime()) {

            setIsItSunset(true);
        }
        else {
            setIsItSunset(false);

        }
        setDeBug([sunsetDate.getTime(), time.getTime(), time.getTime() - sunsetDate.getTime()]);
        return sunsetDate;
    }
    /*
    START NEW CODE
    */
    const nDate = (time) => {
        let sunriseTime = time.split(':');
        let sunriseHour = parseInt(sunriseTime[0]);
        console.log("Hour: " + sunriseHour);
        let sunriseMinute = parseInt(sunriseTime[1]);
        const meridian = sunriseTime[2].split(' ');
        const fakeDate = new Date();
        if (meridian[1] === 'PM') {
            sunriseHour += 12;
        }
        const retDate = new Date(Date.UTC(fakeDate.getFullYear(), fakeDate.getMonth(), fakeDate.getUTCDate(), sunriseHour, sunriseMinute, 0, 0));

        return retDate;
    }
    const ssDate = (time) => {
        //sunrise time
        let sunriseTime = time.split(':');
        let sunriseHour = parseInt(sunriseTime[0]);
        console.log("Sunrise Hour: " + sunriseHour);
        let sunriseMinute = parseInt(sunriseTime[1]);
        const meridian = sunriseTime[2].split(' ');
        const fakeDate = new Date();
        if (meridian[1] === 'PM') {
            sunriseHour += 12;
        }
        const retDate = new Date(Date.UTC(fakeDate.getFullYear(), fakeDate.getMonth(), fakeDate.getUTCDate() + 1, sunriseHour, sunriseMinute, 0, 0));

        return retDate;
    }
    const qDate = () => {
        const nowDate = new Date();
        const nowDateUTC = new Date(Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(), nowDate.getMinutes(), nowDate.getSeconds(), nowDate.getMilliseconds()));
        return nowDate;
    }
    // const sunsetXDate = ssDate(results.sunset);
    // const sunriseXDate = nDate(results.sunrise);
    // const nowxDate = qDate();



    /*
    END NEW CODE

    */
    const findSunrise = (sunny) => {
        const sunriseTime = sunny.results.sunrise.split(':');
        const sunriseHour = parseInt(sunriseTime[0] - offset);
        if (sunny.results.sunrise.indexOf("PM") > -1) {
            const sunriseHour = parseInt(sunriseTime[0]);
        }

        const sunriseMinute = parseInt(sunriseTime[1]);
        const sunriseOffset = sunriseHour - offset;
        const sunriseDate = new Date(time.getFullYear(), time.getMonth(), time.getDate(), sunriseOffset, sunriseMinute);
        // if (sunriseDate.getTime() <= time.getTime()) {
        //     setIsItSunset(false);
        // }
        // else {
        //     setIsItSunset(true);
        // }
        setDeBugRise([`Sunrise ${sunriseDate.getHours()} : ${sunriseDate.getMinutes()}`, `Now ${time.getHours()} : ${time.getMinutes()}`, `Sunset: ${sunsetDate.getHours()}:${sunsetDate.getMinutes()}`]);
        return sunriseDate;
    }
    //rename this function
    const getSunset = async (local) => {
        const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${local.latitude}&lng=${local.longitude}&date=today`);
        //  onlt really need *date
        //https://api.sunrise-sunset.org/json?lat=34.1624&lng=-118.1275&date=today
        setSunsetDate(ssDate((response.data.results.sunset)));
        setSunriseDate(nDate(response.data.results.sunrise));
        // setSunsetDate(ssDate(response.results.sunset));
        // setSunriseDate(nDate(response.results.sunrise));
        if (qDate().getTime() < sunsetDate.getTime()) {
            setIsItDay(true);
            manager.updateConfig({ colorTheme: FeatherTheme });
        }
        else {
            setIsItDay(false);
        }

        //34.1624 -118.1275
        //https://api.sunrise-sunset.org/json?lat=34.1624&lng=-118.1275&date=today
        return response.data;
    }


    useEffect(() => {
        getLocation()
            .then(local => {
                getSunset(local);
            })

    }, [])
    useEffect(() => {
    }, [sunset])


    //get sunrise from axios call

    useEffect(() => {

        setInterval(() => {
            setTime(new Date());
            if (isItDay === true) {
                // manager.updateConfig({ colorTheme: FeatherTheme });
                // setDeBug([isItDay])
            }
        }, 1000);
    }, []);



    const myName = "Vincent"
    return (
        <div>
            Now Time: what the hell <strong>{`${hours}: ${minutes}:${seconds} -- ${offset}`}</strong>?
            <p>
                {
                    location ? `Lattitude: ${location.latitude} Longitude: ${location.longitude}` : null
                }
            </p>
            <p>


            </p>
            <p>

            </p>
            <p>

            </p>
            <p>

            </p>
        </div>
    )
}

export default withTheme(TimeTheme)