import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes';
import images from '../assets'
import { Button, Logo } from '.';

function Footer() {
  return (
    <footer className="dark:text-white text-nft-black-1 border-nft-gray-1 dark:border-nft-black-1 border-t">
      <Section1 />
      <Section2 />
    </footer>
  )
}

function Section1() {
  return (
    <div className="grid grid-cols-12 py-8 nft-container dark:text-white text-nft-black-1">
      <div className="flex-col flexStart col-span-6 md:col-span-12">
        <Logo isFooter />
        <div className="font-semibold my-6">Get the lasted Updates</div>
        <div className="flex w-full">
          <input className="flex-1 w-0 max-w-[284px] md:max-w-full outline-none rounded-md dark:bg-nft-black-2 py-3 px-5 overflow-hidden bg-white border border-nft-gray-1 dark:border-none" placeholder="Your Email" />
          <Button variant="contained">Email Me!</Button>
        </div>
      </div>
      <div className="flexBetweenStart col-span-6 md:col-span-12 md:mt-8">
        <FooterLinks header="CryptoKet" links={['Explore', 'How It Works', 'Contact Us']} />
        <FooterLinks header="Support" links={['Help Center', 'Terms of service', 'Legal', 'Privacy policy']} />
      </div>
    </div>
  )
}

function FooterLinks({ header, links }) {
  return (
    <div className="h-full flex-col flexStart">
      <div className="font-semibold text-xl mb-6">{header}</div>
      {links.map((link) => <div className="cursor-pointer hover:text-nft-red-violet" key={link}>{link}</div>)}
    </div>
  )
}

function Section2() {
  const { theme } = useTheme();
  return (
    <div className="w-full border-nft-gray-1 dark:border-nft-black-1 border-t">
      <div className="flexBetween py-8 md:flex-col nft-container">
        <div className="font-semibold">CryptoKet, Inc. All Rights Reserved</div>
        <div className="flexCenter md:mt-8">
          {[images.instagram, images.twitter, images.telegram, images.discord].map((icon) => (
            <Image
              key={icon}
              className={`ml-6 ${theme === 'light' && 'invert filter'}`}
              alt="social_icon"
              src={icon}
              width={16}
              height={16}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer
