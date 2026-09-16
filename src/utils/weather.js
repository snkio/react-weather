const weatherCodes = {
  0: {
    text: "Clear",
    icon: "/assets/partlysun.svg",
  },
  1: {
    text: "Mainly Clear",
    icon: "none",
  },
  2: {
    text: "Partly Cloudy",
    icon: "/weather-icons/cloud.svg",
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

  const dateText = getDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeText = getDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return {
    text: dateText,
    hour: timeText,
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

export async function getWeather(cityName) {
  if (!cityName) return;

  try {
    const citiesArray = await searchCities(cityName);

    if (!citiesArray) return;

    const firstCity = citiesArray[0];
    const fullCity = firstCity?.name;

    const { latitude, longitude } = firstCity;

    const getWeatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&hourly=temperature_2m,weather_code,wind_speed_10m&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,apparent_temperature,surface_pressure&timezone=auto`,
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

    const tempNow = weatherNow?.temperature_2m;
    const feelingsNow = weatherNow?.apparent_temperature;
    const humidityNow = weatherNow?.relative_humidity_2m;
    const windSpeedNow = weatherNow?.wind_speed_10m;
    const windDirectionNow = weatherNow?.wind_direction_10m;
    const surfacePressure = weatherNow?.surface_pressure;

    const getCurrentHour = new Date().getHours();

    const timeHour = weatherHour.time
      .filter((e) => {
        const now = new Date();
        const getWeatherTime = new Date(e);

        now.setMinutes(0, 0, 0);

        return getWeatherTime.getTime() >= now.getTime();
      })
      .slice(0, 24)
      .map((e) => toDate(e));
    const tempHour = weatherHour.temperature_2m.slice(
      getCurrentHour,
      getCurrentHour + 24,
    );
    const typeHour =
      weatherHour?.weather_code
        ?.slice(getCurrentHour, getCurrentHour + 24)
        ?.map((wcode) => {
          return toWeather({ weather_code: wcode });
        }) || [];

    const sunrise = weatherDaily?.sunrise;
    const sunset = weatherDaily?.sunset;
    const tempDailyMax = weatherDaily?.temperature_2m_max;
    const tempDailyMin = weatherDaily?.temperature_2m_min;

    return {
      now: {
        cityName: fullCity,
        type: toWeather(weatherNow),
        temperature: Math.round(tempNow),
        realfeel: Math.round(feelingsNow),
        humadity: humidityNow,
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
        sunrise: toDate(sunrise[0]),
        sunset: toDate(sunset[0]),
        temperatureMax: Math.round(tempDailyMax[0]),
        temperatureMin: Math.round(tempDailyMin[0]),
      },
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
