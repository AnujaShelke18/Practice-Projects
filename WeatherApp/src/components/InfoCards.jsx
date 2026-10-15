import { Droplets, Wind, Sunrise, Sunset } from "lucide-react";

function InfoCards({ weather }) {
  const { current, current_units, daily } = weather;

  return (
    <div className="info-cards">
      <div className="info-card glass">
        <Droplets size={22} />
        <p className="info-label">Humidity</p>
        <p className="info-value">{current.relative_humidity_2m}{current_units.relative_humidity_2m}</p>
      </div>
      <div className="info-card glass">
        <Wind size={22} />
        <p className="info-label">Wind</p>
        <p className="info-value">{current.wind_speed_10m} {current_units.wind_speed_10m}</p>
      </div>
      <div className="info-card glass">
        <Sunrise size={22} />
        <p className="info-label">Sunrise</p>
        <p className="info-value">{daily.sunrise[0].slice(11)}</p>
      </div>
      <div className="info-card glass">
        <Sunset size={22} />
        <p className="info-label">Sunset</p>
        <p className="info-value">{daily.sunset[0].slice(11)}</p>
      </div>
    </div>
  );
}

export default InfoCards;