function CurrentWeather({ city, weather }) {
  return (
    <>
      <div>
        <section className="flex justify-between bg-bg-block/20 p-4 rounded-2xl">
          <div className="flex flex-col gap-1">
            <h1 className="text-text-main font-bold">{city}</h1>
            <h2 className="text-4xl">{weather?.now?.temperature}&deg;</h2>
            <p className="text-sm font-bold">{weather?.now?.type?.text}</p>
            <div className="flex gap-2">
              <span>H: {weather?.daily?.temperatureMax[0]}&deg;</span>
              <span>L: {weather?.daily?.temperatureMin[0]}&deg;</span>
            </div>
          </div>
          <img
            src={
              weather?.now?.day
                ? weather?.now?.type?.icon
                : weather?.now?.type?.iconNight || weather?.now?.type?.icon
            }
            alt=""
            aria-hidden="true"
            className="w-full max-w-25"
          />
        </section>
      </div>
    </>
  );
}

export default CurrentWeather;
