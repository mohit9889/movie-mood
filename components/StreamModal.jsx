import React from "react";
import Image from "next/image";
import { useThemes } from "~/context/themesContext";
import CloseSvg from "~/public/svgs/close.svg";

const StreamPill = ({ item }) => {
  return (
    <div className="whitespace-nowrap border-green border-[1px] px-2 py-1 rounded-full text-typography text-xs flex items-center">
      <div className="h-[15px] w-[15px]">
        <Image
          src={`https://image.tmdb.org/t/p/w50_and_h50_bestv2${item.logo_path}`}
          height={15}
          width={15}
          alt={item.provider_name}
        />
      </div>
      <span className="ml-2">{item.provider_name}</span>
    </div>
  );
};

const StreamModal = ({ streamingData = {}, closeModal = () => {} }) => {
  const { themeMode } = useThemes();

  return (
    <div className="flex flex-col w-[320px] md:w-[500px]">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-medium">Streaming</h2>
        <span
          className={`icon cursor-pointer ${
            themeMode === "dark" ? "icon-white" : "icon-black"
          }`}
          onClick={closeModal}
        >
          <CloseSvg />
        </span>
      </div>
      <div className="flex flex-col">
        {streamingData.flatrate && (
          <div className="flex flex-col mb-4">
            <h6 className=" font-semibold text-base mb-2">Available</h6>
            <div className="flex overflow-auto gap-2">
              {streamingData.flatrate.map((item, index) => (
                <StreamPill key={index} item={item} />
              ))}
            </div>
          </div>
        )}
        {streamingData.buy && (
          <div className="flex flex-col mb-4">
            <h6 className=" font-semibold text-base mb-2">Buy</h6>
            <div className="flex overflow-auto gap-2">
              {streamingData.buy.map((item, index) => (
                <StreamPill key={index} item={item} />
              ))}
            </div>
          </div>
        )}
        {streamingData.rent && (
          <div className="flex flex-col mb-4">
            <h6 className=" font-semibold text-base mb-2">Rent</h6>
            <div className="flex overflow-auto gap-2">
              {streamingData.rent.map((item, index) => (
                <StreamPill key={index} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamModal;
