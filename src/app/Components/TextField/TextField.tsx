const TextField = () => {
  return (
    <div className="flex justify-center items-center ">
      <input type="text" className="w-full bg-slate-100 rounded-xl text-white outline-none px-2 py-1"></input>
      <div className="flex justify-center items-center m-6 w-6 h-6 bg-gray-800 rounded-xl">
        <button className="relative bg-gray-900 rounded-full focus:outline-none">
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 w-6 h-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-right"
            >
              <path d="M5 12H19" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TextField;
