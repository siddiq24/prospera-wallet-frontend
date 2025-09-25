import React, { useState } from "react";
import { Mail, Wallet } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Email submitted:", email);
    // Add your form submission logic here
    alert(`Email submitted: ${email}`);
  };

  return (
    <div className="min-h-screen bg-[#3969FD] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mt-2">
            <img src="/money-wallet.svg" />
          </div>
          <h1 className="text-xl font-semibold text-blue-600">E-Wallet</h1>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">
            Fill Out Form Correctly 👋
          </h2>
          <p className="text-sm text-gray-600">
            We will send new password to your email
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src="/email.png" alt="logo email" className="w-[16px] h-[12px]" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
