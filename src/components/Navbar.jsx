import { useState } from "react";
import { BurgerMenu, Exit } from "../assets/Svg";
import { Link } from "react-router";

export function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
        <header
            className='text-white fixed w-screen top-0'
        >
            <nav
                className='z-9999 bg-[#2948FF] flex items-center justify-between p-4 px-10 md:px-32'
            >
                <div
                    className='w-30 md:w-50'
                >
                    <img src="/LogoNavHome.png" alt="" className='drop-shadow-2xl '
                    />
                </div>
                <div
                    className='md:flex md:items-center md:gap-4'
                >
                    <BurgerMenu size={16}
                        cName={"md:hidden cursor-pointer hover:opacity-60"}
                        setOpenMenu={setOpenMenu}
                        openMenu={openMenu}
                    />
                    <Link to={'/auth/login'}
                        className='hidden md:block px-4 py-2 bg-transparent rounded-sm border'
                    >SignIn</Link>
                    <Link to={'/auth/register'}
                        className='hidden md:block px-4 py-2 bg-white rounded-sm text-[#3969FD]'
                    >SignUp</Link>
                </div>
            </nav>
            <div
                className={`${openMenu ? 'block' : 'hidden'} shadow-md bg-white rounded-b-3xl flex flex-col gap-3 md:hidden p-4`}
            >
                <Link to={'/auth/login'}
                    className='text-[#3969FD] cursor-pointer border text-center hover:border-[#2948FF] rounded-sm py-2'
                >Sign In</Link>
                <Link to={'/auth/register'}
                    className='text-white md:text-[#2948FF] cursor-pointer border text-center bg-[#2948FF] md:bg-white hover:border-[#2948FF] rounded-sm py-2'
                >Sign Up</Link>
            </div>
        </header>
    )
}

export function LoggedNavbar() {
    const [open, setOpen] = useState(false)
    return (
        <header className='t-0 w-screen'>
            <div
                className='z-99999 md:pl-8 text-white sm:px-3 md:px-15 py-3 border-b border-[#E8E8E8] w-full text-[3vw] md:text-[18px]'
            >
                <nav
                    className='flex items-center justify-between'
                >
                    <div
                        className='w-30'
                    >
                        <img src="/LogoNav.png" alt="" />
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
                        <div onClick={() => { setOpen(!open) }}
                            className=' md:hidden'>
                            <img src="/down.svg" alt="" />
                        </div>
                    </div>
                </nav>
            </div>
            <div
                className={`${open ? 'block' : 'hidden'} shadow-md rounded-b-3xl flex flex-col gap-3 md:hidden p-4`}
            >
                <Link to={'/'}
                    className='text-white flex justify-center bg-red-500 items-center gap-4 cursor-pointer border border-transparent hover:border-[#2948FF] rounded-sm py-2'
                ><Exit />Exit</Link>
            </div>
        </header>
    )
}
