import React from 'react';

// Helper function converting WMO Weather Codes (0-99) into readable text and graphics
const getWeatherDetails = (code) => {
  const codeMap = {
    0: { text: 'Clear Sky', icon: '☀️' },
    1: { text: 'Mainly Clear', icon: '🌤️' },
    2: { text: 'Partly Cloudy', icon: '⛅' },
    3: { text: 'Overcast', icon: '☁️' },
    45: { text: 'Foggy', icon: '🌫️' },
    48: { text: 'Rime Fog', icon: '🌫️' },
    51: { text: 'Light Drizzle', icon: '🌧️' },
    53: { text: 'Moderate Drizzle', icon: '🌧️' },
    55: { text: 'Dense Drizzle', icon: '🌧️' },
    61: { text: 'Slight Rain', icon: '🌦️' },
    63: { text: 'Moderate Rain', icon: '🌧️' },
    65: { text: 'Heavy Rain', icon: '🌧️' },
    71: { text: 'Slight Snowfall', icon: '🌨️' },
    73: { text: 'Moderate Snowfall', icon: '🌨️' },
    75: { text: 'Heavy Snowfall', icon: '🌨️' },
    80: { text: 'Slight Rain Showers', icon: '🌦️' },
    81: { text: 'Moderate Rain Showers', icon: '🌧️' },
    82: { text: 'Violent Rain Showers', icon: '⛈️' },
    95: { text: 'Thunderstorm', icon: '🌩️' },
  };

  return codeMap[code] || { text: 'Variable Conditions', icon: '🌍' };
};

function WeatherCard({ data }) {
  const { cityName, temp, humidity, windSpeed, weatherCode } = data;
  const { text, icon } = getWeatherDetails(weatherCode);

  return (
    <div className="weather-card">
      <h2>{cityName}</h2>

      <div className="weather-main">
        <span className="weather-emoji-icon" role="img" aria-label={text}>
          {icon}
        </span>
        <p className="temperature">{Math.round(temp)}°C</p>
      </div>

      <h3 className="condition">{text}</h3>

      <div className="weather-details">
        <div className="detail-item">
          <p>Humidity</p>
          <strong>{humidity}%</strong>
        </div>
        <div className="detail-item">
          <p>Wind Speed</p>
          <strong>{windSpeed} km/h</strong>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;