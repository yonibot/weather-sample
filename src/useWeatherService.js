import { useState, useEffect } from 'react';
import keys from './keys';

 const apiKey = keys.openweather;

const useWeatherService = (coords, unit) => {

    const [weather, setWeather] = useState();

    useEffect(() => {
        async function fetchWeather() {
            if (coords) {
                const { latitude: lat, longitude: lon } = coords;
                unit = unit.sysName.toLowerCase();
                const localWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&APPID=${apiKey}`);
                const localWeatherJson = await localWeather.json();
                const { main: { temp }} = localWeatherJson;
                const weather = Math.round(temp);
                setWeather(weather);
            }
        }
        fetchWeather()
    }, [coords, unit]);

    return weather;
}

export { useWeatherService }
