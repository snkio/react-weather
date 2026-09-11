const weatherCodes = {
  0: {
    text: "Clear",
    icon: "none",
  },
  1: {
    text: "Mainly Clear",
    icon: "none",
  },
  2: {
    text: "Partly Cloudy",
    icon: "none",
  },
  3: {
    text: "Overcast",
    icon: "none",
  },
  45: {
    text: "Fog",
    icon: "none",
  },
  48: {
    text: "Fog",
    icon: "none",
  },
  51: {
    text: "Light Drizzle",
    icon: "none",
  },
  53: {
    text: "Drizzle",
    icon: "none",
  },
  55: {
    text: "Drizzle",
    icon: "none",
  },
  56: {
    text: "Drizzle",
    icon: "none",
  },
  57: {
    text: "Heavy freezing Rain",
    icon: "none",
  },
  61: {
    text: "Light Rain",
    icon: "none",
  },
  63: {
    text: "Rain",
    icon: "none",
  },
  65: {
    text: "Heavy Rain",
    icon: "none",
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
    icon: "none",
  },
  81: {
    text: "Showers",
    icon: "none",
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

console.log(weatherCodes[10]);

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
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`,
    );

    const weatherData = await getWeatherResponse.json();
    const weatherResult = weatherData.current;

    const rawWeatherCode = weatherResult?.weather_code;
    const weatherCondition = weatherCodes[rawWeatherCode] || {
      text: "Unknown",
      icon: "unknown",
    };

    const getTemp = weatherResult?.temperature_2m;
    const roundedTemp = Math.round(getTemp);

    return {
      type: weatherCondition,
      temp: roundedTemp,
      cityName: fullCity,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
