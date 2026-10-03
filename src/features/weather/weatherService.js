import { toDate } from "../../utils/toDate";
import { toWeather } from "./weatherTransform";

export async function searchCities(cityName) {
  if (!cityName) return;

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`,
    );
    const data = await response.json();
    const result = data.results;

    return result;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getWeather(cityName, unit) {
  if (!cityName) return;

  try {
    const citiesArray = await searchCities(cityName);

    if (!citiesArray) return;

    const firstCity = citiesArray[0];
    const fullCity = firstCity?.name;

    const { latitude, longitude } = firstCity;

    const getUnit = unit;
    const unitTemp = getUnit === "°C" ? "celsius" : "fahrenheit";
    const unitWind = unitTemp === "celsius" ? "kmh" : "mph";

    const getWeatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&hourly=temperature_2m,weather_code,wind_speed_10m&current=is_day,temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,apparent_temperature,surface_pressure&timezone=auto&wind_speed_unit=${unitWind}&temperature_unit=${unitTemp}`,
    );

    const weatherData = await getWeatherResponse.json();
    const weatherNow = weatherData.current;
    const weatherHour = weatherData.hourly;
    const weatherDaily = weatherData.daily;

    const {
      is_day: isDay,
      time: timeNow,
      temperature_2m: tempNow,
      apparent_temperature: feelingsNow,
      relative_humidity_2m: humidityNow,
      wind_speed_10m: windSpeedNow,
      wind_direction_10m: windDirectionNow,
      surface_pressure: surfacePressure,
    } = weatherNow ?? {};

    const {
      time: rawTime,
      temperature_2m: rawHour,
      weather_code: rawCode,
    } = weatherHour ?? {};

    const {
      weather_code: rawType,
      sunrise: rawSunrise,
      sunset: rawSunset,
      precipitation_probability_max: perRain,
      temperature_2m_max: rawTempMax,
      temperature_2m_min: rawTempMin,
    } = weatherDaily ?? {};

    const getCurrentHour = new Date(timeNow).getHours();

    const timeHour = rawTime
      .filter((e) => {
        const now = new Date(timeNow);
        const getWeatherTime = new Date(e);

        now.setMinutes(0, 0, 0);

        return getWeatherTime.getTime() >= now.getTime();
      })
      .slice(0, 24)
      .map((e) => toDate(e));
    const tempHour = rawHour.slice(getCurrentHour, getCurrentHour + 24);
    const typeHour =
      rawCode.slice(getCurrentHour, getCurrentHour + 24)?.map((wcode) => {
        return toWeather({ weather_code: wcode });
      }) || [];

    const sunrise = rawSunrise.map((e) => toDate(e));
    const sunset = rawSunset.map((e) => toDate(e));
    const tempMax = rawTempMax.map((e) => Math.round(e));
    const tempMin = rawTempMin.map((e) => Math.round(e));
    const typeDaily = rawType.map((wcode) =>
      toWeather({ weather_code: wcode }),
    );

    return {
      now: {
        day: isDay,
        cityName: fullCity,
        type: toWeather(weatherNow),
        temperature: Math.round(tempNow),
        realfeel: Math.round(feelingsNow),
        humidity: humidityNow,
        windSpeed: windSpeedNow,
        windDirection: windDirectionNow,
        surfaceP: Math.round(surfacePressure),
      },
      hour: {
        type: typeHour,
        time: timeHour,
        temperature: tempHour.map((e) => Math.round(e)),
      },
      daily: {
        type: typeDaily,
        sunrise: sunrise,
        sunset: sunset,
        temperatureMax: tempMax,
        temperatureMin: tempMin,
        perrain: perRain,
      },
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
