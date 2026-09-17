import searchIcon from "../../assets/search.svg";

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
    setCity(data?.now?.cityName);
    localStorage.setItem("city", data?.now?.cityName);

    setLoading(false);
  }

  return (
    <>
      <div className="my-5">
        <form onSubmit={handleEnter}>
          <div className="relative inline-flex flex-col">
            <div className="bg-bg-block rounded-full p-2 inline-flex items-center gap-1">
              <img src={searchIcon} alt="" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search"
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
                className="outline-none text-text-main bg-transparent"
              />
            </div>
            <div className="absolute w-full bg-bg-block flex-inline max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-100 top-full">
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
