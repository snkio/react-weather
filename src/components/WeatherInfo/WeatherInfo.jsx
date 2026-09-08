function WeatherInfo({ city, weather }) {
  return (
    <>
      <div className="container">
        {city && <h1>{city}</h1>}
        {city && <p>{weather}</p>}
      </div>
    </>
  );
}

export default WeatherInfo;
