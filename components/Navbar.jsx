/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import images from '../assets'
import { Button, Logo } from '.'

function Navbar() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [selectedNav, setSelectedNav] = useState('explore-nfts')
  const [openSubNav, setOpenSubNav] = useState(false)

  return (
    <nav className="flexBetween w-full z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1 h-20 sticky top-0">
      <div className="flexBetween flex-1">
        <Logo />
        <ToggleTheme setTheme={setTheme} theme={theme} />
      </div>
      <div className="md:hidden flexCenter">
        <MenuItems
          setSelectedNav={setSelectedNav}
          selectedNav={selectedNav}
        />
        <ButtonGroup router={router} setSelectedNav={setSelectedNav} />
      </div>

      <Image
        className={`ml-8 hidden md:block ${
          theme === 'light' && 'filter invert'
        }`}
        alt="cross_or_menu_icon"
        src={openSubNav ? images.cross : images.menu}
        width={25}
        height={25}
        onClick={() => setOpenSubNav((prev) => !prev)}
      />
      {openSubNav && (
        <div className="fixed inset-0 bg-inherit w-screen text-black flex-col flexBetweenStart top-20">
          <MenuItems
            setSelectedNav={setSelectedNav}
            selectedNav={selectedNav}
            isMobile
          />
          <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1 w-full text-center">
            <ButtonGroup />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

function ToggleTheme({ setTheme, theme }) {
  return (
    <div className="flex items-center">
      <input
        onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="checkbox"
        type="checkbox"
        id="check-box"
      />
      <label
        htmlFor="check-box"
        className="relative w-8 h-4 flexBetween p-1 rounded-2xl label nft-gradient"
      >
        <i className="fas fa-sun" />
        <i className="fas fa-moon" />
        <div className="bg-white absolute w-3 h-3 ball rounded-full" />
      </label>
    </div>
  )
}

function MenuItems({ setSelectedNav, selectedNav, isMobile }) {
  return (
    <div
      className={`flexCenter ml-5 font-semibold ${
        isMobile && 'flex-col flexStart p-1 ml-0'
      }`}
    >
      {[
        {
          content: 'Explore NFTs',
          value: 'explore-nfts',
          path: '/',
        },
        {
          content: 'Listed NFTs',
          value: 'created-nfts',
          path: '/created-nfts',
        },
        {
          content: 'My NFTs',
          value: 'my-nfts',
          path: '/my-nfts',
        },
      ].map(({ value, path, content }) => (
        <Link
          key={value}
          href={path}
          onClick={() => setSelectedNav(value)}
          className={`cursor-pointer mx-3 dark:hover:text-white hover:text-nft-dark
          ${
              selectedNav === value
                ? 'dark:text-white text-nft-black-1'
                : 'dark:text-nft-gray-3 text-nft-gray-2'
          }
          `}
        >
          {content}
        </Link>
      ))}
    </div>
  )
}

function ButtonGroup({ router, setSelectedNav }) {
  const hasConnected = true

  return hasConnected ? (
    <Button
      variant="contained"
      className="ml-5"
      handleClick={() => {
        setSelectedNav('')
        router.push('/create-nft')
      }}
    >
      Create
    </Button>
  ) : (
    <Button
      handleClick={() => {
        setSelectedNav('')
      }}
      variant="contained"
      className="ml-5"
    >
      Connect
    </Button>
  )
}
