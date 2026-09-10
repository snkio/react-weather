import "./WeatherHeader.css";
import WeatherSearch from "../WeatherSearch/WeatherSearch";

function WeatherHeader({
  weather,
  getWeather,
  input,
  setInput,
  setCity,
  setWeather,
  setLoading,
  city,
}) {
  return (
    <>
      <header className="header">
        <div className="container header__container">
          <p className="header__logo">Weather App</p>
          <WeatherSearch
            city={city}
            weather={weather}
            input={input}
            setLoading={setLoading}
            setInput={setInput}
            setCity={setCity}
            setWeather={setWeather}
            getWeather={getWeather}
          />
        </div>
      </header>
    </>
  );
}

export default WeatherHeader;
