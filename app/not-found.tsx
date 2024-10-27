const NotFound = ()  => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-red-600">
                404
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-800 mt-4 text-center">
                Page Not Found
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mt-2 text-center">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <a
                href="/"
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg transition duration-300 hover:bg-blue-700"
            >
                Go Back Home
            </a>
        </div>
    );
  }
  
  export default NotFound;
  