import sunIcon from "/weather-icons/sun.svg";
import humidityIcon from "/weather-icons/humidity.svg";
import temperatureIcon from "/weather-icons/temp.svg";
import windIcon from "/weather-icons/wind.svg";

function WeatherWidgets({ weather, unit }) {
  return (
    <>
      <section className="grid grid-cols-2 gap-4">
        <div className="w-full bg-bg-block/20 rounded-2xl p-4 min-h-40">
          <div className="flex items-center gap-1">
            <img src={sunIcon} alt="" aria-hidden="true" />
            <p className="text-sm uppercase tracking-wide">Sunrise</p>
          </div>
          <h3 className="text-3xl font-bold">
            {weather?.daily?.sunrise[0]?.hour}
          </h3>
          <p>Sunset: {weather?.daily?.sunset[0]?.hour}</p>
        </div>
        <div className="w-full bg-bg-block/20 rounded-2xl p-4 min-h-40">
          <div className="flex items-center gap-1">
            <img src={humidityIcon} alt="" aria-hidden="true" />
            <p className="text-sm uppercase tracking-wide">Humidity</p>
          </div>
          <h3 className="text-3xl font-bold">{weather?.now?.humidity}%</h3>
        </div>
        <div className="w-full bg-bg-block/20 rounded-2xl p-4 min-h-40">
          <div className="flex items-center gap-1">
            <img src={temperatureIcon} alt="" aria-hidden="true" />
            <p className="text-sm uppercase tracking-wide">Real Feel</p>
          </div>
          <h3 className="text-3xl font-bold">{weather?.now?.realfeel}&deg;</h3>
        </div>
        <div className="w-full bg-bg-block/20 rounded-2xl p-4 min-h-40">
          <div className="flex items-center gap-1">
            <img src={windIcon} alt="" aria-hidden="true" />
            <p className="text-sm uppercase tracking-wide">Wind</p>
          </div>
          <div className="relative w-25 h-25 border flex items-center justify-center rounded-full p-6">
            <div className="absolute flex flex-col items-center justify-center top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white text-slate-900 rounded-full">
              <p className="font-bold text-sm">{weather?.now?.windSpeed}</p>
              <span className="text-xs">{unit === "°C" ? "km/h" : "mp/h"}</span>
            </div>
            <span className="absolute top-0">N</span>
            <span className="absolute bottom-0">S</span>
            <span className="absolute left-1">W</span>
            <span className="absolute right-1">E</span>
            <div
              style={{
                transform: `rotate(${weather?.now?.windDirection}deg)`,
              }}
            >
              <div className="relative bg-white w-0.5 h-20 rounded-full after:absolute after:content-[''] after:border-t-2 after:border-l-2 after:h-2 after:w-2 after:rotate-45 after:border-white after:top-0 after:left-1/2 after:-translate-x-1/2 after:z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WeatherWidgets;
