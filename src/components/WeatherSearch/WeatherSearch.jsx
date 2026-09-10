import "./WeatherSearch.css";

function WeatherSearch({
  getWeather,
  input,
  setCity,
  setInput,
  setLoading,
  setWeather,
}) {
  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);

    const data = await getWeather(input);

    if (data) {
      setWeather(data.temp);
      setCity(data.cityName);
      localStorage.setItem("city", data.cityName);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="container">
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </form>
      </div>
    </>
  );
}

export default WeatherSearch;
