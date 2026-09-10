export async function searchCities(cityName) {
  if (!cityName) return;

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=20&language=en&format=json`,
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
    console.log(citiesArray);

    const firstCity = citiesArray[0];

    const fullCity = firstCity?.name;

    const { latitude, longitude } = firstCity;

    const getWeatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`,
    );

    const weatherData = await getWeatherResponse.json();
    const weatherResult = weatherData.current;

    const getTemp = weatherResult?.temperature_2m;
    const roundedTemp = Math.round(getTemp);

    return {
      temp: roundedTemp,
      cityName: fullCity,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
