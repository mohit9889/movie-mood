import React from 'react';
import Image from 'next/image';
import { useThemes } from '~/context/themesContext';
import CloseSvg from '~/public/svgs/close.svg';

const StreamPill = ({ item }) => {
  return (
    <div className="flex items-center whitespace-nowrap rounded-full border border-green px-2 py-1 text-xs text-typography">
      {item.logo_path && (
        <div className="size-[15px]">
          <Image
            src={`https://image.tmdb.org/t/p/w50_and_h50_bestv2${item.logo_path}`}
            height={15}
            width={15}
            alt={item.provider_name}
            className="rounded-full"
          />
        </div>
      )}
      <span className="ml-2">{item.provider_name}</span>
    </div>
  );
};

const StreamModal = ({ streamingData = {}, closeModal }) => {
  const { themeMode } = useThemes();

  const renderStreamingSection = (type, label) => {
    if (!streamingData[type]) return null;
    return (
      <div className="mb-4 flex flex-col">
        <h6 className="mb-2 text-base font-semibold">{label}</h6>
        <div className="scrollbar-hidden flex gap-2 overflow-auto">
          {streamingData[type].map((item, index) => (
            <StreamPill key={index} item={item} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col bg-primary">
      {/* Modal Header */}
      <div className="mb-4 flex items-start justify-between">
        <h2 className="text-lg font-medium">Streaming</h2>
        <button
          className={`icon cursor-pointer ${
            themeMode === 'dark' ? 'icon-white' : 'icon-black'
          }`}
          onClick={closeModal}
          aria-label="Close streaming modal"
        >
          <CloseSvg />
        </button>
      </div>

      {/* Streaming Sections */}
      <div className="flex flex-col">
        {renderStreamingSection('flatrate', 'Available')}
        {renderStreamingSection('buy', 'Buy')}
        {renderStreamingSection('rent', 'Rent')}
      </div>
    </div>
  );
};

export default StreamModal;
