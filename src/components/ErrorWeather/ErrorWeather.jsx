function ErrorWeather() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="absolute max-h-1/4 h-full flex flex-col gap-2 justify-center  bg-bg-main rounded-2xl p-4">
        <article className="text-center">
          <h3 className="font-bold text-xl">It's raining on the servers</h3>
          <p>Try again a bit later...</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 p-3 bg-accent rounded-full transition-all duration-300 hover:bg-accent/80 cursor-pointer"
          >
            Try again
          </button>
        </article>
      </div>
    </div>
  );
}

export default ErrorWeather;
