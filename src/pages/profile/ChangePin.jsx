import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function ChangePin() {
  const [oldPin, setOldPin] = useState();
  const [newPin, setNewPin] = useState();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const request = new Request(`${import.meta.env.VITE_BASE_URL}/auth/change-pin`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userState.token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            old_pin: oldPin,
            new_pin: newPin
          })
        });
        const response = await fetch(request);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        toast.success("Pin successfully changed!");
        navigate("/profile/edit", { replace: true });
      } catch (error) {
        console.log(error.message);
        if (error.message == "PIN does not match") {
          toast.error("PIN does not match")
        }
        return error.message;
      }
    })();
  };

  return (
    <>
      <Toaster />
      <div className="p-10 w-full">
        <form className="mt-22" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center">
            <h1 className="">Change Pin</h1>
            <img
              src="https://emojiisland.com/cdn/shop/products/Waving_Hand_Sign_Emoji_Icon_ios10_small.png?v=1571606113"
              alt=""
              width={30}
            />
          </div>
          <p className="text-xs text-center text-gray-500 my-4">
            Please save your pin because this so important.
          </p>
          <div className="mt-26 mb-13">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Enter Old Pin
            </label>
            <OtpInput setOtp={setOldPin} />
          </div>
          <div className="mb-26">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Enter New Pin
            </label>
            <OtpInput setOtp={setNewPin} />
          </div>
          <button className="bg-[#2948FF] w-full text-lg text-white rounded-lg py-4">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

function OtpInput({ setOtp }) {
  const length = 6;
  const [otpDigits, setOtpDigits] = useState(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputsRef = useRef([]);

  useEffect(() => {
    setOtp(otpDigits.join(""));
  }, [otpDigits, setOtp]);

  const handleFocus = (idx) => {
    setFocusedIndex(idx);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otpDigits];
      newOtp[index] = value;
      setOtpDigits(newOtp);
      if (value && index < length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center w-full gap-4">
      {otpDigits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type={focusedIndex === i ? "text" : "password"}
          value={digit}
          maxLength={1}
          className="w-10 h-12 text-center text-xl border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none"
          onChange={(e) => handleChange(e.target?.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onFocus={() => handleFocus(i)}
          onBlur={handleBlur}
        />
      ))}
    </div>
  );
}

export default ChangePin;