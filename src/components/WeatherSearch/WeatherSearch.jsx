import searchIcon from "../../assets/search.svg";
import { useState, useEffect, useRef } from "react";

function WeatherSearch({
  getWeather,
  setCity,
  setLoading,
  setWeather,
  searchCities,
}) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      inputRef.current.focus();
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

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
        <div className="inline-flex flex-col">
          <button
            className="bg-bg-block rounded-full p-2 flex items-center gap-1 min-w-50"
            onClick={() => setOpen(true)}
          >
            <img src={searchIcon} alt="" aria-hidden="true" />
            <p className="text-text-main">Search</p>
          </button>
          {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <div className="absolute z-50">
                <div className="relative bg-bg-block flex items-center p-2 gap-1 rounded-full">
                  <img src={searchIcon} alt="" aria-hidden="true" />
                  <form
                    onSubmit={(e) => {
                      handleEnter(e);
                      setOpen(false);
                    }}
                  >
                    <input
                      type="text"
                      ref={inputRef}
                      value={input}
                      placeholder="Enter location"
                      className="outline-none max-w-[200px]"
                      onChange={async (city) => {
                        const value = city.target.value;
                        setInput(value);
                        if (value.length > 2) {
                          const citiesList = await searchCities(value);
                          setSuggestions(citiesList || []);
                        } else {
                          setSuggestions([]);
                        }
                      }}
                    />
                  </form>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cursor-pointer transition-all duration-300 md:opacity-50 md:hover:rotate-90 md:hover:opacity-100"
                    onClick={() => setOpen(false)}
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                  </svg>
                </div>
                <div className="absolute w-full bg-bg-block scrollbar-thin scrollbar-thumb-yellow-100 top-[calc(100%+10px)] rounded-2xl overflow-y-auto max-h-50 md:max-h-auto">
                  {suggestions.map((i) => (
                    <div
                      key={i.id}
                      onClick={() => {
                        handleSearchClick(i);
                        setOpen(false);
                      }}
                      className="p-2 cursor-pointer rounded-2xl overflow-y-auto px-2 transition-colors duration-300 hover:bg-bg-main/50"
                    >
                      {i.name}, <span>{i.country}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherSearch;
