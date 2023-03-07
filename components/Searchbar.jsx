import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';
import search from '../assets/Search.png';
import images from '../assets'

function Searchbar() {
  const { theme } = useTheme();
  return (
    <div className="flex my-8">
      <div className="py-2 px-4 dark:bg-nft-black-2 rounded-[10px] border border-nft-gray-1 dark:border-none flexStartCenter flex flex-1 w-0">
        <Image alt="search_icon" src={search} weight={20} height={20} className={`${theme === 'light' && 'filter invert'}`} />
        <input
          className="ml-6 flex-1 bg-transparent outline-none sm:text-xs overflow-hidden"
          placeholder="Search Item Here"
        />
      </div>
      <div className="cursor-pointer ml-5 py-3 px-4 rounded-xl outline-none dark:bg-nft-black-2 flexBetween border border-nft-gray-1 dark:border-none">
        <p className="text-xs">Recently Listed</p>
        <Image alt="arrow" src={images.arrow} width={14} height={7} className={`ml-20 ${theme === 'light' && 'filter invert'}`} />
      </div>
    </div>
  );
}

export default Searchbar;
