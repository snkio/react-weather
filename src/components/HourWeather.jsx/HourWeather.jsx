function HourWeather({ city, weather }) {
  return (
    <>
      {city && (
        <section className="bg-bg-block/20 mb-2.5 rounded-2xl p-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white">
            {weather?.hour?.time?.map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-center items-center text-center min-w-20 gap-1.5"
              >
                <p className="font-bold">{weather.hour.temperature[i]}&deg;</p>
                {
                  <img
                    src={weather.hour.type[i].icon}
                    alt={weather.hour.type[i].text}
                    className="w-12 h-12"
                  />
                }

                <p className="">{item.hour}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default HourWeather;
