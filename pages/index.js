import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import sellers from '../constants/sellers';
import images from '../assets';
import { CardNFT, Searchbar } from '../components'

function Home() {
  return (
    <div className="nft-container">
      <Banner />
      <TopSellerList />
      <HotBids />
    </div>
  );
}

function HotBids() {
  return (
    <div className="mb-6">
      <div className="font-semibold text-3xl dark:text-white text-nft-black-1 font-poppins">
        Hot Bids
      </div>
      <Searchbar />
      <div className="flex justify-start md:justify-center flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((nft) => (
          <CardNFT key={nft} nft={nft} />
        ))}
      </div>
    </div>
  )
}

function TopSellerList() {
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const [hideButton, setHideButton] = useState(false);

  const handleScroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 200;
    }
    if (direction === 'right') {
      current.scrollLeft += 200;
    }
  }

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButton(false);
    } else { setHideButton(true); }
  }

  useEffect(() => {
    isScrollable();

    window.addEventListener('resize', isScrollable);

    return () => {
      window.removeEventListener('resize', isScrollable);
    }
  })

  const { theme } = useTheme();
  return (
    <>
      <div className="font-semibold text-3xl dark:text-white text-nft-black-1 font-poppins">
        Top Sellers
      </div>
      <div className="relative max-w-full flex mt-7 mb-14" ref={parentRef}>
        <div className="flex overflow-x-scroll w-max select-none no-scrollbar" ref={scrollRef}>
          {/* eslint-disable-next-line max-len */}
          {sellers.map((seller) => (
            <CardUser
              key={seller.rank}
              rank={seller.rank}
              avatar={seller.avatar}
              eth={seller.eth}
              name={seller.name}
            />
          ))}
          {!hideButton
              && (
              <>
                <Image
                  onClick={() => handleScroll('left')}
                  alt="left_arrow"
                  src={images.left}
                  width={30}
                  height={30}
                  className={`absolute left-0 cursor-pointer top-1/2 -translate-y-1/2 ${theme === 'light' && 'filter invert'}`}
                />
                <Image
                  onClick={() => handleScroll('right')}
                  alt="right_arrow"
                  src={images.right}
                  width={30}
                  height={30}
                  className={`absolute right-0 cursor-pointer top-1/2 -translate-y-1/2 translate-x-[12px] ${theme === 'light' && 'filter invert'}`}
                />
              </>
              )}
        </div>
      </div>
    </>
  );
}

function CardUser({
  rank, avatar, name, eth,
}) {
  const { theme } = useTheme()
  return (
    <div
      className={`w-[180px] flex-shrink-0 h-[200px] p-4 mx-3 font-semibold text-base rounded-2xl dark:bg-nft-black-3 bg-white relative flex-col flex justify-end items-center ${theme === 'light' && 'border border-nft'}`}
    >
      <div className="absolute top-4 left-4 w-8 h-8 rounded-full nft-gradient flexCenter text-white">
        {rank}
      </div>
      <div className="relative">
        <Image
          alt="avatar"
          className="rounded-full relative"
          width={90}
          height={90}
          src={avatar}
        />
        <Image className="absolute right-1.5 bottom-0.5" alt="tick" height={16} width={16} src={images.tick} />
      </div>
      <div className="my-1">{name}</div>
      <div>
        {eth}
        <span className="font-normal ml-1">ETH</span>
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div
      className="nft-gradient rounded-3xl h-80 md:h-36 my-16 text-5xl md:my-4 sm:text-base text-white md:text-xl font-bold p-14 flexStartCenter relative z-0 overflow-hidden"
    >
      <div className="max-w-[65%] md:max-w-full">Discover, collect, and sell extraordinary NFTs</div>
      <div
        className="absolute -z-5 opacity-20 shadow-2xl md:w-24 md:h-24 w-80 h-80 rounded-full bg-white top-0 left-0 -translate-x-1/3 -translate-y-1/3"
      />
      <div
        className="absolute -z-5 opacity-20 shadow-2xl md:w-32 md:h-32 w-96 h-96 rounded-full bg-white bottom-0 right-0 translate-y-1/3 translate-x-1/4"
      />
    </div>
  );
}

export default Home;
