function WeatherInfo({ city, weather }) {
  console.log(weather);
  return (
    <>
      <div className="w-full md:max-w-7xl md:mx-auto px-4">
        {city && (
          <section className="flex justify-between bg-bg-block/20 p-4 rounded-2xl">
            <div className="flex flex-col gap-1">
              <h1 className="text-text-main font-bold">{city}</h1>
              <p className="text-4xl">{weather?.now?.temperature}&deg;</p>
              <p className="text-sm font-bold">{weather?.now?.type?.text}</p>
              <div className="flex gap-2">
                <span>H: {weather?.daily?.temperatureMax}</span>
                <span>L: {weather?.daily?.temperatureMin}</span>
              </div>
            </div>
            <img
              src={weather?.now?.type?.icon}
              alt=""
              aria-hidden="true"
              className="w-full max-w-25"
            />
          </section>
        )}
      </div>
    </>
  );
}

export default WeatherInfo;
