import React, { useEffect, useRef, useState } from 'react'

function ChangePin() {
  const [_, setOtp] = useState()
  return (
    <div className='p-10 w-full'>
      <div className='mt-22'>
        <div className='flex justify-center items-center'>
          <h1 className=''>Change Pin</h1>
          <img src="https://emojiisland.com/cdn/shop/products/Waving_Hand_Sign_Emoji_Icon_ios10_small.png?v=1571606113" alt="" width={30} />
        </div>
        <p className='text-xs text-center text-gray-500 my-4'>Please save your pin because this so important.</p>
        <div className='my-26'>
          <OtpInput setOtp={setOtp} />
        </div>
        <button className='bg-[#2948FF] w-full text-lg text-white rounded-lg py-4'>Submit</button>
      </div>
    </div>
  )
}



function OtpInput({ setOtp }) {
  const length = 6;
  const [otpDigits, setOtpDigits] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    setOtp(otpDigits.join(''))
  }, [otpDigits, setOtp])

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
          type="text"
          value={digit}
          maxLength={1}
          className="w-10 h-12 text-center text-xl border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none"
          onChange={(e) => handleChange(e.target?.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
}
export default ChangePin