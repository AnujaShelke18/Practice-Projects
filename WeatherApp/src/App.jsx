import { useState, useEffect } from 'react'
import './App.css'
import CurrentWeather from './components/CurrentWeather';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import InfoCards from './components/InfoCards';
import Forecast from './components/Forecast';


function buildUrl(lat, lon) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
}

function App() {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState("London");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const response = await fetch(buildUrl(51.5, -0.12));
      const data = await response.json();
      setWeather(data);
    }
    loadData();
  }, []);

  async function handleSearch(city) {
    setLoading(true);
    try{
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
    const geoData = await response.json();

    if (!geoData.results) {
      setError("City not found");
      return;
    }
    setError("");

    const place = geoData.results[0];
    setCityName(place.name);

    const forecastResponse = await fetch((buildUrl(place.latitude, place.longitude)));
    const forecastData = await forecastResponse.json();
    setWeather(forecastData);
    }catch (err){
       setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="app">
    <Navbar onSearch={handleSearch} />
    <main>
      {loading && <p className="status">Loading..</p>}
      {error && <p className="status">{error}</p>}
      {weather && (
        <>
          <CurrentWeather weather={weather} city={cityName} />
          <div className="lower">
            <InfoCards weather={weather} />
            <Forecast weather={weather} />
          </div>
        </>
      )}
    </main>
    <Footer />
  </div>
);
}


export default App;
