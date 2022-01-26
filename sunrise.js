results = {
    "sunrise": "2:53:06 PM",
    "sunset": "1:16:12 AM",
    "solar_noon": "8:04:39 PM",
    "day_length": "10:23:06",
    "civil_twilight_begin": "2:27:48 PM",
    "civil_twilight_end": "1:41:31 AM",
    "nautical_twilight_begin": "1:57:28 PM",
    "nautical_twilight_end": "2:11:51 AM",
    "astronomical_twilight_begin": "1:27:40 PM",
    "astronomical_twilight_end": "2:41:38 AM"
}


const currentUTCTime = () => {
    const now = new Date;
    const utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    return utc_timestamp
}


const nDate = (time) => {
    let sunriseTime = time.split(':');
    let sunriseHour = parseInt(sunriseTime[0]);
    console.log("Hour: " + sunriseHour);
    let sunriseMinute = parseInt(sunriseTime[1]);
    meridian = sunriseTime[2].split(' ');
    const fakeDate = new Date();
    if (meridian[1] === 'PM') {
        sunriseHour += 12;
    }
    retDate = new Date(Date.UTC(fakeDate.getFullYear(), fakeDate.getMonth(), fakeDate.getUTCDate() + 1, sunriseHour, sunriseMinute, 0, 0));

    return retDate;
}
const ssDate = (time) => {
    //sunrise time
    let sunriseTime = time.split(':');
    let sunriseHour = parseInt(sunriseTime[0]);
    console.log("Sunrise Hour: " + sunriseHour);
    let sunriseMinute = parseInt(sunriseTime[1]);
    meridian = sunriseTime[2].split(' ');
    const fakeDate = new Date();
    if (meridian[1] === 'PM') {
        sunriseHour += 12;
    }
    retDate = new Date(Date.UTC(fakeDate.getFullYear(), fakeDate.getMonth(), fakeDate.getUTCDate(), sunriseHour, sunriseMinute, 0, 0));

    return retDate;
}
const qDate = () => {
    const nowDate = new Date();
    //const nowDateUTC = new Date(Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(), nowDate.getMinutes(), nowDate.getSeconds(), nowDate.getMilliseconds()));
    const now = currentUTCTime();
    console.log("BO", now);
    nowDate.setTime(now);
    console.log("NOW", nowDate);
    return nowDate;
}

UTCtime = currentUTCTime(); //current UTC time
const xTime = new Date();
//console.log(UTCtime);
const standInDate = "1:56:00 PM";
const sunsetXDate = ssDate(results.sunset);
const sunriseXDate = nDate(results.sunrise);
const nowxDate = qDate();

console.log("Sunset Time Stamp", sunsetXDate);
console.log("Sunrise Time Stamp", sunriseXDate);
console.log("Now", nowxDate);

const nowUTCtime = new Date();
const adjUTCtime = nowUTCtime.setTime(UTCtime)
// console.log("adjust", adjUTCtime)
// console.log("UTC Now", nowUTCtime);
// console.log("fulltestdate", nowUTCtime.getTime());
console.log("Now UTCtime", UTCtime);
//console.log("sunrise hour: " + sunriseHour("12 PM"));

const sunsetXDateTime = sunsetXDate.getTime();
const sunriseXDateTime = sunriseXDate.getTime();
const nowUTCtimeTime = nowxDate.getTime();



const daylight = (sunrise, sunset, now) => {
    console.log("now", now)
    console.log("sunrise", sunrise)
    console.log("sunset", sunset)
    console.log("now - sunset", sunset - now)
    console.log("now - sunrise", sunrise - now)
    //log minutes until sunset
    const timeDiff = sunset - now;
    //return hours and minutes until sunset
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    console.log("hours", hours);
    console.log("minutes", minutes);
    if (now < sunset) {
        return true;
    } else {
        return false;
    }
}
const timeToSunset = (sunset, now) => {
    const timeDiff = sunset - now;
    //return hours and minutes until sunset
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    return hours;
}

const qSunSet = ssDate(results.sunset).getTime();
const qSunRise = nDate(results.sunrise).getTime();
const qNow = qDate().getTime();

const finalTime = daylight(qSunRise, qSunSet, qNow);
console.log("finalTime", finalTime);

// console.log('timeToSunset', timeToSunset(sunsetXDateTime, nowUTCtimeTime));
// console.log("is it daylight?", daylight(sunsetXDateTime, sunriseXDateTime, nowUTCtimeTime));


// console.log("---------------------");

// create now date and transform into UTC
const nowDate = new Date();
const nowDateUTC = new Date(Date.UTC(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(), nowDate.getMinutes(), nowDate.getSeconds(), nowDate.getMilliseconds()));
// console.log("nowDateUTC", nowDateUTC);
// console.log("nowDate", nowDate);
// console.log("nowDateUTC", nowDateUTC.getTime());
// console.log("nowDate", nowDate.getTime());

//write a function that takes in a date and returns the time in UTC
//public / bokrage crypto currence. 
// fidelity vangaurd empower. 
/*
fees for selling and buying.

Vangaurd total 
*/