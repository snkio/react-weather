function WeatherSearch({
  getWeather,
  input,
  suggestions,
  setCity,
  setInput,
  setLoading,
  setWeather,
  setSuggestions,
  searchCities,
}) {
  async function handleEnter(e) {
    e.preventDefault();

    if (!input) return;

    await handleSearch(input);
    setInput("");
    setSuggestions([]);
  }

  async function handleSearchClick(i) {
    setSuggestions([]);

    await handleSearch(i.name);
    setInput("");
  }

  async function handleSearch(cityName) {
    setLoading(true);

    const data = await getWeather(cityName);

    if (!data) {
      setLoading(false);
      return;
    }

    setWeather(data);
    setCity(data.cityName);
    localStorage.setItem("city", data.cityName);

    setLoading(false);
  }

  return (
    <>
      <div className="w-full px-4 py-4 md:max-w-7xl md:mx-auto">
        <form>
          <div>
            <input
              type="text"
              placeholder="Enter location"
              value={input}
              onChange={async (e) => {
                const value = e.target.value;
                setInput(value);
                if (value.length > 2) {
                  const citiesList = await searchCities(value);
                  setSuggestions(citiesList || []);
                } else {
                  setSuggestions([]);
                }
              }}
              className="border outline-none rounded-full px-4 py-1"
            />
            <button onClick={handleEnter}>Search</button>
            <div className="max-h-24 overflow-y-auto">
              {suggestions.map((i) => (
                <div
                  key={i.id}
                  onClick={() => handleSearchClick(i)}
                  className="p-2 cursor-pointer"
                >
                  {i.name}, <span>{i.country}</span>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default WeatherSearch;
