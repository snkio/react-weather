import { useState, useEffect } from "react";
import WeatherSearch from "./components/WeatherSearch/WeatherSearch";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(() => {
    return localStorage.getItem("city") || "New York";
  });
  const [input, setInput] = useState("");

  const [weather, setWeather] = useState(null);

  async function getWeather(cityName) {
    if (!cityName) return;

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=20&language=en&format=json`,
      );
      const data = await response.json();
      const result = data.results[0];

      if (!result) return;
      const fullCity = result?.name;

      const { latitude, longitude } = result;

      const getWeatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`,
      );

      const weatherData = await getWeatherResponse.json();
      const weatherResult = weatherData.current;

      console.log(weatherData);

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

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const startCity = localStorage.getItem("city") || "New York";
      const result = await getWeather(startCity);
      setWeather(result);
      setLoading(false);
    }

    getData();
  }, []);

  return (
    <>
      <WeatherSearch
        setLoading={setLoading}
        input={input}
        setInput={setInput}
        setWeather={setWeather}
        setCity={setCity}
        getWeather={getWeather}
      />
      {loading === true ? (
        <span>Loading...</span>
      ) : (
        <WeatherInfo city={city} weather={weather} />
      )}
    </>
  );
}

export default App;
