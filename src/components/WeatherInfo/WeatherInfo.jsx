function WeatherInfo({ city, weather }) {
  return (
    <>
      <div className="w-full flex px-4 py-4 flex-col justify-center md:max-w-7xl md:mx-auto">
        {city && <h1 className="text-3xl mb-1">{city}</h1>}
        {city && <p className="text-6xl">{weather?.temp}&deg;</p>}
        {city && <p>{weather?.type?.text}</p>}
      </div>
    </>
  );
}

export default WeatherInfo;
