import React, { useState } from "react";
import { Link } from "react-router";

const BENEFITS = [
  {
    title: "24/7 Support",
    desc: "We have 24/7 contact support so you can contact us whenever you want and we will respond it.",
    img: "support-24.svg",
  },
  {
    title: "Data Privacy",
    desc: "We make sure your data is safe in our database and we will encrypt any data you submitted to us.",
    img: "data-privacy.svg",
  },
  {
    title: "Easy Download",
    desc: "Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store.",
    img: "easy-download.svg",
  },
];

const DOWNLOAD_BUTTONS = [
  {
    title: "Play Store",
    img: "play-store.svg",
    text: "#2948FF",
    bg: "#ffffff",
    border: "white",
  },
  {
    title: "Apps Store",
    img: "apple-store.svg",
    text: "white",
    bg: "#2948FF",
    border: "#ffffff",
  },
];

const TRUSTED_PARTNERS = [
  {
    title: "Microsoft",
    img: "microsoft.svg",
  },
  {
    title: "Dropbox",
    img: "dropbox.svg",
  },
  {
    title: "H&M",
    img: "hm.svg",
  },
  {
    title: "airbnb",
    img: "dropbox.svg",
  },
  {
    title: "airbnb",
    img: "airbnb.svg",
  },
  {
    title: "Canon",
    img: "canon.svg",
  },
  {
    title: "Dell",
    img: "dell.svg",
  },
];

// Kalau mau ganti ke swiperJS ini hapus saja
const carouselItems = [
  {
    img: "carousel-1.png",
    text: "First carousel item",
  },
  {
    img: "carousel-2.png",
    text: "Second carousel item",
  },
  {
    img: "carousel-3.png",
    text: "Third carousel item",
  },
  {
    img: "carousel-4.png",
    text: "Fourth carousel item",
  },
];

const sectionPadding = "px-8 md:px-28";

