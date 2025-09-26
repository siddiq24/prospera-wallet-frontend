import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function TopUp() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [nominal, setNominal] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const navigate = useNavigate();

  const methods = [
    { id: "bri", name: "Bank Rakyat Indonesia", logo: "/BRI.svg", num: "112" },
    { id: "dana", name: "Dana", logo: "/dana.svg", num: "215" },
    { id: "bca", name: "Bank Central Asia", logo: "/bca.svg", num: "122" },
    { id: "gopay", name: "Gopay", logo: "/gopay.svg", num: "224" },
    { id: "ovo", name: "Ovo", logo: "/ovo.svg", num: "245" },
  ];

  const formatCurrency = (value) => {
    if (!value) return "0";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleNominalChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, ""); // hanya angka
    setNominal(rawValue ? formatCurrency(rawValue) : "");
  };

  const validateForm = () => {
    let isValid = true;
    const rawNominal = nominal.replace(/\D/g, "");

    if (Number(rawNominal) < 10000) {
      setErrors((prev) => ({
        ...prev,
        nominal: "Minimal Top Up Rp.10.000",
      }));
      isValid = false;
    } else {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr.nominal;
        return newErr;
      });
    }
    return isValid;
  };

  // hitung payment
  const amount = Number(nominal.replace(/\D/g, "")) || 0;
  // default tax
  let tax = 0;

  // kalau sudah pilih bank
  if (paymentMethod) {
    if (paymentMethod === "bca") {
      tax = 0; // gratis
    } else {
      tax = amount < 1000000 ? 2500 : 5000;
    }
  }
  const subtotal = amount + tax;

  //  disable button
  const isFormValid = nominal.replace(/\D/g, "") && paymentMethod;

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const selectedBank = methods.find((m) => m.id === paymentMethod);
    setPaymentInfo({
      logoBank: selectedBank.logo,
      bank: selectedBank.name,
      vaNumber: selectedBank.num,
      phone: "6282116304337",
      amount: subtotal,
    });
    setShowModal(true);
  };

  const formatWithSpaces = (value) => {
    if (!value) return "";
    return (
      value
        .toString()
        //   .replace(/\D/g, "") // buang non-digit
        .replace(/(.{4})/g, "$1 ") // kasih spasi tiap 4 digit
        .trim()
    );
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <>
      <section className="flex flex-col px-5 my-8 w-full pb-25 md:pb-0">
        <div className="hidden md:flex items-center gap-3">
          <img src="/Upload.svg" alt="upload logo" />
          <p className="font-semibold">Top Up Account</p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-1 md:gap-10">
          {/* Account Information */}
          <div className="py-5 px-8 mb-5 md:my-5 flex-1 md:border md:border-gray-200 md:rounded-lg">
            <h2 className="font-semibold mb-3">Account Information</h2>
            <div>
              <div className="flex gap-5 bg-[#E8E8E84D] p-5 rounded-lg">
                <div>
                  <img
                    src="/Profile.svg"
                    alt="foto profile"
                    className="w-25 h-25 object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Ghaluh Wizard</p>
                  <p className="text-gray-500 my-3">(239)555-0108</p>
                  <div className="inline-flex items-center gap-2 bg-[var(--color--primary)] rounded px-2 py-1">
                    <img src="/verified.svg" alt="verified" />
                    <span className="text-white">Verified</span>
                  </div>
                </div>
              </div>

              <h2 className="font-semibold mt-5">Amount</h2>
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
                  className="border rounded-lg py-2 px-10 my-2 w-full 
             focus:outline-none focus:outline-none focus:ring-1"
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

              <h2 className="font-semibold mt-5">Payment Method</h2>
              <p className="text-gray-500 text-sm my-3">
                Choose your payment method for top up account
              </p>
              <div>
                {methods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer hover:border-blue-500 my-5 ${
                      paymentMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-[#E8E8E84D]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <img
                      src={method.logo}
                      alt={method.name}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {method.name}
                    </span>
                  </label>
                ))}
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="pt-5 pb-2 px-8 mb-0 md:my-5 w-full md:w-1/3 md:border md:border-gray-200 md:rounded-lg self-start">
            <p className="font-semibold">Payment</p>
            <div className="flex justify-between my-2 font-semibold text-sm">
              <p>Order</p>
              <p>Idr.{formatCurrency(amount)}</p>
            </div>
            <div className="flex justify-between my-2 font-semibold text-sm">
              <p>Delivery</p>
              <p>Idr.0</p>
            </div>

            <div className="flex justify-between my-2 font-semibold text-sm">
              <p>Tax</p>
              <p>
                {paymentMethod === "bca" ? (
                  <>
                    <span className="line-through text-gray-500 mr-2">
                      Idr.
                      {formatCurrency((tax = amount < 1000000 ? 2500 : 5000))}
                    </span>
                    Idr.0
                  </>
                ) : (
                  `Idr.${formatCurrency(tax)}`
                )}
              </p>
            </div>
            <hr />
            <div className="flex justify-between mt-4 mb-2 font-semibold text-sm">
              <p>Sub Total</p>
              <p>Idr.{formatCurrency(subtotal)}</p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`my-5 w-full py-2 rounded-lg cursor-pointer ${
                isFormValid
                  ? "bg-[var(--color--primary)] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
            <p className="text-gray-500 text-sm my-3">
              *Get Discount if you pay with Bank Central Asia
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && paymentInfo && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg py-6 px-10 w-96">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold my-4">
                Instruksi Pembayaran
              </h2>
              <div
                className="font-semibold cursor-pointer"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                X
              </div>
            </div>
            <div className="flex items-center gap-4 my-3">
              <img src={paymentInfo.logoBank} alt="selected bank logo" />
              <p className="mb-2 text-base">{paymentInfo.bank}</p>
            </div>
            <hr />
            <p className="mb-2 mt-4">Nomor Rekening:</p>
            <div className="flex justify-between mb-4 items-center">
              <p className="text-[var(--color--primary)]">
                {formatWithSpaces(
                  `${paymentInfo.vaNumber}${paymentInfo.phone}`
                )}
              </p>
              <button
                onClick={() => copy(paymentInfo.vaNumber)}
                className="cursor-pointer border border-[var(--color--primary)] py-1 px-2 rounded"
              >
                COPY
              </button>
            </div>
            <hr />
            <p className="my-4 text-gray-400 text-sm">
              Verification process takes less than 10 minutes after successful
              payment
            </p>
            <p className="text-sm">Only accept from {paymentInfo.bank}</p>
            <div className="flex justify-end gap-2">
              <button
                className="my-5 w-full py-2 rounded-lg cursor-pointer
                  bg-[var(--color--primary)] text-white"
                onClick={() => {
                  setShowModal(false);
                  navigate("/transaction/history");
                }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TopUp;
