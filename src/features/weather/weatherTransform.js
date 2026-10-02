import { weatherCodes } from "./constants";

export function toWeather(weather) {
  const rawWeatherCode = weather?.weather_code;
  const weatherCondition = weatherCodes[rawWeatherCode] || {
    text: "Unknown",
    icon: "unknown",
  };

  return weatherCondition;
}
