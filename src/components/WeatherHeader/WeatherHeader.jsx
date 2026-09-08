import "./WeatherHeader.css";
import WeatherSearch from "../WeatherSearch/WeatherSearch";

function WeatherHeader({ city, weather, setCity, getWeather }) {
  return (
    <>
      <header className="header">
        <div className="container header__container">
          <p className="header__logo">Weather App</p>
          <WeatherSearch
            city={city}
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
