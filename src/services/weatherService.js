import { DateTime } from "luxon";

const API_KEY = '0792b8d100a9fd842ca7381363da106f'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/' 
/* this base url is of current forcast*/

const getWeatherData = async (info,search) => {
    const url = new URL(BASE_URL + info)
    url.search = new URLSearchParams({...search , appid:API_KEY});

    const res = await fetch(url);
    const data = await res.json();
    return data;
};

const iconUrlFromCode = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs,offset,format="cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs + offset, {zone: 'utc'}).toFormat(format);
const formatCurrent = (data)=> {
const {coord: {lat,lon}, 
main:{temp,feels_like,temp_min,temp_max,humidity},
name,
dt,
sys:{country,sunrise,sunset},
weather,
wind:{speed},
timezone,
} = data;

const {main: details, icon} = weather[0]
const formattedtime = formatToLocalTime(dt, timezone);
return {
temp,
feels_like,
temp_min,
temp_max,
humidity,
name,
country,
sunrise: formatToLocalTime(sunrise,timezone, 'hh:mm a'),
sunset: formatToLocalTime(sunset,timezone, 'hh:mm a'),
speed,
details,
icon: iconUrlFromCode(icon),
formattedtime,
dt,
timezone,
lat,
lon,
}
};
const formattedforecast = (secs,offset,data) => {
    //hourly forecast
    const hourly = data.filter(f=> f.dt > secs).map(f=> ({temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, "hh:mm a"),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
    })).slice(0,5);

    
    //daily forecast
    const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map(f=> ({temp:f.main.temp,
        title: formatToLocalTime(f.dt, offset, "ccc"),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
    }))
    return {hourly,daily};
}
const getFormattedWeatherData = async(search)=>{
    const formatcurrentweather = await getWeatherData("weather", search).then(formatCurrent);

  const {dt,lat,lon,timezone} = formatcurrentweather;

  const formatforecast = await getWeatherData("forecast", {lat,lon,units:search.units}).then((d) => formattedforecast(dt,timezone,d.list));
    return {...formatcurrentweather, ...formatforecast};
}

export default getFormattedWeatherData