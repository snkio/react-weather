import { searchCities } from "./utils/weather";
import { getWeather } from "./utils/weather";
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

  const [suggestions, setSuggestions] = useState([]);

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
        setSuggestions={setSuggestions}
        getWeather={getWeather}
        searchCities={searchCities}
        suggestions={suggestions}
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
