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
      setWeather(data);
      setCity(data.cityName);
      localStorage.setItem("city", data.cityName);
    }

    setInput("");
    setLoading(false);
  }

  return (
    <>
      <div className="w-full px-4 py-4 md:max-w-7xl md:mx-auto">
        <form>
          <input
            type="text"
            placeholder="Enter location"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="border outline-none rounded-full px-4 py-1"
          />
          <button onClick={handleSearch}>Search</button>
        </form>
      </div>
    </>
  );
}

export default WeatherSearch;
