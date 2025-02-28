const FullPageLoader = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-black/50 backdrop-blur"
      aria-live="polite"
    >
      {/* Animated Loader */}
      <div className="border-gray-300 size-16 animate-spin rounded-full border-4 border-t-green"></div>

      {/* Loading Text */}
      <p className="mt-4 max-w-md px-4 text-center text-lg font-semibold text-typography">
        Loading... Just like popcorn popping, great movies take time. Sit tight
        and get ready to laugh your socks off!
      </p>
    </div>
  );
};

export default FullPageLoader;
