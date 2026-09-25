import { searchCities } from "./utils/weather";
import { getWeather } from "./utils/weather";
import { useState, useEffect } from "react";
import WeatherSearch from "./components/WeatherSearch/WeatherSearch";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherWidgets from "./components/WeatherWidgets/WeatherWidgets";
import DailyWeather from "./components/DailyWeather/DailyWeather";
import HourWeather from "./components/HourWeather/HourWeather";
import Spinner from "./components/Spinner/Spinner";
import ErrorWeather from "./components/ErrorWeather/ErrorWeather";

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(() => {
    return localStorage.getItem("city") || "New York";
  });
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem("unit") || "°C";
  });

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const result = await getWeather(city, unit);

      if (result === null) {
        return setError(true);
      }

      setWeather(result);
      setLoading(false);
    }
    getData();
  }, [unit, city]);

  console.log(error);

  return (
    <div className="px-4 w-full md:max-w-7xl md:mx-auto">
      {city && error ? (
        <ErrorWeather />
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <WeatherSearch
            setLoading={setLoading}
            setWeather={setWeather}
            setCity={setCity}
            getWeather={getWeather}
            searchCities={searchCities}
            setUnit={setUnit}
            unit={unit}
          />
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
