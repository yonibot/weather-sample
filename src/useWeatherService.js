import { useState } from 'react';
import keys from './keys';

 const apiKey = keys.openweather;

const fetchWeather = async (lat, lon) => {
    const localWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${apiKey}`);
    const localWeatherJson = await localWeather.json();
    const { main: { temp: tempImperial }} = localWeatherJson;
    return tempImperial;
}

const useWeatherService = (lat, long) => {
    const [weather, setWeather] = useState();

    const getWeather = async (lat, long) => {
        const myWeather = await fetchWeather(lat, long)
        setWeather(myWeather);
    }

    return [ weather, getWeather ];
}

export { useWeatherService }
