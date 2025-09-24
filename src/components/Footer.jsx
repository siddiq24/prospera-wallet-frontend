import React from 'react'

function Footer() {
    return (
        <footer
            className='bg-[#2948FF] text-white flex flex-col items-center pt-6'
        >
            <div
                className='flex gap-12 border-b pb-16'
            >
                <div
                    className='flex flex-col gap-3'
                >
                    <div
                        className='flex items-end gap-2'
                    >
                        <img src="money-wallet.svg" alt="" />
                        <h3
                            className='font-semibold text-xl'
                        >E-Wallet</h3>
                    </div>
                    <p
                        className='text-sm'
                    >Clarity gives you the blocks and components you need to create a truly professional website.</p>
                </div>
                <div
                    className='font-semibold flex flex-col gap-3'
                >
                    <h4
                    >GET IN TOUCH</h4>
                    <div
                        className='flex flex-col gap-3 text-sm'
                    >
                        <div
                            className='flex gap-3 items-center'
                        >
                            <img src="call.svg" alt="" />
                            <p>+62 5637 8882 9901</p>
                        </div>
                        <div
                            className='flex gap-3 items-center'
                        >
                            <img src="message.svg" alt="" />
                            <p>contact@zwallet.com</p>
                        </div>
                    </div>
                </div>
                <div
                    className='flex flex-col gap-3'
                >
                    <h4
                        className='font-semibold'
                    >SOCIAL MEDIA</h4>
                    <div
                        className='flex gap-4'
                    >
                        <img
                            className='bg-white rounded-full p-1.5 size-8'
                            src="twitter.svg" alt="" />
                        <img
                            className='bg-white rounded-full p-1.5 size-8'
                            src="fb.svg" alt="" />
                        <img
                            className='bg-white rounded-full p-1.5 size-8'
                            src="instagram.svg" alt="" />
                        <img
                            className='bg-white rounded-full p-1.5 size-8'
                            src="github.svg" alt="" />
                    </div>
                </div>
                <div
                    className='flex flex-col gap-3'
                >
                    <h4
                        className='font-semibold'
                    >NEWSLETTER</h4>
                    <form action=""
                        className='flex flex-col gap-3'
                    >
                        <input type="text"
                            className='bg-[#FCFDFE] rounded-md py-1.5 placeholder:text-[#4F5665] text-sm px-3 text-gray-800'
                            placeholder='Enter Your Email'
                        />
                        <button
                            className='bg-white rounded-md text-[#2948FF] w-full py-1'
                        >Subscribe</button>
                    </form>
                </div>
            </div>
            <p
                className='text-sm pt-6 pb-7'
            >&copy; Copyright 2022, All Rights Reserved by ClarityUI</p>
        </footer>
    )
}

export default Footer