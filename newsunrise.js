const sunrise = "06:42 AM";
const sunset = "05:31 PM";

const sunriseTime = (sr) => {
    let time = sr.split(":");
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1].slice(0, 2));
    let ampm = time[1].slice(2);
    const nowTime = new Date();
    console.log(nowTime)
    if (ampm === "PM") {
        hours += 12;
    }
    const newTime = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate(), hours, minutes, 0, 0);
    //create new date object in local time after it has been changed

    console.log('Time:', `${hours}:${minutes}${ampm}`);
    return newTime;
}

console.log(sunriseTime(sunrise));

/*
 const astroApi = async (local) => {
        const nowTime = new Date();
        const fullYear = nowTime.getFullYear();
        const month = nowTime.getMonth();
        const day = nowTime.getDate();
        const formatTime = `${fullYear}-${month}-${day}`;
        const response = await axios.get(`https://api.weatherapi.com/v1/astronomy.json?key=83b93cfd8523492ca26194608220802&q=${local.latitude},${local.longitude}&dt=${formatTime}&appid=b1b15e88fa797225412429c1c50c122a1`)
            .then(response => {
                console.log("DEBUG ASTROAPI RESPONSE", response)
                setAstroData(response.data);
                const sunriseString = response.data.astronomy.sunrise;
                const sunriseArray = sunriseString.split(":");
                const meridian = sunriseArray[2].split(" ");
                let sunriseHour = sunriseArray[0];
                let sunriseMinute = parseInt(sunriseArray[1]);

            })


        // https://api.weatherapi.com/v1/astronomy.json?key=83b93cfd8523492ca26194608220802&q=91105&dt=2022-02-11


    }

*/