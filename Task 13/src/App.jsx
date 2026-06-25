import { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );

      if (!geoResponse.ok) throw new Error('Network issue fetching location data.');

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found. Please check your spelling.');
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
      );

      if (!weatherResponse.ok) throw new Error('Failed to fetch weather metrics.');

      const weatherDataJson = await weatherResponse.json();

      setWeatherData({
        cityName: `${name}, ${country}`,
        temp: weatherDataJson.current.temperature_2m,
        humidity: weatherDataJson.current.relative_humidity_2m,
        windSpeed: weatherDataJson.current.wind_speed_10m,
        weatherCode: weatherDataJson.current.weather_code,
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather Explorer</h1>

      <form onSubmit={fetchWeather} className="search-form">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading && <p className="loading">Fetching weather data...</p>}
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;