import React, { useEffect } from 'react';
import { geolocated } from 'react-geolocated';
import { useWeatherService } from './useWeatherService';
import { useReverseGeolocationService } from './useReverseGeolocationService';
import './App.css';

function App({coords}) {
  const [ weather, getWeather ] = useWeatherService();
  const [ city, getCity ] = useReverseGeolocationService();

  useEffect(() => {
    if (coords) {
      const { latitude: lat, longitude: lon } = coords;
      getWeather(lat, lon);
      getCity(lat, lon);
    }
  }, [coords, getWeather, getCity]);

  const info = weather && city && <div>It is <span className="em">{weather}</span> ℉ in <span className="em">{city}</span>.</div>

  return (
    <div className="App">
      <header className="App-header">
        <h2>Good morning!</h2>
        <div>{ info }</div>
      </header>
    </div>
  );
}

export default geolocated()(App);
