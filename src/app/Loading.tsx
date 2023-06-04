const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex space-x-1">
        <p className="text-white text-lg font-bold">Loading </p>
        <span className="h-1 animate-bounce bg-white">.</span>
        <span className="h-1 animate-bounce200 bg-white">.</span>
        <span className="h-1 animate-bounce400 bg-white">.</span>
      </div>
    </div>
  );
};

export default Loading;
