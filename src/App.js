import React, { useEffect, useState } from 'react';
import { geolocated } from 'react-geolocated';
import { useWeatherService } from './useWeatherService';
import { useReverseGeolocationService } from './useReverseGeolocationService';
import { TEMPERATURE_UNITS, getOtherTemperatureUnit } from './utils/weather';
import './App.css';


function App({coords}) {
  const [ weather, getWeather ] = useWeatherService();
  const [ city, getCity ] = useReverseGeolocationService();
  const [ currentUnit, setUnit ] = useState(TEMPERATURE_UNITS.metric);

  useEffect(() => {
    if (coords) {
      const { latitude: lat, longitude: lon } = coords;
      getWeather(lat, lon, currentUnit.sysName);
      getCity(lat, lon);
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
          { weather && city && (
            <div>
              It is <span className="em">{weather}</span> {currentUnit.suffix} in <span className="em">{city}</span>.
            </div>
          )}
        </div>
        <br />
        <a onClick={toggleTempUnit}>Switch to { otherTempUnit }</a>
      </header>
    </div>
  );
}

export default geolocated()(App);
