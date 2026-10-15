import { CalendarDays } from "lucide-react";
import { getWeatherLabel, getWeatherIcon } from "../utils/WeatherCodes";

function Forecast({ weather }) {
  const { time, weather_code, temperature_2m_max, temperature_2m_min } = weather.daily;
  const lowest = Math.min(...temperature_2m_min);
  const highest = Math.max(...temperature_2m_max);
  const span = highest - lowest || 1;

  return (
    <section className="forecast glass">
      <h3><CalendarDays size={18} /> 7-day forecast</h3>
      {time.map((date, i) => {
        const Icon = getWeatherIcon(weather_code[i]);
        const left = ((temperature_2m_min[i] - lowest) / span) * 100;
        const width = ((temperature_2m_max[i] - temperature_2m_min[i]) / span) * 100;

        return (
          <div className="forecast-row" key={date}>
            <span className="day">
              {i === 0
                ? "Today"
                : new Date(date).toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" })}
            </span>
            <Icon size={22} />
            <span className="cond">{getWeatherLabel(weather_code[i])}</span>
            <span className="low">{Math.round(temperature_2m_min[i])}°</span>
            <div className="range">
              <div className="range-fill" style={{ left: `${left}%`, width: `${width}%` }} />
            </div>
            <span className="high">{Math.round(temperature_2m_max[i])}°</span>
          </div>
        );
      })}
    </section>
  );
}

export default Forecast;