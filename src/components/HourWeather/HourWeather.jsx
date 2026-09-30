import { useState, useRef, useEffect } from "react";

function HourWeather({ weather }) {
  const scrollRef = useRef(null);
  const [valueScroll, setValueScroll] = useState(0);
  const [widthScroll, setWidthScroll] = useState(null);

  useEffect(() => {
    setWidthScroll(scrollRef.current.clientWidth);
  }, []);

  function handleScroll() {
    if (scrollRef.current) {
      const scroll = scrollRef.current.scrollLeft;
      return setValueScroll(scroll);
    }
  }

  return (
    <section className="bg-bg-block/20 mb-2.5 rounded-2xl p-4">
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex items-center gap-4 overflow-x-auto scrollbar-none"
        >
          <div
            className={`absolute left-0 hidden ${valueScroll === 0 ? "md:hidden" : "md:block"}`}
            onClick={() =>
              scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
            }
          >
            <div className="relative z-10 flex items-center justify-center bg-white rounded-full w-10 h-10 cursor-pointer after:absolute after:content-[''] after:w-4 after:h-4 after:border-t-2 after:border-l-2 after:border-bg-block after:z-10 after:-rotate-45 after:ml-1"></div>
          </div>
          <div
            className={`absolute right-0 ${widthScroll >= valueScroll ? "md:block" : "md:hidden"}`}
            onClick={() =>
              scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
            }
          >
            <div className="relative z-10 flex items-center justify-center bg-white rounded-full w-10 h-10 cursor-pointer after:absolute after:content-[''] after:w-4 after:h-4 after:border-t-2 after:border-r-2 after:border-bg-block after:z-10 after:rotate-45 after:mr-1"></div>
          </div>
          {weather?.hour?.time?.map((item, i) => {
            const isDay =
              weather.hour.time[i].time >= weather.daily.sunrise[0].time &&
              weather.hour.time[i].time < weather.daily.sunset[0].time;

            return (
              <div
                key={i}
                className="flex flex-col justify-center items-center text-center min-w-20 gap-1.5"
              >
                <p className="font-bold">{weather.hour.temperature[i]}&deg;</p>
                <img
                  src={
                    isDay
                      ? weather.hour.type[i].icon
                      : weather.hour.type[i].iconNight ||
                        weather.hour.type[i].icon
                  }
                  alt={weather.hour.type[i].text}
                  className="w-12 h-12"
                />
                <p>{item.hour}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HourWeather;
