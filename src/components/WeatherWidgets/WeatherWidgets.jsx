import sunIcon from "/weather-icons/sun.svg";
import humadityIcon from "/weather-icons/humadity.svg";
import temperatureIcon from "/weather-icons/temp.svg";
import windIcon from "/weather-icons/wind.svg";

function WeatherWidgets({ city, weather }) {
  return (
    <>
      {city && (
        <section className="grid grid-cols-2 gap-4">
          <div className="w-full bg-bg-block/20 rounded-2xl p-4 min-h-30">
            <div className="flex items-center">
              <img src={sunIcon} alt="" aria-hidden="true" />
              <p className="text-sm uppercase tracking-wide">Sunrise</p>
            </div>
            <h3 className="text-3xl font-bold">
              {weather?.daily?.sunrise[0]?.hour}
            </h3>
            <p>Sunset: {weather?.daily?.sunset[0]?.hour}</p>
          </div>
          <div className="w-full bg-bg-block/20 rounded-2xl p-4 min-h-30">
            <div className="flex items-center">
              <img src={humadityIcon} alt="" aria-hidden="true" />
              <p className="text-sm uppercase tracking-wide">Humadity</p>
            </div>
            <h3 className="text-3xl font-bold">{weather?.now?.humadity}%</h3>
          </div>
          <div className="w-full bg-bg-block/20 rounded-2xl p-4 min-h-30">
            <div className="flex items-center">
              <img src={temperatureIcon} alt="" aria-hidden="true" />
              <p className="text-sm uppercase tracking-wide">Real Feel</p>
            </div>
            <h3 className="text-3xl font-bold">
              {weather?.now?.realfeel}&deg;
            </h3>
          </div>
          <div className="w-full bg-bg-block/20 rounded-2xl p-4 min-h-30">
            <div className="flex items-center">
              <img src={windIcon} alt="" aria-hidden="true" />
              <p className="text-sm uppercase tracking-wide">Wind</p>
            </div>
            <h3 className="text-3xl font-bold">
              {weather?.now?.windSpeed} km/h
            </h3>
          </div>
        </section>
      )}
    </>
  );
}

export default WeatherWidgets;
