import React, { useEffect, useState } from 'react';
import { geolocated } from 'react-geolocated';
import { TEMPERATURE_UNITS, getOtherTemperatureUnit } from './utils/weather';
import './App.css';
import keys from './keys';

const apiKey = keys.openweather;

function App({coords}) {

  const [ currentUnit, setUnit ] = useState(TEMPERATURE_UNITS.metric);
  const [ weather, setWeather ] = useState();

  useEffect(() => {
    if (coords) {
      const fetchWeather = async () => {
        const { latitude: lat, longitude: lon } = coords;
        const unit = currentUnit.sysName.toLowerCase();
        const localWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&APPID=${apiKey}`);
        const localWeatherJson = await localWeather.json();
        const { main: { temp }} = localWeatherJson;
        setWeather(Math.round(temp));
      }
      fetchWeather();
    }
  }, [coords, currentUnit]);

  const toggleTempUnit = () => {
    setUnit(getOtherTemperatureUnit(currentUnit));
  }

  const otherTempUnit = getOtherTemperatureUnit(currentUnit).name;

  return (
    <div className="App">
      <header className="App-header">
        <h2>Hello!</h2>
        <div>
            <div>
              It is <span className="em">{weather}</span> {currentUnit.suffix}.
            </div>
        </div>
        <br />
        <a className="switch-section" onClick={toggleTempUnit}>Switch to { otherTempUnit }</a>
      </header>
    </div>
  );
}

export default geolocated()(App);
