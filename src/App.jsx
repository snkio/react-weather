import "./App.css";
import { useState, useEffect } from "react";
import WeatherHeader from "./components/WeatherHeader/WeatherHeader";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";

function App() {
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
      console.log(fullCity);

      setCity(fullCity);
      setInput(fullCity);
      localStorage.setItem("city", fullCity);

      const { latitude, longitude } = result;

      const getWeatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
      );

      const weatherData = await getWeatherResponse.json();
      const weatherResult = weatherData.current;

      const getTemp = weatherResult?.temperature_2m;
      const roundedTemp = Math.round(getTemp);

      setWeather(roundedTemp);
      localStorage.setItem("city", fullCity);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getWeather(city);
  }, []);

  return (
    <>
      <WeatherHeader
        input={input}
        setInput={setInput}
        weather={weather}
        setCity={setCity}
        getWeather={getWeather}
      />
      <WeatherInfo city={city} weather={weather} />
    </>
  );
}

export default App;
