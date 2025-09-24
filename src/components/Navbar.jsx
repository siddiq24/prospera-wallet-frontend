import Footer from './Footer'

export function Navbar() {
  return (
    <header
        className='z-9999 bg-[#2948FF] text-white py-3'
    >
        <nav
            className='flex items-center justify-between'
        >
            <div
                className='flex items-center gap-3'
            >
                <img src="money-wallet.svg" alt="" />
                <p>E-Wallet</p>
            </div>
            <div
                className='flex items-center gap-4'
            >
                <button
                    className='px-4 py-2 bg-transparent rounded-sm border'
                >SignIn</button>
                <button
                    className='px-4 py-2 bg-white rounded-sm text-[#3969FD]'
                >SignUp</button>
            </div>
        </nav>
    </header>
  )
}

export function LoggedNavbar() {
  return (
    <>
    <header
        className='z-9999 bg-white text-white py-3 border-b border-[#E8E8E8]'
    >
        <nav
            className='flex items-center justify-between'
        >
            <div
                className='flex items-center gap-3'
            >
                <img src="money-wallet.svg" alt="" />
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
                <img src="avatar-galuh.png" alt=""
                    className='size-10 rounded-full object-cover'
                />
                <img src="down.svg" alt="" />
            </div>
        </nav>
    </header>
    <Footer />
    </>
  )
}
