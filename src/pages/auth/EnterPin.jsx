import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function EnterPin() {
  const PIN_LENGTH = 6;
  const [pinValues, setPinValues] = useState(Array(PIN_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const { isPinExist, token } = useSelector((state) => state.user);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, ""); // hanya angka
    const allPrevFilled = pinValues.slice(0, idx).every((v) => v !== "");
    if (!allPrevFilled && idx !== 0) return;

    const newPin = [...pinValues];
    newPin[idx] = val.slice(-1); // hanya 1 digit
    setPinValues(newPin);

    // pindah fokus ke kotak berikutnya
    if (val && idx < PIN_LENGTH - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      const newPin = [...pinValues];
      if (newPin[idx] === "" && idx > 0) {
        inputsRef.current[idx - 1].focus();
      }
      newPin[idx] = "";
      setPinValues(newPin);
    }
  };

  const handleFocus = (idx) => {
    setFocusedIndex(idx);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pinInput = pinValues.join("");
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const body = JSON.stringify({
      pin: pinInput,
    });

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body,
      };

      if (!isPinExist) {
        const response = await fetch(`${baseUrl}/auth/pin`, options);
        const data = await response.json();

        if (data.success) {
          navigate("/transaction/dashboard");
          return;
        }
      }

      const response = await fetch(`${baseUrl}/auth/verify`, options);
      const data = await response.json();

      if (data.data) {
        navigate("/transaction/dashboard");
        return;
      }
      console.log(data);
    } catch (err) {
      console.error("Error: ", err)
    }
  };

  const isPinComplete = pinValues.every((v) => v !== "");
  return (
    <>
      <section className="flex min-h-screen bg-[var(--color--primary)] py-30 px-10 md:p-0">
        <div className="w-full md:w-1/2 rounded-r-2xl rounded-l-2xl md:rounded-r-4xl md:rounded-l-none bg-white flex flex-col justify-center px-10 py-5 md:py-20 md:p-20">
          <div className="flex gap-3 items-center text-[var(--color--primary)]">
            <img src="/dompetkecil.png" alt="dompet" className="w-8 h-8" />
            <p className="font-medium">E-Wallet</p>
          </div>
          <div className="flex gap-2 items-center w-max">
            <h1 className="font-medium text-3xl my-2">{pin ? "Enter" : "Create"} Your Pin </h1>
            <img src="https://emojiisland.com/cdn/shop/products/Waving_Hand_Sign_Emoji_Icon_ios10_small.png?v=1571606113" alt="" className="size-8" />
          </div>
          <p className="font-normal text-[13px] md:text-[15px] text-gray-400">
            Please save your pin because this so important.
          </p>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col items-center gap-5"
          >
            <div className="flex gap-6 mt-5 mb-10">
              {pinValues.map((digit, idx) => (
                <input
                  key={idx}
                  type={focusedIndex === idx ? "text" : "password"}
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onFocus={() => handleFocus(idx)}
                  onBlur={handleBlur}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  autoComplete="one-time-code" // biar dianggap input OTP, ga diisi otomatis
                  className={`w-6 md:w-14  h-12 text-center border-b-2 outline-none text-xl"
          ${focusedIndex === idx
                      ? "border-[var(--color--primary)]"
                      : "border-gray-300"
                    }`}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!isPinComplete}
              className={`w-full py-3 rounded-lg cursor-pointer transition
            ${isPinComplete
                  ? "bg-[var(--color--primary)] text-white hover:opacity-90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Submit
            </button>
          </form>

          <p className="flex gap-1 justify-center mt-3">
            Forgot Your Pin?
            <Link className="text-[var(--color--primary)]">Reset</Link>
          </p>
        </div>

        <div className="relative hidden md:flex md:w-1/2 justify-center items-center">
          <img
            src="/enterPin.svg"
            alt="logo login"
            className="w-150 h-135 absolute bottom-0"
          />
        </div>
      </section>
    </>
  );
}

export default EnterPin;
