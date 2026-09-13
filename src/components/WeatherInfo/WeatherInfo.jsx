function WeatherInfo({ city, weather }) {
  return (
    <>
      <div className="w-full flex px-4 py-4 flex-col justify-center md:max-w-7xl md:mx-auto">
        {city && <h1 className="text-3xl mb-1">{city}</h1>}
        {city && <p className="text-6xl">{weather?.now?.temperature}&deg;</p>}
        {city && (
          <div className="flex items-center gap-2">
            <p>{weather?.now?.type?.text}</p>
            <span className="text-red-700">
              {weather?.daily?.temperatureMax}&deg;
            </span>
            <span className="opacity-50">/</span>
            <span className="text-blue-700">
              {weather?.daily?.temperatureMin}&deg;
            </span>
          </div>
        )}

        {/* {city && <p>{weather?.daily?.sunrise?.hour}</p>} */}
      </div>
    </>
  );
}

export default WeatherInfo;
