import React, { useState } from "react";
import { KeyPass, Profile } from "../../components/profile/Svg";
import { Eye, EyeOff } from "lucide-react";

function EditProfile() {
  const [showExist, setShowExist] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    ExistingPass: "",
    NewPass: "",
    ConfirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Regex rules
  const minLen = /^.{8,}$/;
  const hasLower = /(?=.*[a-z])/;
  const hasUpper = /(?=.*[A-Z])/;
  const hasDigit = /(?=.*\d)/;
  const hasSymbol = /(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?`~])/;
  const noSpace = /^(?!.*\s)/;

  const validatePassword = (password) => {
    const newErrors = {};
    if (!minLen.test(password))
      newErrors.minLen = "Password must be at least 8 characters";
    if (!hasLower.test(password))
      newErrors.lower = "Must contain a lowercase letter";
    if (!hasUpper.test(password))
      newErrors.upper = "Must contain an uppercase letter";
    if (!hasDigit.test(password)) newErrors.digit = "Must contain a number";
    if (!hasSymbol.test(password))
      newErrors.symbol = "Must contain a special character";
    if (!noSpace.test(password)) newErrors.space = "Cannot contain spaces";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "NewPass") {
      setErrors(validatePassword(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword(formData.NewPass);

    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }

    if (formData.NewPass !== formData.ConfirmNewPassword) {
      setErrors({ confirm: "Passwords do not match" });
      return;
    }

    setErrors({});
    alert("Form submitted:", formData);
  };

  return (
    <div className="p-8 pt-4 w-full">
      <p className="font-semibold mb-6">Change Password</p>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 md:border  border-gray-200 p-0 md:p-8"
      >
        {/* Existing Password */}
        <label htmlFor="ExistingPass" className="font-medium">
          Existing Password
        </label>
        <div className="border border-gray-300 p-2 rounded-lg flex mt-2 items-center">
          <KeyPass size={20} />
          <input
            className="ml-2 placeholder:text-sm w-full focus:outline-none"
            type={showExist ? "text" : "password"}
            id="ExistingPass"
            name="ExistingPass"
            placeholder="Enter Your Existing Password"
            value={formData.ExistingPass}
            onChange={handleChange}
          />
          <div
            onClick={() => setShowExist(!showExist)}
            className="cursor-pointer"
          >
            {showExist ? <Eye /> : <EyeOff />}
          </div>
        </div>

        {/* New Password */}
        <label htmlFor="NewPass" className="font-medium">
          New Password
        </label>
        <div className="border border-gray-300 p-2 rounded-lg flex mt-2 items-center">
          <KeyPass size={20} />
          <input
            className="ml-2 placeholder:text-sm w-full focus:outline-none"
            type={showNew ? "text" : "password"}
            id="NewPass"
            name="NewPass"
            placeholder="Enter Your New Password"
            value={formData.NewPass}
            onChange={handleChange}
          />
          <div onClick={() => setShowNew(!showNew)} className="cursor-pointer">
            {showNew ? <Eye /> : <EyeOff />}
          </div>
        </div>
        {/* Error list for NewPass */}
        {Object.values(errors).map(
          (err, idx) =>
            idx !== "confirm" && (
              <p key={idx} className="text-sm text-red-500">
                {err}
              </p>
            )
        )}

        {/* Confirm Password */}
        <label htmlFor="ConfirmNewPassword" className="font-medium">
          Confirm New Password
        </label>
        <div className="border border-gray-300 p-2 rounded-lg flex mt-2 items-center">
          <KeyPass size={20} />
          <input
            className="ml-2 placeholder:text-sm w-full focus:outline-none"
            type={showConfirm ? "text" : "password"}
            id="ConfirmNewPassword"
            name="ConfirmNewPassword"
            placeholder="Re-Type Your New Password"
            value={formData.ConfirmNewPassword}
            onChange={handleChange}
          />
          <div
            onClick={() => setShowConfirm(!showConfirm)}
            className="cursor-pointer"
          >
            {showConfirm ? <Eye /> : <EyeOff />}
          </div>
        </div>
        {errors.confirm && (
          <p className="text-sm text-red-500">{errors.confirm}</p>
        )}

        <button
          type="submit"
          className="block bg-[#2948FF] w-full p-3 mt-3 rounded-lg text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
