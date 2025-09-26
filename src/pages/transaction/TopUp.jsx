import React, { useState } from "react";
import Header from "../../components/Header";
import { Topup } from "../../components/profile/Svg";

function TopUp() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [nominal, setNominal] = useState("");
  const [errors, setErrors] = useState({});

  const methods = [
    { id: "bri", name: "Bank Rakyat Indonesia", logo: "/BRI.svg" },
    { id: "dana", name: "Dana", logo: "/dana.svg" },
    { id: "bca", name: "Bank Central Asia", logo: "/bca.svg" },
    { id: "gopay", name: "Gopay", logo: "/gopay.svg" },
    { id: "ovo", name: "Ovo", logo: "/ovo.svg" },
  ];

  const formatCurrency = (value) => {
    if (!value) return "";
    return "Rp " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleNominalChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, ""); // hanya angka
    setNominal(rawValue ? formatCurrency(rawValue) : "");
  };

  // validasi
  const validateForm = () => {
    let newErrors = {};
    const rawNominal = nominal.replace(/\D/g, ""); // ambil angka asli

    if (!rawNominal || Number(rawNominal) <= 0) {
      newErrors.nominal = "Nominal harus berupa angka lebih dari 0";
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = "Pilih metode pembayaran";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit
  const handleSubmit = () => {
    if (validateForm()) {
      const rawNominal = nominal.replace(/\D/g, "");
      console.log("Form valid, kirim data:", {
        nominal: rawNominal,
        paymentMethod,
      });
    }
  };

  // disable kalau invalid
  const isFormValid =
    nominal.replace(/\D/g, "") &&
    Number(nominal.replace(/\D/g, "")) > 0 &&
    paymentMethod;

  return (
    <div className="flex-1">
      <Header title={'Top Up Account'} Icon={Topup}/>
      <section className="flex flex-col w-full pb-30 md:pb-0">
        {/* Content */}
        <div className="flex flex-col md:flex-row gap-1 md:gap-10">
          {/* Account Information */}
          <div className="py-5 px-8 mb-5 flex-1 md:border md:border-gray-200 md:rounded-lg ">
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
                  className="border rounded-lg py-2 px-10 my-2 w-full"
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
          <div className="pt-5 pb-2 px-8 mb-0 w-full md:w-1/3 md:border md:border-gray-200 md:rounded-lg self-start">
            <p className="font-semibold">Payment</p>
            <div className="flex justify-between my-2 font-semibold text-sm">
              <p className="font-medium text-gray-500">Order</p>
              <p>Idr.40.000</p>
            </div>
            <div className="flex justify-between my-2 font-semibold text-sm">
              <p className="font-medium text-gray-500">Delivery</p>
              <p>Idr.0</p>
            </div>
            <div className="flex justify-between my-2 font-semibold text-sm">
              <p className="font-medium text-gray-500">Tax</p>
              <p>Idr.4000</p>
            </div>
            <hr className="border-gray-500"/>
            <div className="flex justify-between mt-4 mb-2 font-semibold text-sm">
              <p className="font-medium text-gray-500">Sub Total</p>
              <p>Idr.44.000</p>
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
    </div>
  );
}

export default TopUp;
