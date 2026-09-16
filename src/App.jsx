import { searchCities } from "./utils/weather";
import { getWeather } from "./utils/weather";
import { useState, useEffect } from "react";
import WeatherSearch from "./components/WeatherSearch/WeatherSearch";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherWidgets from "./components/WeatherWidgets/WeatherWidgets";

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
    <div className="px-4 w-full md:max-w-7xl md:mx-auto">
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
        <>
          <CurrentWeather city={city} weather={weather} />
          <WeatherWidgets city={city} weather={weather} />
        </>
      )}
    </div>
  );
}

export default App;
