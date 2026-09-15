function WeatherInfo({ city, weather }) {
  console.log(weather);
  return (
    <>
      <div className="w-full flex px-4 py-4 flex-col justify-center md:max-w-7xl md:mx-auto">
        {city && <h1 className="text-3xl mb-1">{city}</h1>}
        {city && <p className="text-6xl">{weather?.now?.temperature}&deg;</p>}
        {city && (
          <div className="flex items-center gap-2">
            <p>{weather?.now?.type?.text}</p>
            <span className="text-red-800">
              {weather?.daily?.temperatureMax}&deg;
            </span>
            <span className="opacity-50">/</span>
            <span className="text-blue-800">
              {weather?.daily?.temperatureMin}&deg;
            </span>
          </div>
        )}

        {city && <p>Sunrise {weather?.daily?.sunrise?.hour}</p>}
        {city && <p>Sunset {weather?.daily?.sunset?.hour}</p>}
        {city && <p>Real Feel {weather?.now?.realfeel}</p>}
        {city && <p>Humadity {weather?.now?.humadity}</p>}
        {city && <p>Wind Speed {weather?.now?.windSpeed}</p>}
        {city && <p>Wind Direction {weather?.now?.windDirection}&deg;</p>}
      </div>
    </>
  );
}

export default WeatherInfo;
