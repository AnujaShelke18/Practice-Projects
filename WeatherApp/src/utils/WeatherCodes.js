import { Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudSnow, CloudLightning } from "lucide-react";
import clear from "../assets/clear.jpg";
import cloudy from "../assets/cloudy.jpg";
import fog from "../assets/fog.jpg";
import rain from "../assets/rain.jpg";
import snow from "../assets/snow.jpg";
import storm from "../assets/storm.jpg";

export function getWeatherBackground(code) {
  if (code <= 1) return clear;
  if (code <= 3) return cloudy;
  if (code <= 48) return fog;
  if (code <= 67 || (code >= 80 && code <= 82)) return rain;
  if (code <= 77 || code === 85 || code === 86) return snow;
  if (code >= 95) return storm;
  return cloudy;
}

const weatherMap = {
  0: { label: "Clear sky", icon: Sun },
  1: { label: "Mainly clear", icon: Sun },
  2: { label: "Partly cloudy", icon: CloudSun },
  3: { label: "Overcast", icon: Cloud },
  45: { label: "Fog", icon: CloudFog },
  48: { label: "Fog", icon: CloudFog },
  51: { label: "Drizzle", icon: CloudDrizzle },
  53: { label: "Drizzle", icon: CloudDrizzle },
  55: { label: "Drizzle", icon: CloudDrizzle },
  61: { label: "Rain", icon: CloudRain },
  63: { label: "Rain", icon: CloudRain },
  65: { label: "Rain", icon: CloudRain },
  71: { label: "Snow", icon: CloudSnow },
  73: { label: "Snow", icon: CloudSnow },
  75: { label: "Snow", icon: CloudSnow },
  80: { label: "Rain showers", icon: CloudRain },
  81: { label: "Rain showers", icon: CloudRain },
  82: { label: "Rain showers", icon: CloudRain },
  95: { label: "Thunderstorm", icon: CloudLightning },
};

export function getWeatherLabel(code) {
  return weatherMap[code]?.label || "Unknown";
}

export function getWeatherIcon(code) {
  return weatherMap[code]?.icon || Cloud;
}