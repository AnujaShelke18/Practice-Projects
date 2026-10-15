import { MapPin } from "lucide-react";
import { getWeatherLabel, getWeatherIcon, getWeatherBackground } from "../utils/WeatherCodes";

function CurrentWeather({ weather, city }) {
  const code = weather.current.weather_code;
  const Icon = getWeatherIcon(code);
  const unit = weather.current_units.temperature_2m;
  const date = new Date(weather.current.time).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <section className="hero glass"
  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${getWeatherBackground(code)})`,
  }}>
      <div className="hero-top">
        <h2><MapPin size={24} /> {city}</h2>
        <p className="hero-date">{date}</p>
      </div>
      <div className="hero-bottom">
        <div>
          <p className="temp">{Math.round(weather.current.temperature_2m)}{unit}</p>
          <p className="feels">Feels like {Math.round(weather.current.apparent_temperature)}{unit}</p>
        </div>
        <div className="condition">
          <Icon size={48} />
          <p>{getWeatherLabel(code)}</p>
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;