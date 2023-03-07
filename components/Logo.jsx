import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import images from '../assets';

function Logo({ isFooter }) {
  return (
    <Link href="/">
      <div className="flexCenter cursor-pointer mr-5">
        <Image src={images.logo02} width={32} height={32} alt="logo" />
        <p className={`dark:text-white text-nft-black-1 font-semibold text-lg ml-1 ${!isFooter && 'md:hidden'}`}>
          CryptoKet
        </p>
      </div>
    </Link>
  )
}

export default Logo;
