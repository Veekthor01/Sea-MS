const LoaderSpinner = () => {
    return (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full w-20 h-20 lg:h-32 lg:w-32 border-t-4 border-b-4 border-black"></div>
        </div>
      );
};

export default LoaderSpinner;