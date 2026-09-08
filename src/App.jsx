import "./App.css";
import { useState, useEffect } from "react";
import WeatherHeader from "./components/WeatherHeader/WeatherHeader";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";

function App() {
  const [city, setCity] = useState(() => {
    const saved = localStorage.getItem("city");

    if (saved === null) {
      localStorage.setItem("city", "New York");
      return "New York";
    }

    if (saved) {
      return saved;
    }
  });

  const [weather, setWeather] = useState(null);

  async function getWeather(city) {
    if (!city) return;

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=20&language=en&format=json`,
      );
      const getData = await response.json();
      const results = getData.results[0];

      if (results) {
        const fullCity = results?.name;

        setCity(fullCity);

        localStorage.setItem("city", fullCity);

        const lat = results?.latitude;
        const lon = results?.longitude;

        const getWeatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`,
        );

        const getDataWeather = await getWeatherResponse.json();
        const getResults = getDataWeather.current;

        const getTemp = getResults?.temperature_2m;
        console.log(Math.round(getTemp));
        setWeather(getTemp);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const startCity = localStorage.getItem("city") || "New York";

    getWeather(startCity);
  }, []);

  return (
    <>
      <WeatherHeader
        city={city}
        weather={weather}
        setCity={setCity}
        getWeather={getWeather}
      />
      <WeatherInfo city={city} weather={weather} />
    </>
  );
}

export default App;
