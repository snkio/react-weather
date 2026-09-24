const weatherCodes = {
  0: {
    text: "Clear",
    icon: "/weather-icons/sun.svg",
    iconNight: "/weather-icons/night.svg",
  },
  1: {
    text: "Clear",
    icon: "/weather-icons/sun.svg",
    iconNight: "/weather-icons/night.svg",
  },
  2: {
    text: "Partly Cloudy",
    icon: "/weather-icons/partlysun.svg",
    iconNight: "/weather-icons/partlynight.svg",
  },
  3: {
    text: "Overcast",
    icon: "/weather-icons/cloud.svg",
  },
  45: {
    text: "Fog",
    icon: "/weather-icons/cloud.svg",
  },
  48: {
    text: "Fog",
    icon: "/weather-icons/cloud.svg",
  },
  51: {
    text: "Light Drizzle",
    icon: "/weather-icons/rain.svg",
  },
  53: {
    text: "Drizzle",
    icon: "/weather-icons/rain.svg",
  },
  55: {
    text: "Drizzle",
    icon: "/weather-icons/rain.svg",
  },
  56: {
    text: "Drizzle",
    icon: "/weather-icons/rain.svg",
  },
  57: {
    text: "Heavy Freezing Rain",
    icon: "none",
  },
  61: {
    text: "Light Rain",
    icon: "/weather-icons/rain.svg",
  },
  63: {
    text: "Rain",
    icon: "/weather-icons/rain.svg",
  },
  65: {
    text: "Heavy Rain",
    icon: "/weather-icons/rain.svg",
  },
  66: {
    text: "Freezing Rain",
    icon: "none",
  },
  67: {
    text: "Freezing Rain",
    icon: "none",
  },
  71: {
    text: "Light Snow",
    icon: "none",
  },
  73: {
    text: "Snow",
    icon: "none",
  },
  75: {
    text: "Heavy Snow",
    icon: "none",
  },
  77: {
    text: "Snow Grains",
    icon: "none",
  },
  80: {
    text: "Light Showers",
    icon: "/weather-icons/rain.svg",
  },
  81: {
    text: "Showers",
    icon: "/weather-icons/rain.svg",
  },
  82: {
    text: "Heavy Downpour",
    icon: "none",
  },
  85: {
    text: "Light Snow Showers",
    icon: "none",
  },
  86: {
    text: "Snow Showers",
    icon: "none",
  },
  95: {
    text: "Thunderstorm",
    icon: "none",
  },
  96: {
    text: "Hail Storm",
    icon: "none",
  },
  99: {
    text: "Heavy Hail Storm",
    icon: "none",
  },
};

export function toDate(e) {
  let getDate;
  const iso = e;

  if (iso) {
    getDate = new Date(iso);
  } else {
    getDate = new Date();
  }

  let day = getDate.toLocaleString(undefined, {
    weekday: "short",
  });
  const dateText = getDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  let timeText = getDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (getDate.toDateString() === new Date().toDateString()) {
    day = "Today";
  }

  const getTimeHour = getDate.getHours();
  const result = timeText.startsWith("0") ? timeText.slice(1) : timeText;

  return {
    day: day,
    text: dateText,
    hour: result,
    time: getTimeHour,
  };
}

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
    const unitWind = getUnit === "celsius" ? "kmh" : "mph";

    const getWeatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&hourly=temperature_2m,weather_code,wind_speed_10m&current=is_day,temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,apparent_temperature,surface_pressure&timezone=auto&wind_speed_unit=${unitWind}&temperature_unit=${unit}`,
    );

    function toWeather(weather) {
      const rawWeatherCode = weather?.weather_code;
      const weatherCondition = weatherCodes[rawWeatherCode] || {
        text: "Unknown",
        icon: "unknown",
      };

      return weatherCondition;
    }

    const weatherData = await getWeatherResponse.json();
    const weatherNow = weatherData.current;
    const weatherHour = weatherData.hourly;
    const weatherDaily = weatherData.daily;

    console.log(weatherData);

    const {
      is_day: isDay,
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

    const getCurrentHour = new Date().getHours();

    const timeHour = rawTime
      .filter((e) => {
        const now = new Date();
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
