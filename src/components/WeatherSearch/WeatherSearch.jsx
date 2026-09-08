import "./WeatherSearch.css";

function WeatherSearch({ city, setCity, getWeather }) {
  function handleEnter(e) {
    if (e.key === "Enter") {
      getWeather(city);
      localStorage.setItem("city", city);
    }
  }

  return (
    <>
      <div className="container">
        <input
          type="text"
          value={city}
          onKeyDown={(e) => {
            if (!city) {
              return console.error("Отсутсвует город");
            }
            handleEnter(e);
          }}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button
          onClick={() => {
            if (!city) {
              return console.error("Отсутсвует город");
            }
            localStorage.setItem("city", city);
          }}
        >
          Search
        </button>
      </div>
    </>
  );
}

export default WeatherSearch;
