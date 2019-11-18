import React, { useEffect, useState } from 'react';
import { geolocated } from 'react-geolocated';
import { useWeatherService } from './useWeatherService';
import { TEMPERATURE_UNITS, swapUnits } from './utils/weather';
import './App.css';


function App({coords}) {
  const [ currentUnit, setUnit ] = useState(TEMPERATURE_UNITS.metric);

  const weather = useWeatherService(coords, currentUnit);

  const toggleTempUnit = () => {
    setUnit(swapUnits(currentUnit));
  }

  const otherTempUnit = swapUnits(currentUnit);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Hello!</h2>
        <div>
          { weather && (
            <div>
              It is <span className="em">{weather}</span> {currentUnit.suffix}.
            </div>
          )}
        </div>
        <br />
        <a className="switch-section" onClick={toggleTempUnit}>Switch to { otherTempUnit.name }</a>
      </header>
    </div>
  );
}

export default geolocated()(App);