export const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="flex flex-col gap-18 overflow-hidden">
      {/* Hero section */}
      <div
        className={`bg-[#2948FF]  text-white flex flex-col pt-10 md:pt-30 pb-10 gap-6  md:items-center ${sectionPadding}`}
      >
        <h2 className="text-4xl md:text-6xl md:text-center">
          <div>Experience the Future of Digital</div>
          <div>Payments with e-wallet</div>
        </h2>
        <div className="flex flex-col md:flex-row-reverse md:gap-36 ">
          <div className="md:mt-20 flex flex-col gap-8">
            <div className="text-md">
              Simplify Your Life with Secure and Convenient Mobile Payments
            </div>
            <div className="flex gap-8 h-14 w-full">
              <div className="bg-[#FFFFFF] flex items-center justify-center flex-1 h-full text-[#2948FF] px-6 py-4 gap-4 rounded-md">
                <img src="play-store.svg" alt="Play Store" /> Play Store
              </div>

              <div className="bg-[#2948FF] h-full text-[#FFFFFF] border border-[#FFFFF] px-6 py-4 flex flex-1 items-center justify-center gap-4 rounded-md">
                <div>
                  <svg
                    width="18"
                    height="20"
                    fill="#FFFFFF"
                    xmlns="http://www.w3.org/2000/svg"
                    className="scale-150"
                  >
                    <path
                      d="M11.5787 9.29677C11.5609 7.17243 13.3173 6.13993 13.3944 6.09246C12.3975 4.64458 10.8547 4.44283 10.3147 4.42503C9.02114 4.28855 7.76315 5.20237 7.10449 5.20237C6.43395 5.20237 5.41332 4.44283 4.32148 4.46063C2.91514 4.48437 1.59188 5.29731 0.873876 6.56717C-0.615536 9.14842 0.494106 12.9461 1.92418 15.0349C2.64218 16.0555 3.47293 17.2007 4.5707 17.1592C5.63881 17.1177 6.04232 16.4768 7.32998 16.4768C8.6117 16.4768 8.98554 17.1592 10.1011 17.1355C11.2523 17.1177 11.9703 16.1089 12.6646 15.0764C13.4894 13.9074 13.8217 12.7503 13.8335 12.691C13.8039 12.6791 11.6024 11.8365 11.5787 9.29677Z"
                      fill="#ffffff"
                    />
                    <path
                      d="M9.47225 3.05435C10.0478 2.33635 10.4395 1.35725 10.3327 0.360352C9.50192 0.395955 8.45755 0.935941 7.85822 1.64208C7.33011 2.26514 6.85539 3.27984 6.97407 4.2352C7.91163 4.30641 8.87292 3.76048 9.47225 3.05435Z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
                <span>Apps Store</span>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-4xl">4.6 M</div>
              <img src="/user.png" alt="" />
            </div>
            <div className="text-md">
              Around the world, we already have over 4.6 happy user
            </div>
          </div>
          <div className="flex justify-center">
            <img className="-mb-6" src="mobile-dashboard-v2.png" alt="" />
            <img
              width="250px"
              className="-mb-43 -ml-44 object-contain"
              src="mobile-dashboard-v1.png"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* Benefit of our app */}
      <div
        className={`flex flex-col md:flex-row gap-8 mb-48 md:mb-8 ${sectionPadding}`}
      >
        {BENEFITS.map((el, idx) => (
          <div
            className="flex flex-col items-center md:flex-row  gap-8"
            key={idx}
          >
            <img src={el.img} alt={el.title} />
            <div className="flex flex-col items-center md:items-start">
              <div className="text-[#0B132A] font-bold text-lg">{el.title}</div>
              <div className="text-[#4F5665] text-center">{el.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Your all in one digital solution */}
      <div
        className={`md:mt-18 flex flex-col md:flex-row-reverse items-center gap-6 ${sectionPadding}`}
      >
        <div className="relative w-full bg-[#2948FF] h-40 md:h-64 rounded-lg flex justify-center mb-6 ">
          <img
            src="mobile-dashboard-v2.png"
            alt=""
            width="300px"
            className="absolute -bottom-5 left-1/2 -translate-x-1/2"
          />
        </div>
        <div className="flex flex-col items-center md:items-start gap-8">
          <div className="font-bold text-lg text-[#2948FF]">
            WELCOME TO E-WALLET
          </div>
          <div className="font-medium text-3xl text-[#0B132A]">
            Your All-in-One Digital Payment Solution
          </div>
          <div className="font-normal text-lg text-[#4F5665]">
            Say goodbye to cash and hello to the future of payments! With
            e-wallet, you have the power of secure, fast, and convenient digital
            transactions right at your fingertips. Whether you're shopping,
            dining out, or sending money to loved ones, we've got you covered.
          </div>
          <div
            to={""}
            className="w-full md:w-fit px-6 py-4 flex items-center justify-center gap-4 rounded-md bg-[#2948FF] text-white text-lg"
          >
            <span>Get Started</span>
          </div>
        </div>
      </div>

      {/* All the great zwallet features */}
      <div
        className={`flex flex-col md:flex-row items-center justify-between gap-4 bg-[#f8f8f8] ${sectionPadding}`}
      >
        <img
          className=""
          src="online-payment-security-concept-3d-phone-bill-1.png"
          alt=""
        />

        <div className="flex flex-col gap-4">
          <div className="font-medium text-3xl text-[#1E1E1E]">
            All The Great Zwallet Features.
          </div>
          <div className=" text-lg text-[#1E1E1E]">
            We have some great features from the application and it’s totally
            free to use by all users around the world.
          </div>

          <ul className="flex flex-col gap-3">
            <li className="flex gap-4">
              <img src="green-check.svg" alt="" />
              <span className="font-bold text-lg text-[#00A700]">
                Small Fee
              </span>
            </li>
            <li className="flex gap-4">
              <img src="green-check.svg" alt="" />
              <span className="font-bold text-lg text-[#00A700]">
                Data Secured
              </span>
            </li>
            <li className="flex gap-4">
              <img src="green-check.svg" alt="" />
              <span className="font-bold text-lg text-[#00A700]">
                User Friendly
              </span>
            </li>
          </ul>

          <div
            to={""}
            className="w-full md:w-fit px-6 py-4 flex items-center justify-center gap-4 rounded-md bg-[#2948FF] text-white text-lg"
          >
            <span>Get Started</span>
          </div>
        </div>
      </div>

      {/* Trusted Partners */}
      <div className={`flex flex-col gap-8 ${sectionPadding}`}>
        {/* 100+ */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-4 flex-col items-center gap-12">
            <div className="font-medium text-4xl text-[#0B132A]">
              100+ Trusted Partners
            </div>
            <div className="font-normal text-lg text-[#4F5665]">
              We have reached global level and have 100+ brand partners around
              the globe.
            </div>
          </div>
          <div className="flex flex-6 flex-col md:flex-row items-center justify-between gap-8">
            {TRUSTED_PARTNERS.map((el, idx) => (
              <img key={idx} src={el.img} alt={el.title} className="md:size-[5vw]"/>
            ))}
          </div>
        </div>

        {/* What our users... */}
        <div className="flex flex-col items-center gap-8">
          <div className="font-medium text-4xl text-[#0B132A]">
            What Our Users Are Saying
          </div>
          <div className="font-normal text-lg text-center text-[#4F5665]">
            Ready to experience the future of payments? Download e-wallet now
            and enjoy a world of convenience at your fingertips.
          </div>

          {/* Blue section */}
          <div>
            <div className="rounded-2xl bg-[#2948FF] w-full flex flex-col items-center px-4 py-8 gap-2">
              {/* User Review Photo */}
              <div>
                <img src="james-bond.png" alt="James Bond" />
              </div>

              {/* Name */}
              <div className="text-[#FFFFFF]">James Bond</div>

              {/* Star */}
              <div className="flex gap-3 ">
                <div className="">
                  {[...Array(5)].map((_, idx) => (
                    <img
                      key={idx}
                      src="star.svg"
                      alt="star"
                      className="inline-block"
                    />
                  ))}
                </div>
                <div className="text-[#FFFFFF]">5.0</div>
              </div>

              <div className="font-bold text-5xl text-[#FFFFFF]">“</div>

              {/* User review */}
              <div className="font-normal text-lg text-center text-[#FFFFFF]">
                I've been using the e-wallet for over two years now, and I'm
                very satisfied with the ease of use. This has completely changed
                the way I shop and conduct financial transactions.
              </div>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="flex flex-col items-center gap-4 md:hidden ">
            <div className="flex gap-2 mt-2">
              {carouselItems.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-4 h-4 rounded-full ${
                    idx === activeIndex ? "bg-[#2948FF]" : "bg-[#E5E5E5]"
                  }`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Download The App */}
      <div
        className={`flex flex-col md:flex-row-reverse gap-4 bg-[#f8f8f8] ${sectionPadding}`}
      >
        <div className="flex flex-col justify-center gap-8">
          <div className="font-medium text-4xl text-[#0B132A]">
            Download The App
          </div>
          <div className="font-normal text-lg text-[#0B132A]">
            Ready to experience the future of payments? Download e-wallet now
            and enjoy a world of convenience at your fingertips.
          </div>

          {/* Download Button */}
          <div className="flex gap-8">
            <Link
              to={""}
              className="bg-[#2948FF] text-[#f8f8f8] w-full px-6 py-4 flex items-center justify-center gap-4 rounded-md"
            >
              <span>
                <img src="play-store.svg" alt="Play Store" />
              </span>
              <span>Play Store</span>
            </Link>
            <Link
              to={""}
              className="bg-[#f8f8f8] text-[#2948FF] border border-[#2948FF] w-full px-6 py-4 flex items-center justify-center gap-4 rounded-md"
            >
              <span>
                {/* Inline SVG for blue color */}
                <svg
                  width="24"
                  height="24"
                  fill="#2948FF"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5787 9.29677C11.5609 7.17243 13.3173 6.13993 13.3944 6.09246C12.3975 4.64458 10.8547 4.44283 10.3147 4.42503C9.02114 4.28855 7.76315 5.20237 7.10449 5.20237C6.43395 5.20237 5.41332 4.44283 4.32148 4.46063C2.91514 4.48437 1.59188 5.29731 0.873876 6.56717C-0.615536 9.14842 0.494106 12.9461 1.92418 15.0349C2.64218 16.0555 3.47293 17.2007 4.5707 17.1592C5.63881 17.1177 6.04232 16.4768 7.32998 16.4768C8.6117 16.4768 8.98554 17.1592 10.1011 17.1355C11.2523 17.1177 11.9703 16.1089 12.6646 15.0764C13.4894 13.9074 13.8217 12.7503 13.8335 12.691C13.8039 12.6791 11.6024 11.8365 11.5787 9.29677Z"
                    fill="#2948FF"
                  />
                  <path
                    d="M9.47225 3.05435C10.0478 2.33635 10.4395 1.35725 10.3327 0.360352C9.50192 0.395955 8.45755 0.935941 7.85822 1.64208C7.33011 2.26514 6.85539 3.27984 6.97407 4.2352C7.91163 4.30641 8.87292 3.76048 9.47225 3.05435Z"
                    fill="#2948FF"
                  />
                </svg>
              </span>
              <span>Apps Store</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img className="-mb-6" src="mobile-dashboard-v2.png" alt="" />
          <img
            width="250px"
            className="-mb-43 -ml-44 object-contain"
            src="mobile-dashboard-v1.png"
            alt=""
          />
        </div>
      </div>
    </main>
  );
};
