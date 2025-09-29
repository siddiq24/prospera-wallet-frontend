import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { type } = useParams()
  console.log(type)

  const handleSubmit = async () => {
    const loadingToast = toast.loading("Submitting...");
    setLoading(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/forgot`, {
        email,
        type,
      });
      setLoading(false)
      toast.dismiss(loadingToast);
      toast.success(`Success: ${response.data.message || "Email submitted"}`);
    } catch (error) {
      console.error(error);
      setLoading(false)
      toast.dismiss(loadingToast);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color--primary)] flex items-center justify-center px-4 flex-col gap-10 md:gap-20"> <Toaster />
      <div className='flex items-center gap-2 md:gap-5 justify-center'>
        <img src="/pros-logo-bw.png" alt="" className='size-[10vw] md:size-[5%] lg:size-[3%]' />
        <p className='text-white text-[6vw] md:text-[3vw] lg:text-[2vw]  font-bold'>Prospera</p>
      </div>
      <div className="max-w-2xl p-8 md:p-15 w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100  flex flex-col items-center justify-center gap-8 lg:max-w-[70vh]">

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-5">
            Fill Out Form Correctly
          </h2>
          <p className="text-sm text-gray-600">
            We will send new password to your email
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 w-full">
          {/* Email Input */}
          <div>
            <label className="block text-sm md:text-md lg:text-lg font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src="/email.png" alt="logo email" className="w-[16px] h-[12px]" />
              </div>
              <input
                type="email"
                value={email}
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200 shadow-lg mt-4 
              ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
