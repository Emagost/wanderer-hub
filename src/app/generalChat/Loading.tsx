const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex space-x-1">
        <p className="text-white text-4xl font-bold">Loading messages</p>
        <span className="animate-bounce bg-white">.</span>
        <span className="animate-bounce200 bg-white">.</span>
        <span className="animate-bounce400 bg-white">.</span>
      </div>
    </div>
  );
};

export default Loading;
