import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import images from '../assets'

function CardNFT({ nft }) {
  return (
    <Link
      href={{ pathname: '/nft-details', query: nft }}
      className="bg-white text-nft-black-2 dark:text-white dark:bg-nft-black-3 rounded-2xl p-3 flex flex-col border border-nft-gray-1 dark:border-none cursor-pointer w-max m-4 md:m-2"
    >
      <div className="w-max relative min-w-[220px] aspect-[9/10] mb-2">
        <Image
          fill
          alt="nft"
          src={images[`nft${nft}`]}
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="flex-col shrink-0">

        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            lineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          className="font-semibold text-sm mt-2"
        >
          NFT Name
        </div>
        <div className="flex">

          <div className="font-semibold mr-1">0.00</div>
          ETH
        </div>
        <div>0xabs...chas</div>
      </div>
    </Link>
  )
}

export default CardNFT
