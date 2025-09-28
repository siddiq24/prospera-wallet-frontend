import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Header from "../../components/Header";
import { Topup } from "../../components/profile/Svg";
import {
  setAmount,
  setBank,
  fetchBanks,
  submitTopup,
  clearTopup,
} from "../../redux/slices/topupSlice";

function TopUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fullname, phone, img, verified } = useSelector(
    (state) => state.profile
  );
  const { banks, amount, selectedBank, va, loading, success, error } =
    useSelector((state) => state.topup);

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const profileState = useSelector((state) => state.profile);
  const vaccount =
    selectedBank && phone ? `${selectedBank.code}${phone}` : null;

  useEffect(() => {
    dispatch(fetchBanks());
    return () => dispatch(clearTopup());
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showModal]);

  const formatCurrency = (value) => {
    if (!value) return "0";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatWithSpaces = (value) => {
    if (!value) return "";
    return value
      .toString()
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleNominalChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    dispatch(setAmount(rawValue));
  };

  const validateForm = () => {
    let isValid = true;
    const amt = Number(amount);

    if (amt < 10000) {
      setErrors((prev) => ({ ...prev, nominal: "Minimal Top Up Rp.10.000" }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, nominal: undefined }));
    }

    if (!selectedBank) {
      setErrors((prev) => ({
        ...prev,
        paymentMethod: "Pilih metode pembayaran",
      }));
      isValid = false;
    } else {
      setErrors((prev) => ({ ...prev, paymentMethod: undefined }));
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(submitTopup()).then((res) => {
      setShowModal(true);
    });
  };

  const copy = (text) => navigator.clipboard.writeText(text);

  const tax = selectedBank?.tax || 0; // <-- ambil tax dari bank yg dipilih
  const subtotal = Number(amount) + tax;
  const isFormValid = amount && selectedBank;

  return (
    <div className="flex-1">
      <Header title={"Top Up Account"} Icon={Topup} />
      <section className="flex flex-col w-full pb-30 md:pb-0">
        <div className="flex flex-col md:flex-row gap-1 md:gap-10">
          {/* Account Info & Nominal */}
          <div className="py-5 px-8 mb-5 flex-1 md:border bg-white md:border-gray-200 md:rounded-lg">
            <h2 className="font-semibold mb-3">Account Information</h2>
            <div className="flex gap-5 bg-[#E8E8E84D] p-5 rounded-lg">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/profile/${
                  profileState.img
                }`}
                alt="foto profile"
                className="w-25 h-25 object-cover"
              />
              <div>
                <p className="font-semibold">{fullname}</p>
                <p className="text-gray-500 my-3">{phone}</p>
                {verified && (
                  <div className="inline-flex items-center gap-2 bg-[var(--color--primary)] rounded px-2 py-1">
                    <img src="/verified.svg" alt="verified" />
                    <span className="text-white">Verified</span>
                  </div>
                )}
              </div>
            </div>

            <h2 className="font-semibold mt-5">Amount</h2>
            <p className="text-gray-500 text-sm my-3">
              Type the amount you want to transfer to your e-wallet account
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Nominal Top Up"
                value={amount ? formatCurrency(amount) : ""}
                onChange={handleNominalChange}
                className="border rounded-lg py-2 px-10 my-2 w-full focus:ring-1"
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
              {banks.map((bank) => (
                <label
                  key={bank.id}
                  className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer hover:border-blue-500 my-5 ${
                    selectedBank?.id === bank.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-[#E8E8E84D]"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={selectedBank?.id === bank.id}
                    onChange={() => dispatch(setBank({ ...bank, phone }))}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <img
                    src={`/${bank.img}`}
                    alt={bank.name}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {bank.name}
                  </span>
                </label>
              ))}
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
              )}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="pt-5 pb-2 px-8 mb-0 w-full md:w-1/3 md:border md:border-gray-200 md:rounded-lg self-start">
            <p className="font-semibold">Payment</p>
            <div className="flex justify-between my-2 font-semibold text-sm">
              <p className="font-medium text-gray-500">Order</p>
              <p>Idr.{formatCurrency(amount)}</p>
            </div>
            <div className="flex justify-between my-2 font-semibold text-sm">
              <p className="font-medium text-gray-500">Delivery</p>
              <p>Idr.0</p>
            </div>
            <div className="flex justify-between my-2 font-semibold text-sm">
              <p className="font-medium text-gray-500">Tax</p>
              <p>Idr.{formatCurrency(tax)}</p>
            </div>
            <hr className="border-gray-500" />
            <div className="flex justify-between mt-4 mb-2 font-semibold text-sm">
              <p className="font-medium text-gray-500">Sub Total</p>
              <p>Idr.{formatCurrency(subtotal)}</p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
              className={`my-5 w-full py-2 rounded-lg ${
                isFormValid
                  ? "bg-[var(--color--primary)] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
            <p className="text-gray-500 text-sm my-3">
              *Get Discount if you pay with Bank Central Asia
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-10">
          <div className="bg-white rounded-lg py-6 px-10 w-96">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold my-4">
                Instruksi Pembayaran
              </h2>
              <div
                className="font-semibold cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                X
              </div>
            </div>

            {success ? (
              <>
                <div className="flex items-center gap-4 my-3">
                  <img src={selectedBank?.logo} alt="selected bank logo" />
                  <p className="mb-2 text-base">{selectedBank?.name}</p>
                </div>
                <hr />
                <p className="mb-2 mt-4">Nomor Virtual Account:</p>
                <div className="flex justify-between mb-4 items-center">
                  <p className="text-[var(--color--primary)]">
                    {formatWithSpaces(vaccount)}
                  </p>
                  <button
                    onClick={() => copy(vaccount)}
                    className="cursor-pointer border border-[var(--color--primary)] py-1 px-2 rounded"
                  >
                    COPY
                  </button>
                </div>
                <hr />
                <p className="my-4 text-gray-400 text-sm">
                  Verification process takes less than 10 minutes after
                  successful payment
                </p>
                <p className="text-sm">Only accept from {selectedBank?.name}</p>
              </>
            ) : (
              <p className="text-red-500">
                Payment failed:{" "}
                {typeof error === "string" ? error : error?.message}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                className="my-5 w-full py-2 rounded-lg cursor-pointer bg-[var(--color--primary)] text-white"
                onClick={() => {
                  setShowModal(false);
                  if (success) navigate("/transaction/history");
                }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopUp;
