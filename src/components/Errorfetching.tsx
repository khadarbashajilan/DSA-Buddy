const Errorfetching = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[70%] md:w-[60%] md:font-bold md:text-2xl text-md h-[50%] flex flex-col justify-center items-center text-center">
        <h2 className="text-xl font-semibold text-white mb-4">
          API Limit Reached
        </h2>
        <p className="text-gray-300 mb-6">
          You've reached your free API call limit. Please try again later.
        </p>
        <p className="text-gray-300 mb-6">
          If you want to set it up locally, you can find the repository{" "}
          <a
            href="https://github.com/khadarbashajilan/dsa-buddy"
            className="text-blue-500 hover:underline"
          >
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Errorfetching;
