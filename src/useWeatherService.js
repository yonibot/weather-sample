import { useState } from 'react';
import keys from './keys';

 const apiKey = keys.openweather;

const fetchWeather = async (lat, lon, unit) => {
    unit = unit.toLowerCase();
    const localWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&APPID=${apiKey}`);
    const localWeatherJson = await localWeather.json();
    const { main: { temp }} = localWeatherJson;
    return Math.round(temp);
}

const useWeatherService = () => {
    const [weather, setWeather] = useState();

    const getWeather = async (lat, long, unit) => {
        const myWeather = await fetchWeather(lat, long, unit)
        setWeather(myWeather);
    }

    return [ weather, getWeather ];
}

export { useWeatherService }
