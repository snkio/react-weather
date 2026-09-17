function DailyWeather({ city, weather }) {
  return (
    <>
      {city && (
        <section className="bg-bg-block/20 rounded-2xl p-4 my-5">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-none md:justify-around">
            {weather?.daily?.sunrise?.map((d, i) => (
              <div key={i} className="flex flex-col items-center min-w-20">
                <p className="text-text-main font-bold">{d.day}</p>
                <img
                  src={weather.daily.type[i].icon}
                  alt="weather"
                  aria-hidden="true"
                />
                <p className="">{weather.daily.perrain[i]}%</p>
                <div className="text-sm">
                  <p>
                    {weather.daily.temperatureMax[i]}&deg; /{" "}
                    {weather.daily.temperatureMin[i]}&deg;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default DailyWeather;
