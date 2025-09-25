import { useState } from 'react'
import { BurgerMenu } from '../assets/Svg'
import Footer from './Footer'

export function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <header
            className='text-white'
        >
            <nav
                className='z-9999 bg-[#2948FF] flex items-center justify-between p-4'
            >
                <div
                    className='flex items-center gap-3'
                >
                    <img src="money-wallet.svg" alt="" />
                    <p>E-Wallet</p>
                </div>
                <div
                    className='md:flex md:items-center md:gap-4'
                >
                    <BurgerMenu size={16}
                        cName={"md:hidden cursor-pointer hover:opacity-60"}
                        setOpenMenu={setOpenMenu}
                        openMenu={openMenu}
                    />
                    <button
                        className='hidden md:block px-4 py-2 bg-transparent rounded-sm border'
                    >SignIn</button>
                    <button
                        className='hidden md:block px-4 py-2 bg-white rounded-sm text-[#3969FD]'
                    >SignUp</button>
                </div>
            </nav>
            <div
                className={`${openMenu ? 'block' : 'hidden'} shadow-md rounded-b-3xl flex flex-col gap-3 md:hidden p-4`}
            >
                <button
                    className='text-[#3969FD] cursor-pointer border border-transparent hover:border-[#2948FF] rounded-sm py-2'
                >Sign In</button>
                <button
                    className='text-[#3969FD] cursor-pointer border border-transparent hover:border-[#2948FF] rounded-sm py-2'
                >Sign Up</button>
            </div>
        </header>
    )
}

export function LoggedNavbar() {
    return (
        <header
            className='z-9999 text-white px-8 py-3 border-b border-[#E8E8E8] w-full'
        >
            <nav
                className='flex items-center justify-between'
            >
                <div
                    className='flex items-center gap-3'
                >
                    <img src="/money-wallet.svg" alt="" />
                    <p
                        className='text-[#2948FF]'
                    >E-Wallet</p>
                </div>
                <div
                    className='flex items-center gap-3'
                >
                    <p
                        className='text-[#4F5665]'
                    >Ghaluh Wizard</p>
                    <img src="/avatar-galuh.png" alt=""
                        className='size-10 rounded-full object-cover'
                    />
                    <img src="/down.svg" alt="" />
                </div>
            </nav>
        </header>
    )
}
