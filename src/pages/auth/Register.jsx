import React from "react";
import "../../index.css";
import dompetkecil from "../../assets/dompetkecil.png";
import google from "../../assets/google.png";
import fb from "../../assets/fb.png";
import register from "../../assets/register.png";
import email from "../../assets/mail.svg";
import pwd from "../../assets/password.svg";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <section className="flex min-h-screen bg-[var(--color--primary)]">
        <div className="w-1/2 rounded-r-4xl bg-white flex flex-col justify-center px-20 py-20">
          <div className="flex items-center text-[var(--color--primary)]">
            <img src={dompetkecil} alt="dompet" className="w-8 h-8" />
            <p>E-Wallet</p>
          </div>
          <h1 className="font-medium text-3xl">
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h1>
          <p className="font-normal text-[15px] text-gray-400">
            Transfering money is eassier than ever, you can access Zwallet
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex justify-center items-center gap-3 border border-gray-300 w-full rounded-full py-2">
              <img src={google} alt="google logo" />
              <span>Sign In With Google</span>
            </div>
            <div className="flex justify-center items-center gap-3 border border-gray-300 w-full rounded-full py-2">
              <img src={fb} alt="facebook logo" />
              <span>Sign In With Facebook</span>
            </div>
          </div>

          <div className="flex items-center mt-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <form>
            <div className="mt-6 flex flex-col">
              <label htmlFor="email">Email</label>
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email"
                  className="border border-gray-300 bg-[#FCFDFE] rounded-lg py-2 px-10 my-2 w-full"
                />
                <img
                  src={email}
                  alt="logo email"
                  className="absolute w-4 h-4 left-4 top-5"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="pwd">Password</label>
              <div className="relative">
                <input
                  type="text"
                  name="pwd"
                  id="pwd"
                  placeholder="Enter Your Password"
                  className="border border-gray-300 bg-[#FCFDFE] rounded-lg py-2 px-10 my-2 w-full"
                />
                <img
                  src={pwd}
                  alt="password logo"
                  className="absolute w-5 h-5 left-4 top-4.5"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="confpwd">Confirm Password</label>
              <div className="relative">
                <input
                  type="text"
                  name="confpwd"
                  id="confpwd"
                  placeholder="Enter Your Password Again"
                  className="border border-gray-300 bg-[#FCFDFE] rounded-lg py-2 px-10 my-2 w-full"
                />
                <img
                  src={pwd}
                  alt="password logo"
                  className="absolute w-5 h-5 left-4 top-4.5"
                />
              </div>
            </div>
            <button className="my-5 bg-[var(--color--primary)] text-white w-full py-2 rounded-lg cursor-pointer">
              Register
            </button>
          </form>
          <p className="flex gap-1 justify-center">
            Have An Account?
            <Link className="text-[var(--color--primary)]">Login</Link>
          </p>
        </div>

        <div className="w-1/2 flex justify-center items-center">
          <img src={register} alt="logo register" className="w-150 h-135" />
        </div>
      </section>
    </>
  );
}

export default Register;
