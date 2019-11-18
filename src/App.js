import React, { useEffect, useState } from 'react';
import { geolocated } from 'react-geolocated';
import { useWeatherService } from './useWeatherService';
import { TEMPERATURE_UNITS, getOtherTemperatureUnit } from './utils/weather';
import './App.css';


function App({coords}) {
  const [ weather, getWeather ] = useWeatherService();

  const [ currentUnit, setUnit ] = useState(TEMPERATURE_UNITS.metric);


  useEffect(() => {
    if (coords) {
      const { latitude: lat, longitude: lon } = coords;
      getWeather(lat, lon, currentUnit.sysName);
    }
  }, [coords, currentUnit]);

  const toggleTempUnit = () => {
    setUnit(getOtherTemperatureUnit(currentUnit));
  }

  const otherTempUnit = getOtherTemperatureUnit(currentUnit).name;

  return (
    <div className="App">
      <header className="App-header">
        <h2>Good morning!</h2>
        <div>
          { weather && (
            <div>
              It is <span className="em">{weather}</span> {currentUnit.suffix}.
            </div>
          )}
        </div>
        <br />
        <a className="switch-section" onClick={toggleTempUnit}>Switch to { otherTempUnit }</a>
      </header>
    </div>
  );
}

export default geolocated()(App);
