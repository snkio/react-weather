import "./WeatherSearch.css";

function WeatherSearch({ getWeather, input, setInput }) {
  function handleSearch(e) {
    e.preventDefault();
    getWeather(input);
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
