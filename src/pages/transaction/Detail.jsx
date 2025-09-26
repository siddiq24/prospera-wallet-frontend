import React, { useState, useRef } from "react";
import { Transfer } from "../../components/profile/Svg";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router";
import { Transactions } from "./FinePeople";

function Detail() {
  const [nominal, setNominal] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [modalStep, setModalStep] = useState(132453); // "pin" | "result"
  const { id } = useParams()

  const { name, phone, } = Transactions[id]

  // --- PIN States ---
  const PIN_LENGTH = 6;
  const [pinValues, setPinValues] = useState(Array(PIN_LENGTH).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputsRef = useRef([]);

  // format rupiah
  const formatCurrency = (value) => {
    if (!value) return "";
    return "Rp " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleNominalChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, "");
    setNominal(rawValue ? formatCurrency(rawValue) : "");
  };

  const validateForm = () => {
    let newErrors = {};
    const rawNominal = nominal.replace(/\D/g, "");

    if (!rawNominal || Number(rawNominal) <= 0) {
      newErrors.nominal = "Nominal harus berupa angka lebih dari 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowModal(true);
      setModalStep("pin");
    }
  };

  // --- PIN handlers ---
  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, ""); // hanya angka
    const allPrevFilled = pinValues.slice(0, idx).every((v) => v !== "");
    if (!allPrevFilled && idx !== 0) return;

    const newPin = [...pinValues];
    newPin[idx] = val.slice(-1); // hanya 1 digit
    setPinValues(newPin);

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

  const handleFocus = (idx) => setFocusedIndex(idx);
  const handleBlur = () => setFocusedIndex(null);

  const handleCheckPin = () => {
    const enteredPin = pinValues.join("");
    if (enteredPin === "123456") {
      setStatus("success");
    } else {
      setStatus("error");
    }
    setModalStep("result");
  };

  const isPinComplete = pinValues.every((v) => v !== "");

  const navigate = useNavigate()

  return (
    <>
      {/* --- MAIN PAGE --- */}
      <section className="flex flex-col w-full pb-25 overflow-hidden md:pb-0 mb-5">
        <Header title={'Top Up Account'} Icon={Transfer} />

        {/* STEP BAR */}
        <div className="hidden md:flex items-center justify-between max-w-2xl px-6 p-6">
          <div onClick={()=>{navigate('/transaction/transfer')}} className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white text-sm font-medium">
              1
            </div>
            <span className="ml-2 text-gray-700">Find People</span>
          </div>
          <div className="flex-1 mx-2 border-t border-dashed border-blue-400"></div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-medium">
              2
            </div>
            <span className="ml-2 text-blue-600 font-medium">Set Nominal</span>
          </div>
          <div className="flex-1 mx-2 border-t border-dashed border-gray-400"></div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white text-sm font-medium">
              3
            </div>
            <span className="ml-2 text-gray-700">Finish</span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col md:flex-row gap-1 md:gap-10">
          <div className="md:py-5 md:px-8 mb-5 md:my-5 flex-1 md:border md:border-gray-200 md:rounded-lg">
            <h2 className="font-semibold mb-3">People Information</h2>
            <div>
              {/* info user */}
              <div className="flex items-center justify-between gap-5 bg-[#E8E8E84D] p-5 rounded-lg">
                <div className="flex gap-5">
                  <div>
                    <img
                      src="/Profile.svg"
                      alt="foto profile"
                      className="w-20 h-20 object-cover rounded-lg  "
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-gray-500 my-1">{phone}</p>
                    <div className="inline-flex items-center gap-2 bg-[var(--color--primary)] rounded px-2 py-1">
                      <img
                        src="/verified.svg"
                        alt="verified"
                        className="w-4 h-4"
                      />
                      <span className="text-white text-sm">Verified</span>
                    </div>
                  </div>
                </div>
                <button>
                  <img src="/Star.png" alt="favorite" className="w-6 h-6" />
                </button>
              </div>

              {/* amount */}
              <h2 className="font-semibold mt-2">Amount</h2>
              <p className="text-gray-500 text-sm my-3">
                Type the amount you want to transfer to your e-wallet account
              </p>
              <div className="relative">
                <input
                  type="text"
                  name="nominal"
                  id="nominal"
                  placeholder="Enter Nominal Top Up"
                  value={nominal}
                  onChange={handleNominalChange}
                  className="border rounded-lg py-2 px-10 my-2 w-full focus:outline-none"
                />
                <img
                  src="/u_money.svg"
                  alt="logo nominal"
                  className="absolute w-4 h-4 left-4 top-5"
                />
              </div>
              {errors.nominal && (
                <p className="text-red-500 text-sm">{errors.nominal}</p>
              )}

              {/* notes */}
              <h2 className="font-semibold mt-3">Notes</h2>
              <p className="text-gray-500 text-sm my-3">
                You can add some notes for this transfer such as payment coffee
                or something
              </p>
              <div className="relative">
                <textarea
                  placeholder="Enter Some Notes"
                  className="w-full h-40 p-3 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none"
                ></textarea>
                <button
                  onClick={handleSubmit}
                  className="my-5 w-full py-2 rounded-lg cursor-pointer bg-[#2948FF] text-white"
                >
                  Submit & Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400"
            >
              ✕
            </button>
            {/* PIN STEP */}
            {modalStep === "pin" && (
              <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-2 flex gap-3 ">
                  Enter Your Pin           
                  <img src="https://emojiisland.com/cdn/shop/products/Waving_Hand_Sign_Emoji_Icon_ios10_small.png?v=1571606113" alt="" width={30} 
                  className="justify"/>
                </h2>
                <p className="text-gray-500 mb-4">
                  Enter your pin for transaction
                </p>

                <div className="flex gap-4 my-5">
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
                      autoComplete="one-time-code"
                      className={`w-10 h-12 text-center border-b-2 outline-none text-xl
                      ${focusedIndex === idx
                          ? "border-[var(--color--primary)]"
                          : "border-gray-300"
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleCheckPin}
                  disabled={!isPinComplete}
                  className={`w-full py-2 rounded-lg cursor-pointer transition
                    ${isPinComplete
                      ? "bg-[var(--color--primary)] text-white hover:opacity-90"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Submit
                </button>

                <p className="mt-3 text-sm text-blue-600 cursor-pointer">
                  Forgot your PIN? Reset
                </p>
              </div>
            )}
            {/* RESULT STEP */}
            {modalStep === "result" && (
              <div className="text-center">
                {status === "success" ? (
                  <>
                    <img
                      src="/Contact us-pana 1.png"
                      alt=""
                      className="mx-auto mb-4 w-40"
                    />
                    <h2 className="text-lg font-semibold">
                      Yeay Transfer{" "}
                      <span className="text-green-600">Success</span>
                    </h2>
                    <p className="text-gray-500 mt-2 mb-6">
                      Thank you for using this application for your financial
                    </p>
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg mb-3"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => {
                        setModalStep("pin");
                        setStatus(null);
                        setPinValues(Array(6).fill(""));
                      }}
                      className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg"
                    >
                      Transfer Again
                    </button>
                  </>
                ) : (
                  <>
                    <img
                      src="/Oh no-cuate 1.png"
                      alt=""
                      className="mx-auto mb-4 w-40"
                    />
                    <h2 className="text-lg font-semibold">
                      Oops Transfer <span className="text-red-600">Failed</span>
                    </h2>
                    <p className="text-gray-500 mt-2 mb-6">
                      Sorry, there is an issue for your transfer, try again
                      later!
                    </p>
                    <button
                      onClick={() => {
                        setModalStep("pin");
                        setStatus(null);
                        setPinValues(Array(6).fill(""));
                      }}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg mb-3"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg"
                    >
                      Back To Dashboard
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
