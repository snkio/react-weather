function Spinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <span className="absolute w-6 h-6 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></span>
    </div>
  );
}

export default Spinner;
