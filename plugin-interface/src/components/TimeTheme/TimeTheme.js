import React, { useState, useEffect } from 'react'
import { withTheme } from '@twilio/flex-ui';
const axios = require('axios');

const TimeTheme = () => {
    const [time, setTime] = useState(new Date());
    const [location, setLocation] = useState(null);
    const [sunset, setSunset] = useState(null);
    const [sunsetDate, setSunsetDate] = useState(new Date);
    const [sunsetHour, setSunsetHour] = useState(null);
    const [sunsetMinute, setSunsetMinute] = useState(null);
    const [isItSunset, setIsItSunset] = useState(false);
    const [deBug, setDeBug] = useState([]);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const offset = time.getTimezoneOffset() / 60;

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
        const sunsetDate = new Date(time.getFullYear(), time.getMonth(), time.getDate(), sunsetOffset - 3, sunsetMinute);
        if (sunsetDate.getTime() <= time.getTime()) {
            setIsItSunset(true);
        }
        else {
            setIsItSunset(false);
        }

        return sunsetDate;
    }
    const getSunset = async (local) => {
        const response = await axios.get(`https://api.sunrise-sunset.org/json?lat=${local.latitude}&lng=${local.longitude}&date=today`);
        setSunset(response.data);
        setSunsetDate(findSunset(response.data));
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
        }, 1000);
    }, []);



    const myName = "Vincent"
    return (
        <div>
            Now Time: what the hell <strong>{`${hours}: ${minutes}:${seconds} -- ${offset}`}</strong>?
            <p>
                {
                    location ? `${location.latitude} ${location.longitude}` : null
                }
            </p>
            <p>
                {
                    sunset ? `SUNSET ${sunsetDate.getHours()} ${sunsetDate.getMinutes()}` : null
                }

            </p>
            <p>
                {
                    isItSunset ? "SUNSET" : "NOT SUNSET"
                }
            </p>
        </div>
    )
}

export default withTheme(TimeTheme)