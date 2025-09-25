import React from "react";
import { Mail } from "./profile/Svg";

function Footer() {
    return (
        <footer className="bg-[#2948FF] text-white flex flex-col items-center p-6 pt-10">
            <div className="flex flex-col md:flex-row gap-10 border-b pb-16 max-w-[90%]">
                {/* Brand */}
                <div className="flex-1">
                    <div className="flex items-center">
                        <img src="money-wallet.svg" alt="" />
                        <h3 className="font-semibold text-3xl ml-3">E-WALLET</h3>
                    </div>
                    <p className="text-sm mt-5">
                        Clarity gives you the blocks and components you need to create a
                        truly professional website.
                    </p>
                </div>

                {/* Contact */}
                <div className="flex-1">
                    <div className="flex items-center">
                        <h3 className="font-semibold text-xl ml-3">GET IN TOUCH</h3>
                    </div>
                    <div className="flex flex-col gap-3 text-sm mt-6">
                        <div className="flex items-center gap-3">
                            <img src="call.svg" alt="" />
                            <p>+62 5637 8882 9901</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={20} color="#fff"/>
                            <p>contact@zwallet.com</p>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex-1 gap-3">
                    <div className="flex items-center mb-4">
                        <h3 className="font-semibold text-xl ml-3">SOCIAL MEDIA</h3>
                    </div>
                    <div className="flex gap-4">
                        <img
                            className="bg-white rounded-full p-1.5 size-8"
                            src="twitter.svg"
                            alt=""
                        />
                        <img
                            className="bg-white rounded-full p-1.5 size-8"
                            src="fb.svg"
                            alt=""
                        />
                        <img
                            className="bg-white rounded-full p-1.5 size-8"
                            src="instagram.svg"
                            alt=""
                        />
                        <img
                            className="bg-white rounded-full p-1.5 size-8"
                            src="github.svg"
                            alt=""
                        />
                    </div>
                </div>

                {/* Newsletter */}
                <div className="flex-1 gap-3">
                    <div className="flex items-center mb-2">
                        <h3 className="font-semibold text-xl text-center w-full ">NEWS LETER</h3>
                    </div>
                    <form action="" className="flex flex-col gap-3">
                        <input
                            type="text"
                            className="bg-[#FCFDFE] text-center rounded-md py-2 px-3 text-sm text-gray-800 placeholder:text-[#4F5665]"
                            placeholder="Enter Your Email"
                        />
                        <button className="bg-white rounded-md text-[#2948FF] w-full py-2">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <p className="text-sm pt-6 pb-7">
                &copy; Copyright 2022, All Rights Reserved by ClarityUI
            </p>
        </footer>
    );
}

export default Footer;
