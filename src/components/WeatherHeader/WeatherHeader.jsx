import "./WeatherHeader.css";
import WeatherSearch from "../WeatherSearch/WeatherSearch";

function WeatherHeader({ weather, setCity, getWeather, input, setInput }) {
  return (
    <>
      <header className="header">
        <div className="container header__container">
          <p className="header__logo">Weather App</p>
          <WeatherSearch
            input={input}
            setInput={setInput}
            weather={weather}
            setCity={setCity}
            getWeather={getWeather}
          />
        </div>
      </header>
    </>
  );
}

export default WeatherHeader;
