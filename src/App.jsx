import { searchCities } from "./utils/weather";
import { getWeather } from "./utils/weather";
import { useState, useEffect } from "react";
import WeatherSearch from "./components/WeatherSearch/WeatherSearch";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherWidgets from "./components/WeatherWidgets/WeatherWidgets";
import DailyWeather from "./components/DailyWeather/DailyWeather";
import HourWeather from "./components/HourWeather.jsx/HourWeather";

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(() => {
    return localStorage.getItem("city") || "New York";
  });
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem("unit") || "°C";
  });

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const result = await getWeather(city, unit);
      setWeather(result);
      setLoading(false);
    }
    getData();
  }, [unit, city]);

  return (
    <div className="px-4 w-full md:max-w-7xl md:mx-auto">
      <WeatherSearch
        setLoading={setLoading}
        setWeather={setWeather}
        setCity={setCity}
        getWeather={getWeather}
        searchCities={searchCities}
        setUnit={setUnit}
        unit={unit}
      />
      {loading === true ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <span className="absolute w-6 h-6 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></span>
        </div>
      ) : (
        <>
          <CurrentWeather city={city} weather={weather} unit={unit} />
          <DailyWeather city={city} weather={weather} unit={unit} />
          <HourWeather city={city} weather={weather} unit={unit} />
          <WeatherWidgets city={city} weather={weather} unit={unit} />
        </>
      )}
    </div>
  );
}

export default App;
