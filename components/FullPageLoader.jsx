import { useThemes } from "~/context/themesContext";

const FullPageLoader = () => {
  const { themeMode } = useThemes();
  return (
    <div
      className={`absolute w-full h-full text-white backdrop-blur top-0 left-0  flex items-center justify-center flex-col`}
    >
      <div class="rounded-full h-20 w-20 bg-green animate-ping"></div>
      <p className="text-center text-xl max-w-[40%] text-typography font-semibold absolute">
        Loading... Just like popcorn popping, great movies take time. Sit tight
        and get ready to laugh your socks off!
      </p>
    </div>
  );
};

export default FullPageLoader;
